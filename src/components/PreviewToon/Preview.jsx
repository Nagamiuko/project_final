import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./Preview.css";
import avatarUser from "../../assets/userAvatar/user.png";
import axios from "axios";
import config from "../../config.json";
import moment from "moment-timezone";
import Load from "../alertshow/Load";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/action/wishlist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTocart } from "../redux/action/cart";
import { AuthContext } from "../Context/AuthContext";
const Preview = ({
  setPopupToon,
  DataToonChapter,
  DatatoonD,
  DataCommentBook,
  userID,
}) => {
  const navigator = useNavigate();
  const [dropchapter, setDropChapter] = useState(false);
  const [textment, setTextComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  let UrlNoFIle =
    "https://res.cloudinary.com/dz4xrddoy/image/upload/v1698134137/NoFile/z6mmgokrwdhb11tjknm5.pdf";
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === DatatoonD._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, DatatoonD]);

  const addToCartHandler = (id) => {
    if (user === null) {
      Swal.fire({
        icon: "warning",
        title: "โปรดทำการล็อกอินเข้าสู่ระบบ",
        text: "ถึงจะสามารถเพิ่มสินค้าของคุณได้ขอบคุณ",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      const isItemExists = cart && cart.find((i) => i._id === id);
      if (isItemExists) {
        toast.error("Item already in cart !");
      } else {
        const cartData = { ...DatatoonD, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const menuRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current) {
      setDropChapter(false);
    }
  });

  let NumberComment = 0;
  const Cment = DataCommentBook?.map((a, index) => {
    NumberComment = index + 1;
  });

  let NumberChapter = 0;
  const SumNum = DataToonChapter.map((a, index) => {
    NumberChapter = 1 + index;
  });

  const handAddcomment = async (e) => {
    const Data = {
      textcomment: textment,
    };
    try {
      if (textment === "") {
        Swal.fire({
          icon: "warning",
          title: "ไม่มีข้อความ",
        });
      } else {
        setLoading(true);
        const res = await axios.post(
          `${config.apiuserAddCommentBooks}/${DatatoonD?._id}/${userID?._id}`,
          Data
        );
        // navigator(0);
        window.location.reload();
        setLoading(false);
        console.log("บันทึกเมน");
        console.log("IDBook:", DatatoonD?._id);
        console.log("IDUser:", userID?._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Load />
      ) : (
        <div className="box-b-b" onClick={setPopupToon.bind(this, false)}>
          <div className="box-pop-t" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-close close-c"
              onClick={setPopupToon.bind(this, false)}
            >
              <span>X</span>
            </button>
            <div className="content-box">
              <div className="box-top-d">
                <div className="img-box">
                  <img src={DatatoonD?.cover_image?.cover_image_url} alt="" />
                  {/* <img src= {`http://localhost:4002/public/coverimage/${DatatoonD.cover_image}`} alt="" /> */}
                </div>
                <div className="box-d-r">
                  <div className="title-n-n">{DatatoonD?.title}</div>
                  <div className="t-name-s">
                    โดย :{" "}
                    {DatatoonD.mangauser?.namedisplay ||
                      DatatoonD.mangauser?.fullname}
                  </div>
                  <div className="t-r">
                    {DatatoonD?.category + "/" + DatatoonD?.category_main}
                  </div>
                  <div className="box-menu-tool">
                    <div className="view-title-row">
                      <div className="view-t">📜 จำนวนตอน</div>
                      <div className="view-u">{NumberChapter}</div>
                    </div>
                    <div className="view-title-row">
                      <div className="view-t">📝 ความคิดเห็น</div>
                      <div className="view-u">{NumberComment}</div>
                    </div>
                    <div className="view-title-row">
                      {click ? (
                        <div
                          className={
                            click && click === true ? "btn-green" : "btn-t"
                          }
                          onClick={() => removeFromWishlistHandler(DatatoonD)}
                        >
                          เลิกติดตาม
                        </div>
                      ) : (
                        <div
                          className={click ? "btn-green" : "btn-t"}
                          onClick={() => addToWishlistHandler(DatatoonD)}
                        >
                          ติดตาม
                        </div>
                      )}
                    </div>
                    {DatatoonD?.price_of_free !== 0 ? (
                      <div className="view-title-row">
                        <a target="_black_new_page" href={DatatoonD?.book_pdf?.book_pdf_try || UrlNoFIle} >
                          <div className="btn-t">{`ทดลองอ่าน`}</div>
                        </a>
                      </div>
                    ) : (
                      <div className="view-title-row">
                        <Link to={`/ViewToon/${DatatoonD._id}`}>
                          <div className="btn-t">{`อ่าน`}</div>
                        </Link>
                      </div>
                    )}
                    {DatatoonD?.price_of_free === 0 ? (
                      ""
                    ) : (
                      <div className="view-title-row">
                        <div
                          className="btn-t"
                          onClick={() => addToCartHandler(DatatoonD)}
                        >
                          ชื้อ {DatatoonD?.price_of_free} ฿
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="content-box">
              <div className="box-top-d">
                <div
                  className="content-ti"
                  dangerouslySetInnerHTML={{ __html: DatatoonD?.tagline }}
                >
                  {/* {DatatoonD?.tagline} */}
                </div>
              </div>
            </div>
            <div className="content-box">
              <div className="box-top-d">
                {DatatoonD?.typebook === "เล่มเดี่ยว" ? (
                   <div className="try-book">"สำหลับทดลองอ่านสามารถ คลิกที่ปุ่มทดลองอ่าน"</div>
                ) : (
                  <div className="content-chapter-t">
                    <div
                      ref={menuRef}
                      className="btn-chapter-drop"
                      onClick={() => setDropChapter(!dropchapter)}
                    >
                      ✢ ตอนที่ {`1 - ${NumberChapter}`} ✢
                      <div className="b-close">
                        <FontAwesomeIcon
                          icon={
                            dropchapter === true ? faChevronUp : faChevronDown
                          }
                        />
                      </div>
                    </div>

                    {dropchapter && (
                      <div className="list-toon">
                        {DataToonChapter.map((toonchapter, index) => (
                          <div key={index} className="chapter-list">
                            <div className="chapter-layer">
                              <Link
                                to={`/ViewChapter/${toonchapter._id}/${DatatoonD._id}`}
                              >
                                ตอนที่ {toonchapter?.title_name}
                              </Link>
                              <Link className="layer-r"></Link>
                              <Link>
                                วันที่อัพเดท :{" "}
                                {moment(toonchapter?.updatedAt).format(
                                  "YYYY / MMM / DD"
                                )}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {userID !== null ? (
              <div className="content-box">
                <div className="content-img-com">
                  <div className="img-u-comment">
                    <img
                      src={userID?.avatar?.avatar_url || avatarUser}
                      alt=""
                    />
                  </div>
                  <h4>{userID?.namedisplay || userID?.fullname}</h4>
                </div>
                <div className="box-top-d">
                  <textarea
                    type="text"
                    placeholder="ข้อความ"
                    onChange={(e) => setTextComment(e.target.value)}
                  />
                  <div className="btn-v" onClick={handAddcomment}>
                    เขียนรีวิว
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="content-box">
              {NumberComment} รีวิวจากนักอ่าน
              {DataCommentBook?.map((data, keys) => (
                <div className="box-top-d" key={keys}>
                  <div className="content-img-com-re">
                    <div className="img-u-comment s-b">
                      <img
                        src={data?.mangauser?.avatar?.avatar_url || avatarUser}
                        alt=""
                      />
                    </div>
                    <h4 className="name-p">
                      {data?.mangauser?.namedisplay ||
                        data?.mangauser?.fullname}
                    </h4>
                    <div className="show-re-view">
                      <div className="row-list-cview">
                        <div className="textview">{data?.textreview}</div>
                      </div>
                      <div className="row-list-cview">
                        <div className="textview">
                          {moment(data?.updatedAt).format(
                            "YYYY / MMM / DD  , h:mm:ss a"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-v-re">ตอบกลับ</div>
                </div>
              ))}
              {/* <textarea type="text" placeholder='ข้อความ'
                 onChange={(e) => setTextComment(e.target.value)}/> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
