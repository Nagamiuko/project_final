import React, { useState, useRef } from "react";
import avatarUser from "../../assets/userAvatar/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faList } from "@fortawesome/free-solid-svg-icons";
import "./WToon.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useFetchDataToonChapter from "../hooks/BookChapter";
import GoTop from "../GotoTop/GoTop";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import config from "../../config.json";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import Load from "../alertshow/Load";
import { url } from "../../serverimage";
const WToon = ({
  DataChapterToon,
  DataToonChapterDetali,
  DataBook,
  Loading,
  DataCment,
  userID,
}) => {
  const [openListMenu, setOpenListMenu] = useState(false);
  const { databookchapter } = useFetchDataToonChapter(DataBook._id);
  const [textment, setTextComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const menuRef = useRef();
  const menuPop = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== menuPop.current) {
      setOpenListMenu(false);
    }
  });

  let Cment = 0;
  const Ment = DataCment?.map((a, index) => {
    Cment = index + 1;
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
        await axios.post(
          `${config.apiuserAddCommentChapter}/${DataToonChapterDetali?._id}/${userID?._id}`,
          Data
        );
        setLoading(false);
        navigator(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (DataBook?.typebookAndnovel === "หนังสือการ์ตูน") {
    return (
      <>
        {loading ? (
          <Load />
        ) : (
          <div>
            <GoTop />
            <div className="btn-back">
              <Link to={`/ViewToon/${DataBook._id}`}>
                <FontAwesomeIcon icon={faAngleLeft} /> {DataBook.title}
              </Link>
            </div>
            <div className="box-r-v">
              <div className="content-box">
                <div className="flex-box-center">
                  <div className="flex-cor">
                    <div className="menu-chapter--">
                      <div className="menu-b">
                        <FontAwesomeIcon
                          ref={menuRef}
                          className="menu-b"
                          onClick={() => setOpenListMenu(!openListMenu)}
                          icon={faList}
                        />
                      </div>
                      {openListMenu && (
                        <div className="drop-l-t">
                          <div ref={menuPop} className="bg-l-t">
                            <div className="img-title-t">
                              <div className="b-g">
                                <img
                                  src={DataBook?.cover_image?.cover_image_url}
                                  alt=""
                                  width={45}
                                />
                                <div className="d-d">
                                  <div>{DataBook?.title}</div>
                                  <div>โดย {DataBook?.mangauser?.namedisplay || DataBook?.mangauser?.fullname}</div>
                                </div>
                              </div>
                            </div>
                            {databookchapter?.map((datachapter, numch) => (
                              <div key={numch} className="box-l-t">
                                <div className="line-center">
                                  <NavLink
                                    className="box-l-t"
                                    to={`/ViewChapter/${datachapter?._id}/${DataBook?._id}`}
                                  >
                                    {" "}
                                    {`${datachapter?.title_name}`}
                                  </NavLink>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-center">
                      <div className="col-row">
                        <div className="title-h">
                          {DataToonChapterDetali?.title_name}
                        </div>
                        <div className="title-name">
                          โดย: <Link>{DataBook?.mangauser?.namedisplay || DataBook?.mangauser?.fullname}</Link>
                        </div>
                      </div>
                    </div>
                    {Loading ? (
                      <RotatingLines
                        strokeColor="#182c6f"
                        strokeWidth="4.5"
                        animationDuration="0.75"
                        width="90"
                        visible={true}
                      />
                    ) : (
                      <div className="content-img-cover">
                        {DataChapterToon &&
                          DataChapterToon.sort((a, b) =>
                            a.imageNumber > b.imageNumber ? 1 : -1
                          ).map((imagechapter) => (
                            <img
                              key={imagechapter.imageNumber}
                              src={`${url}/${imagechapter.image}`}
                              alt=""
                            />
                          ))}
                      </div>
                    )}
                  </div>
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
                {Cment} รีวิวจากนักอ่าน
                {DataCment?.map((data, keys) => (
                  <div className="box-top-d" key={keys}>
                    <div className="content-img-com-re">
                      <div className="img-u-comment s-b">
                        <img
                          src={data?.mangauser?.avatar?.avatar_url || avatarUser}
                          alt=""
                        />
                      </div>
                      <h4 className="name-p">{data?.mangauser?.fullname}</h4>
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
                    {/* <div className="btn-v-re">ตอบกลับ</div> */}
                  </div>
                ))}
                {/* <textarea type="text" placeholder='ข้อความ'
                        onChange={(e) => setTextComment(e.target.value)}/>  */}
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (DataBook?.typebookAndnovel === "หนังสือนิยาย") {
    return (
      <>
        {loading ? (
          <Load />
        ) : (
          <div>
            <GoTop />
            <div className="btn-back">
              <Link to={`/ViewToon/${DataBook._id}`}>
                <FontAwesomeIcon icon={faAngleLeft} /> {DataBook.title}
              </Link>
            </div>
            <div className="box-r-v">
              <div className="content-box">
                <div className="flex-box-center">
                  <div className="flex-cor">
                    <div className="menu-chapter--">
                      <div className="menu-b">
                        <FontAwesomeIcon
                          ref={menuRef}
                          className="menu-b"
                          onClick={() => setOpenListMenu(!openListMenu)}
                          icon={faList}
                        />
                      </div>
                      {openListMenu && (
                        <div className="drop-l-t">
                          <div ref={menuPop} className="bg-l-t">
                            <div className="img-title-t">
                              <div className="b-g">
                                <img
                                  src={DataBook?.cover_image?.cover_image_url}
                                  alt=""
                                  width={45}
                                />
                                <div className="d-d">
                                  <div>{DataBook?.title}</div>
                                  <div>โดย {DataBook?.mangauser?.namedisplay || DataBook?.mangauser?.fullname}</div>
                                </div>
                              </div>
                            </div>
                            {databookchapter.map((datachapter, numch) => (
                              <div key={numch} className="box-l-t">
                                <div className="line-center">
                                  <NavLink
                                    className="box-l-t"
                                    to={`/ViewChapter/${datachapter._id}/${DataBook._id}`}
                                  >
                                    {" "}
                                    {`${datachapter?.title_name}`}
                                  </NavLink>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-center">
                      <div className="col-row">
                        <div className="title-h">
                          {DataToonChapterDetali?.title_name}
                        </div>
                        <div className="title-name">
                          โดย <Link>{DataBook?.mangauser?.namedisplay || DataBook?.mangauser?.fullname}</Link>
                        </div>
                      </div>
                    </div>
                    {Loading ? (
                      <RotatingLines
                        strokeColor="#182c6f"
                        strokeWidth="4.5"
                        animationDuration="0.75"
                        width="90"
                        visible={true}
                      />
                    ) : (
                      <div className="content-text">
                        <div
                          className="textNovel"
                          dangerouslySetInnerHTML={{
                            __html: DataToonChapterDetali?.contents,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
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
                {Cment} รีวิวจากนักอ่าน
                {DataCment?.map((data, keys) => (
                  <div className="box-top-d" key={keys}>
                    <div className="content-img-com-re">
                      <div className="img-u-comment s-b">
                        <img
                          src={data?.mangauser?.avatar?.avatar_url || avatarUser}
                          alt=""
                        />
                      </div>
                      <h4 className="name-p">{data?.mangauser?.namedisplay || data?.mangauser?.fullname}</h4>
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
                    {/* <div className="btn-v-re">ตอบกลับ</div> */}
                  </div>
                ))}
                {/* <textarea type="text" placeholder='ข้อความ'
                  onChange={(e) => setTextComment(e.target.value)}/>  */}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default WToon;
