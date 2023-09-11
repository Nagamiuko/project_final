import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import avatarUser from "../../../assets/userAvatar/user.png";
import config from "../../../config.json";
import axios from "axios";
import Swal from "sweetalert2";
import Load from '../../alertshow/Load'
import nocover from '../../../assets/book-test/nocover.png'
import "../../PreviewToon/View.css";
import "../../PreviewToon/Preview.css";
import "./AddCBook.css";
import moment from "moment-timezone";
const AddCBook = ({ DataToon, DatatoonD , DataCment , userID}) => {
  const [dropchapter, setDropChapter] = useState(false);
  const [textment, setTextComment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  let NumberChapter = 0;
  const SumNum = DataToon.map((a, index) => {
    NumberChapter = 1 + index;
  });
  let CmentBook = 0;
  const Ment = DataCment.map((a, index) => {
    CmentBook = 1 + index;
  });
  const menuRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current) {
      setDropChapter(false);
    }
  });

  const submitHandle = (i,oi) => {
    navigator(`/bookstand?Book=${i._id}`);
  };
  const handAddcomment = async (e) => {
    const Data = {
      textcomment:textment,
    };
    try {
      if (textment === '' ) {
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
        navigator(0)
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handdleDelete = async (data) => {
    try {
      Swal.fire({
        title: "ต้องการลบใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Success!", "ลบข้อมูลสำเร็จ", "success");
          await axios.delete(`${config.apiDeletetoon}/${data?._id}`);
          navigator("/MyBooks");
          console.log("ลบ");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };
  return (
    <>
     { loading ? <Load/> :(
      <div className="box-v-d">
        <div className="content-box">
          <div className="box-top-d">
            <div className="box-e-d-img-box">
              <img src={DatatoonD?.cover_image?.cover_image_url || nocover} alt="" />
            </div>
            <div className="box-v-d-r">
              <div className="title-n-n">{DatatoonD?.title}</div>
              <div className="t-name-s">
                โดย : {DatatoonD?.mangauser?.namedisplay || DatatoonD?.mangauser?.fullname}
              </div>
              <div className="t-r">
                {DatatoonD?.category_main + "/" + DatatoonD?.category}
              </div>
              <div className="box-e-d-menu-tool">
                <div className="view-row">
                  <div className="col-list">
                    <div className="v-e">👁️ ยอดวิว</div>
                    <div className="v-e">{`11`}</div>
                  </div>
                  <div className="col-list">
                    <div className="v-e">📜 จำนวนตอน</div>
                    <div className="v-e">{NumberChapter}</div>
                  </div>
                  <div className="col-list">
                    <div className="v-e">📝 ความคิดเห็น</div>
                    <div className="v-e">{CmentBook}</div>
                  </div>
                </div>

                <div className="btn-lis-col">
                  <div className="btn-e-a">
                    <div
                      onClick={() => navigator(`/AddtoonEP/${DatatoonD?._id}`)}
                      className="btn-e"
                    >
                      เพิ่มตอนใหม่
                    </div>
                    <div
                      className="btn-e"
                      onClick={() => handdleDelete(DatatoonD)}
                    >
                      ลบ
                    </div>
                  </div>
                  <div className="btn-e-a">
                    <div onClick={()=> submitHandle(DatatoonD)} className="btn-e">รายได้</div>
                    <Link to={`/UpdataCartoon/${DatatoonD._id}`}>
                      <div className="btn-e">แก้ไข</div>{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-box">
          <div className="box-top-d">
            <div className="content-ti">{DatatoonD.synopsis}</div>
          </div>
        </div>
        <div className="content-box">
          <div className="box-top-d">
            <div className="content-chapter-t">
              <div
                ref={menuRef}
                className="btn-chapter-drop"
                onClick={() => setDropChapter(!dropchapter)}
              >
                ตอนที่ {`1 - ${NumberChapter}`} ✢
                <div className="b-close">
                  <FontAwesomeIcon
                    icon={dropchapter === true ? faChevronUp : faChevronDown}
                  />
                </div>
              </div>
              {dropchapter && (
                <div className="list-toon">
                  {DataToon.map((datatoon, index) => (
                    <div key={index} className="chapter-list">
                      <div className="chapter-layer">
                        <div className="lis-ton">{datatoon?.title_name}</div>
                        <div className="btn-ed-r">
                          <div className="recom">
                            <div className="lis-ton ml4">คอมเม้นท์</div>
                            <div className="lis-ton ml4">
                              {moment(datatoon?.updatedAt).format(
                                "YYYY / MMM / DD , h:mm:ss A"
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              navigator(
                                `/UpdataChapter/${datatoon._id}/book/${DatatoonD._id}`
                              )
                            }
                          >
                            แก้ไข
                          </button>
                          <button
                            className="del-red"
                            onClick={() => navigator(``)}
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="content-box">
        <div className="content-img-com">
              <div className="img-u-comment">
                <img src={userID?.avatar_url||avatarUser} alt="" />
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
        <div className="content-box">
        {CmentBook} รีวิวจากนักอ่าน
        {DataCment?.map((data ,keys) => (
            <div className="box-top-d" key={keys}>
              <div className="content-img-com-re">
                <div className="img-u-comment s-b">
                  <img src={data?.mangauser?.avatar_url ||avatarUser} alt="" />
                </div>
                <h4 className="name-p">{data?.mangauser?.namedisplay || data?.mangauser?.fullname}</h4>
                <div className="show-re-view">
                  <div className="row-list-cview">
                    <div className="textview">{data?.textreview}</div>
                  </div>
                  <div className="row-list-cview">
                    <div className="textview">{moment(data?.updatedAt).format('YYYY / MMM / DD  , h:mm:ss a')}</div>
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

export default AddCBook;
