import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import avatarUser from "../../assets/userAvatar/user.png";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config.json";
import moment from "moment-timezone";
import Load from "../../components/alertshow/Load";
import "./View.css";
import "./Preview.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../redux/action/wishlist";
const View = ({ DataToonChapter, DatatoonD, userID, DataComment , setClick ,click}) => {
  const [dropchapter, setDropChapter] = useState(false);
  const [textment, setTextComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  let Cment = 0;
  const Ment = DataComment?.map((a, index) => {
    Cment = index + 1;
  });
  let Chapter = null;
  const SumNum = DataToonChapter.map((a, index) => {
    Chapter = a.title_name;
  });
  const menuRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current) {
      setDropChapter(false);
    }
  });
  let i = 0;
  for (i; i < DataToonChapter.length; ++i) {
    console.log(i + 1);
  }

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
        navigator(0);
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
    <>
      {loading ? (
        <Load />
      ) : (
        <div className="box-v-d">
          <div className="content-box">
            <div className="box-top-d">
              <div className="box-v-d-img-box">
                <img src={DatatoonD?.cover_image?.cover_image_url} alt="" />
              </div>
              <div className="box-v-d-r">
                <div className="title-n-n">{DatatoonD.title}</div>
                <div className="t-name-s">
                  โดย : {DatatoonD.mangauser?.namedisplay || DatatoonD.mangauser?.fullname}
                </div>
                <div className="t-r">{DatatoonD.category_main}</div>
                <div className="box-v-d-menu-tool">
                  <div className="view-title-row">
                    <div className="view-t">👁️ ยอดวิว</div>
                    <div className="view-u">{`11`}</div>
                  </div>
                  <div className="view-title-row">
                    <div className="view-t">📜 จำนวนตอน</div>
                    <div className="view-u">{i}</div>
                  </div>
                  <div className="view-title-row">
                    <div className="view-t">📝 ความคิดเห็น</div>
                    <div className="view-u">{Cment}</div>
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
                  {/* <div className="view-title-row">
                            <div onClick={()=> navigator(`/ViewChapter/${DataToon._id}`)} className="btn-sum">{`อ่าน`}</div> 
                          </div>                  */}
                 {DatatoonD?.price_of_free === 0 ? "" :(
                      <div className="view-title-row">
                        <div className="btn-t">
                          ชื้อ {DatatoonD?.price_of_free} ฿
                        </div>
                      </div>
                    )
                    }
                </div>
              </div>
            </div>
          </div>
          <div className="content-box">
            <div className="box-top-d">
              <div className="content-ti" dangerouslySetInnerHTML={{__html:DatatoonD?.tagline}}></div>
            </div>
          </div>
          <div className="content-box">
            <div className="box-top-d">
              { DatatoonD?.typebook === "เล่มเดี่ยว" ? '' :
              <div className="content-chapter-t">
                <div
                  ref={menuRef}
                  className="btn-chapter-drop"
                  onClick={() => setDropChapter(!dropchapter)}
                >
                  ✢ ตอนที่ 1 - {DataToonChapter.length} ✢
                  <div className="b-close">
                    <FontAwesomeIcon
                      icon={dropchapter === true ? faChevronUp : faChevronDown}
                    />
                  </div>
                </div>
                {dropchapter && (
                  <div className="list-toon">
                    {DataToonChapter.map((datatoon, index) => (
                      <div key={index} className="chapter-list">
                        <div className="chapter-layer">
                          <Link
                            style={{ fontSize: "13px" }}
                            to={`/ViewChapter/${datatoon._id}/${DatatoonD._id}`}
                          >
                            ตอนที่ {datatoon.title_name}
                          </Link>
                          <Link style={{ fontSize: "13px" }}>
                            วันที่อัพเดท :{" "}
                            {moment(datatoon?.updatedAt).format(
                              "YYYY / MMM / DD , h:mm:ss a"
                            )}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
               }
            </div>
          </div>
          {userID !== null ? (
            <div className="content-box">
              <div className="content-img-com">
                <div className="img-u-comment">
                  <img src={userID?.avatar?.avatar_url || avatarUser} alt="" />
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
            {Cment} รีวิวจากนักอ่าน
            {DataComment?.map((data, keys) => (
              <div className="box-top-d" key={keys}>
                <div className="content-img-com-re">
                  <div className="img-u-comment s-b">
                    <img
                      src={data?.mangauser?.avatar?.avatar_url || avatarUser}
                      alt=""
                    />
                  </div>
                  <h4 className="name-p">{data?.mangauser?.namedisplay ||data?.mangauser?.fullname}</h4>
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
      )}
    </>
  );
};

export default View;
