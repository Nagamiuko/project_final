import React, { useState, useRef } from "react";
import config from "../../../config.json";
import excover from "../../../assets/book-test/nocover.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./AddCh.css";
import axios from "axios";
import Swl from "sweetalert2";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const AddCh = ({ DataToonChapter, DatatoonD, Loadings, setDataChapter }) => {
  const { bookid } = useParams();
  const navigator = useNavigate();
  const [dropchapter, setDropChapter] = useState(false);
  const [selectedImages, setSelectesImages] = useState([]);
  const [imagefiles, setImg] = useState([]);
  const [title_name, setTitlename] = useState();
  const [contentsNovel, setContentNovel] = useState();
  const [load, setLoad] = useState(false);

  const onSelectFile = (evert) => {
    const selectedFiles = evert.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImg(selectedFiles);
    setSelectesImages(imagesArray);
  };

  const menuRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current) {
      setDropChapter(false);
    }
  });
  let NumberChapter = 0;
  const SumNum = DataToonChapter.map((a, index) => {
    NumberChapter = 1 + index;
  });

  const setText = (content) => {
    return setContentNovel(content);
  };
  const handleSummit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < imagefiles.length; i++) {
      formData.append("imagechapter", imagefiles[i]);
      console.log(imagefiles[i]);
    }
    formData.append("contents", contentsNovel);
    formData.append("title_name", title_name);

    const configsheaders = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      setLoad(true);
      const res = await axios.post(
        `${config.apiaddcartoonchapter}/${bookid}`,
        formData,
        configsheaders
      );
      Swl.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
      });
      setLoad(false);
      navigator(`/PreviewBook/${DatatoonD._id}`);
      console.log(res);
    } catch (err) {
      Swl.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
      });
      console.log(err);
    }
  };
  const DeleteChapter = (data) => {
    try {
      Swl.fire({
        text: "ต้องการลบใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swl.fire("Success!", "ลบข้อมูลสำเร็จ", "success");
          setDataChapter(DataToonChapter.filter((f) => f._id !== data._id));
          await axios.delete(`${config.apiDeletechapterbook}/${data?._id}`);
          console.log("ลบ");
        }
      });
    } catch (err) {
      Swl.fire({
        icon: "error",
        text: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };
  // console.log(selectedImages);
  // console.log(imagefiles);
  // console.log(bookid);
  console.log(DatatoonD);
  console.log(contentsNovel);

  if (DatatoonD?.typebookAndnovel === "หนังสือการ์ตูน") {
    return (
      <>
        <div className="box-bg-wh">
          <div className="box-container-rl">
            <div className="box-ld">
              <div className="col-box">
                <div className="img-box-top-ld">
                  <img
                    src={DatatoonD?.cover_image?.cover_image_url || excover}
                    alt=""
                  />
                </div>
                <div className="title-bookname">{DatatoonD?.title}</div>
              </div>
              <div className="col-box">
                <button
                  className="btn-add"
                  onClick={(e) => navigator(`/AddtoonEP/${DatatoonD?._id}`)}
                >
                  เพิ่มตอนใหม่
                </button>
              </div>
              <div className="col-box">
                <div className="lis-toon-ch">
                  <div className="content-chapter-t">
                    <div
                      ref={menuRef}
                      className="btn-chapter-drop"
                      onClick={() => setDropChapter(!dropchapter)}
                    >
                      ตอนที่ {`1 - ${NumberChapter}`} ✢
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
                              <Link>{toonchapter?.title_name}</Link>
                              <div className="btn-ed-r">
                                <button
                                  onClick={() =>
                                    navigator(
                                      `/UpdataChapter/${toonchapter._id}/book/${DatatoonD._id}`
                                    )
                                  }
                                >
                                  แก้ไข
                                </button>
                                <button
                                  className="del-red"
                                  onClick={() => DeleteChapter(toonchapter)}
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
            </div>
            <div className="box-rd">
              <div className="black-page">
                <div
                  className="text-black"
                  onClick={() => navigator(`/PreviewBook/${DatatoonD?._id}`)}
                >
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back
                </div>
              </div>
              <div className="col-ct">
                <div className="col-box-in">
                  <label htmlFor="">ชื่อตอน</label>
                  <input
                    type="text"
                    placeholder="ระบุชื่อตอน"
                    onChange={(e) => setTitlename(e.target.value)}
                    value={title_name}
                  />
                </div>
              </div>
              <div className="col-ct">
                <div className="title">อัพโหลดภาพการ์ตูน</div>
                <div
                  className="col-box-img"
                  onClick={() => document.querySelector(".input").click()}
                  tabIndex={1}
                >
                  <input
                    type="file"
                    multiple
                    onChange={onSelectFile}
                    hidden
                    className="input"
                    tabIndex={-1}
                  />
                  <p>ลากและวางไฟล์ภาพที่นี้</p>
                </div>
              </div>
              <div className="col-ct">
                <div className="img-wh-d font">
                  รายการภาพการ์ตูน
                  <div className="lis">
                    {selectedImages &&
                      selectedImages.map((imageA, keys) => (
                        <div className="img-s-box" key={keys}>
                          <button
                            onClick={() =>
                              setSelectesImages(
                                selectedImages.filter((e) => e !== imageA)
                              )
                            }
                          >
                            ลบ
                          </button>
                          <img src={imageA || excover} alt="" />
                          {keys + 1}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-ct end">
                <div className="btn-save-cancel">
                  <button className="cancel">ยกเลิก</button>
                  <button onClick={handleSummit}>บันทึก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (DatatoonD?.typebookAndnovel === "หนังสือนิยาย") {
    return (
      <>
        <div className="box-bg-wh">
          <div className="box-container-rl">
            <div className="box-ld">
              <div className="col-box">
                <div className="img-box-top-ld">
                  <img
                    src={DatatoonD?.cover_image?.cover_image_url || excover}
                    alt=""
                  />
                </div>
                <div className="title-bookname">{DatatoonD?.title}</div>
              </div>
              <div className="col-box">
                <button
                  className="btn-add"
                  onClick={(e) => navigator(`/AddtoonEP/${DatatoonD?._id}`)}
                >
                  เพิ่มตอนใหม่
                </button>
              </div>
              <div className="col-box">
                <div className="lis-toon-ch">
                  <div className="content-chapter-t">
                    <div
                      ref={menuRef}
                      className="btn-chapter-drop"
                      onClick={() => setDropChapter(!dropchapter)}
                    >
                      ตอนที่ {`1 - ${NumberChapter}`} ✢
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
                              <Link>{toonchapter?.title_name}</Link>
                              <div className="btn-ed-r">
                                <button
                                  onClick={() =>
                                    navigator(
                                      `/UpdataChapter/${toonchapter._id}/book/${DatatoonD._id}`
                                    )
                                  }
                                >
                                  แก้ไข
                                </button>
                                <button
                                  className="del-red"
                                  onClick={() => DeleteChapter(toonchapter)}
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
            </div>
            <div
              className="box-rd"
              style={{
                height: "auto",
              }}
            >
              <div className="black-page">
                <div
                  className="text-black"
                  onClick={() => navigator(`/PreviewBook/${DatatoonD?._id}`)}
                >
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back
                </div>
              </div>
              <div className="col-ct">
                <div className="col-box-in">
                  <label htmlFor="">ชื่อตอน</label>
                  <input
                    type="text"
                    placeholder="ระบุชื่อตอน"
                    onChange={(e) => setTitlename(e.target.value)}
                    value={title_name}
                  />
                </div>
              </div>
              <div className="col-ct">
                <div className="title">อัพโหลดเนื้อเรื่อง</div>
                <SunEditor
                  placeholder="เนื้อเรื่อง"
                  height="400"
                  onChange={setText}
                  setOptions={{
                    buttonList:[
                      [
                       "fontSize",
                       "bold",
                       "underline",
                       "italic",
                       "strike",
                       "removeFormat",
                       "fontColor",
                       "hiliteColor",
                       "align",
                       "preview",
                       "print",
                       "textStyle",
                      ]
                    ]
                  }}
                />
              </div>
              <div className="col-ct end">
                <div className="btn-save-cancel">
                  <button className="cancel">ยกเลิก</button>
                  <button onClick={handleSummit}>บันทึก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AddCh;
