import React, { useState, useRef, useEffect } from "react";
import config from "../../../config.json";
import excover from "../../../assets/book-test/nocover.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faChevronUp,
  faChevronDown,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./AddCh.css";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Load from "../../alertshow/Load";

const UpdataChapter = ({ DataToonChapter, DatatoonD, Loadings ,setDataChapter }) => {
  const {chapteid } = useParams();
  const navigator = useNavigate();
  const [dropchapter, setDropChapter] = useState(false);
  const [selectedImages, setSelectesImages] = useState([]);
  const [imagefiles, setImg] = useState([]);
  const [title_name, setTitlename] = useState();
  const [contentsNovel, setContentNovel] = useState();
  const [load, setLoad] = useState(false);
  const [databookchapterdetail, setData] = useState([]);
  const [dataimage, setDataImage] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${config.apidatatoonbookchapterdatail}/${chapteid}`
        );
        setData(res.data);
        setTitlename(res.data.title_name);
        setContentNovel(res.data.contents);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [chapteid]);

  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${config.apidatachapterimage}/${chapteid}`
        );
        setDataImage(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchDataImage();
  },[chapteid]);

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
  const Number = DataToonChapter.map((a, index) => {
    NumberChapter = 1 + index;
    return NumberChapter;
  });

  const DeleteChapter = (data) => {
    try{
          Swal.fire({
          text: 'ต้องการลบใช่หรือไม่ ?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          cancelButtonText:'ยกเลิก',
          confirmButtonText: 'ยืนยัน',
          })
          .then(async (result) => {
          if (result.isConfirmed) {
             Swal.fire(
                'Success!',
                'ลบข้อมูลสำเร็จ',
                'success'
                )
             setDataChapter(DataToonChapter.filter((f)=> f._id !== data._id))
             await axios.delete(`${config.apiDeletechapterbook}/${data?._id}`)
             console.log("ลบ");
             }
          })
    }catch(err){
       Swal.fire({
          icon: 'error',
          text: 'ลบข้อมูลไม่สำเร็จ',
        })
    }
 }

  const handDeleteImage = async (data) => {
    try{
          setDataImage(dataimage.filter((f)=> f._id !== data._id))
          await axios.delete(`${config.apidDeleteimage}/${data?._id}`)
          console.log("ลบ");
      }catch(err){
        Swal.fire({
            icon: 'error',
            title: 'ลบข้อมูลไม่สำเร็จ',
          })
      }
  }

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
      const res = await axios.put(
        `${config.apiUpdatachapterbook}/${chapteid}`,
        formData,
        configsheaders
      );
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
      });
      setLoad(false);
      navigator(0);
      console.log(res);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
      });
      console.log(err);
    }
  };

  if (DatatoonD?.typebookAndnovel === "หนังสือการ์ตูน") {
    return (
      <>
      {load ? <Load/> : (
        <div className="box-bg-wh">
          <div className="box-container-rl">
            <div className="box-ld">
              <div className="col-box">
                <div className="img-box-top-ld">
                  <img src={DatatoonD?.cover_image?.cover_image_url || excover} alt="" />
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
                                  onClick={() => DeleteChapter(toonchapter) } 
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
                  tabIndex={-1}
                >
                  <input
                    type="file"
                    multiple
                    onChange={onSelectFile}
                    hidden
                    className="input"
                    tabIndex={1}
                  />
                  <p>ลากและวางไฟล์ภาพที่นี้</p>
                </div>
              </div>
              <div className="col-ct">
                <div className="img-wh-d font">
                  รายการภาพการ์ตูน <div style={{color:'red',fontSize:'12px'}}>
                    (คำแนะนำเมื่อมีการแก้ไขภาพโปรดทำการลบภาพทั้งหมดออกเพื่อไม่ให้ลำดับภาพเกิดไม่ถูกต้อง)</div>
                  <div className="lis">
                    <>
                      {dataimage && dataimage.sort((a, b) => a.imageNumber > b.imageNumber ? 1 : -1).map((daimage, keys) => (
                          <div className="img-s-box">
                            <button onClick={()=>handDeleteImage(daimage)}>ลบ</button>
                            <img src={`http://localhost:4002/public/coverimage/${daimage?.image}` || excover} alt=""/>
                            {keys + 1}
                          </div>
                       ))
                       } 
                    </> 
                     <>
                        {
                          selectedImages &&
                          selectedImages.map((imageA, keys) => (
                            <div className="img-s-box" key={keys}>
                              <button
                                onClick={() =>{
                                  setSelectesImages(
                                    selectedImages.filter((e) => e !== imageA)
                                  )
                                 }
                                }
                              >
                                ลบ
                              </button>
                              <img src={imageA || excover} alt="" />
                              {keys + 1}
                            </div>
                          ))
                        }
                      </>
                  </div>
                </div>
              </div>
              <div className="col-ct end">
                <div className="btn-save-cancel">
                  <button className="cancel" onClick={()=> navigator(`/PreviewBook/${DatatoonD?._id}`)}>ยกเลิก</button>
                  <button onClick={handleSummit}>บันทึก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     </>
    );
  } else if (DatatoonD?.typebookAndnovel === "หนังสือนิยาย") {
    return (
      <>
       { load ? <Load/> : (
        <div className="box-bg-wh">
          <div className="box-container-rl">
            <div className="box-ld">
              <div className="col-box">
                <div className="img-box-top-ld">
                  <img src={DatatoonD?.cover_image?.cover_image_url || excover} alt="" />
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
                                      `/UpdataChapter/${toonchapter._id}/book/${DatatoonD?._id}`
                                    )
                                  }
                                >
                                  แก้ไข
                                </button>
                                <button
                                  className="del-red"
                                  onClick={() => 
                                    DeleteChapter(toonchapter)
                                  }
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
                  setContents={contentsNovel}
                />
              </div>
              <div className="col-ct end">
                <div className="btn-save-cancel">
                 <button className="cancel" onClick={()=> navigator(`/PreviewBook/${DatatoonD?._id}`)}>ยกเลิก</button>
                  <button onClick={handleSummit}>บันทึก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
       )}
      </>
    );
  }
};

export default UpdataChapter;
