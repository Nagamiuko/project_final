import React, { useState, useEffect } from "react";
import "./BookCreate.css";
import TestCover1 from "../../assets/book-test/nocover.png";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import config from "../../config.json";
import Swl from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Load from "../alertshow/Load";

const UpdataBook = ({ DataBook, BookID }) => {
  const [load, setLoad] = useState(false);
  const [bookname, setBookName] = useState();
  const [tbook, setTBook] = useState();
  const [abook, setABook] = useState();
  const [ratings, setRating] = useState();
  const [catgory, setCategory] = useState();
  const [categorymain, setCategoryMain] = useState();
  const [synopsi, setSyBook] = useState();
  const [taglines, setTagline] = useState();
  const [ctype, setCtype] = useState();
  const [ctypebook, setCtypeBook] = useState();
  const [cpicefofree, setCpice] = useState(0);
  const [filefullpdf, setFileFullPDF] = useState("");
  const [filetrypdf, setFileTryPDF] = useState("");
  const [fileCover, setFileCover] = useState("");
  const [image, setFileImage] = useState("");
  const [books, setฺBooks] = useState("หนังสือการ์ตูน");
  const [novel, setNovel] = useState("หนังสือนิยาย");
  const [data, setData] = useState([]);
  const navigator = useNavigate();
  const [error, setError] = useState([]);
  let TyBook = null;
  
  const isChecked = (value) => value === ctypebook;
  const onSelecTypeBook = ({target: {value} }) => {
    setCtypeBook(value)
  }
  const isChecked2 = (value) => value === cpicefofree;
  const onSelectPrice = ({target: {value} }) => {
    setCpice(value)
  }
  const isChecked3 = (value) => value === ctype;
  const onSelectTandP = ({target: {value} }) => {
    setCtype(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      try {
        const res = await axios.post(`${config.apidatatoonone}/${BookID}`);
        setBookName(res.data.title);
        setTBook(res.data.t_name);
        setABook(res.data.a_name);
        setRating(res.data.rating);
        setCategory(res.data.category);
        setCategoryMain(res.data.category_main);
        setSyBook(res.data.synopsis);
        setTagline(res.data.tagline);
        setCpice(res.data.price_of_free)
        setCtypeBook(res.data.typebook)
        setCtype(res.data.typebook_singer_a_muti)
        setData(res);
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoad(false);
    };
    fetchData();
  }, [BookID]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileImage(reader.result);
    };
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileCover(file);
    previewFile(file);
  };
  const setText = (content) => {
    return setTagline(content);
  };

  if (DataBook?.typebookAndnovel === "หนังสือการ์ตูน") {
    TyBook = books;
  } else {
    TyBook = novel;
  }

  let FreBok = ''
  let Price = null
  const FreeBok = (ctypebook) =>{
       if(ctypebook === 'รายตอน'){
         FreBok = 'ฟรี'
         Price = 0;
       }
       else{
         FreBok = 'เสียตัง'
       }
  }
  
  const FreeBokType = (cpicefofree) =>{
    if(cpicefofree === 'ฟรี'){
      Price = 0
    }
    else{
      Price = cpicefofree
    }
  }
  
  FreeBok(ctypebook)
  FreeBokType(cpicefofree)

  const handleSummit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titlebook", bookname);
    formData.append("tname", tbook);
    formData.append("aname", abook);
    formData.append("rating", ratings);
    formData.append("categoryone", categorymain);
    formData.append("categorywto", catgory);
    formData.append("tagline", taglines);
    formData.append("synopsis", synopsi);
    formData.append("tybook", ctypebook);
    formData.append("typebook", ctype);
    formData.append("typeprice", Price);
    formData.append("imagecover", fileCover);
    formData.append("typebookAndnovel", TyBook);
    formData.append("freeBook", FreBok);
    formData.append("book_pdf_full", filefullpdf);
    formData.append("book_pdf_try", filetrypdf);
    const configsheaders = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      setLoad(true);
      await axios.put(
        `${config.apiUpdatatoon}/${DataBook?._id}`,
        formData,
        configsheaders
      );
      Swl.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
      });
      setLoad(false);
      navigator("/MyBooks");
    } catch (err) {
      Swl.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
      });
      console.log(err);
    }
  };
  if (DataBook?.typebookAndnovel === "หนังสือการ์ตูน") {
    return (
      <>
       { load ? <Load/> : (
        <div className="box-bg-book-cte">
          <div className="box-container-book filter-drop-container">
            <div className="title-h-book">แก้ไขหนังสือของฉัน</div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="b-book-cor">
              <div className="im-book-cover">
                <label htmlFor="imgeCover">
                  <img
                    src={
                      image ? image : DataBook?.cover_image?.cover_image_url || TestCover1
                    }
                    alt=""
                  />
                </label>
                <input
                  id="imgeCover"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
              </div>
              <div className="row-in">
                <div className="in-dt-book">
                  <table>ชื่อเรื่อง</table>
                  <input
                    type="text"
                    value={bookname}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>
                <div className="in-dt-namet">
                  <div className="t-name-book">
                    <table>ชื่อผู้แต่ง</table>
                    <input
                      type="text"
                      value={tbook}
                      onChange={(e) => setTBook(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-control"
                    value={ratings}
                    id="value"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">เลือกเรตติ้ง</option>
                    <option value="ทั่วไป">ทั่วไป</option>
                    <option value="18+">18+</option>
                    <option value="25+">25+</option>
                  </select>
                </div>
                <div className="in-dt-name-a">
                  <div className="a-name-book">
                    <table>ชื่อผู้แปล</table>
                    <input
                      type="text"
                      value={abook}
                      onChange={(e) => setABook(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-t"
                    id="value"
                    value={categorymain}
                    onChange={(e) => setCategoryMain(e.target.value)}
                  >
                    <option value> หมวดหมู่ / ประเภทที่ 1</option>
                    <option value="กำลังภายใน">กำลังภายใน</option>
                    <option value="โรแมนติก">โรแมนติก</option>
                    <option value="แฟนตาซี">แฟนตาซี</option>
                    <option value="รักวัยรุ่น">รักวัยรุ่น</option>
                    <option value="สืบสวน">สืบสวน</option>
                    <option value="Girl love">Girl love</option>
                    <option value="Boy love">Boy love</option>
                    <option value="ไลท์โนเวล">ไลท์โนเวล</option>
                    <option value="เว็บโนเวล">เว็บโนเวล</option>
                    <option value="กีฬา">กีฬา</option>
                    <option value="ผจญภัย">ผจญภัย</option>
                    <option value="สยองขวัญ">สยองขวัญ</option>
                    <option value="คอเมดี้">คอเมดี้</option>
                    <option value="ย้อนยุค">ย้อนยุค</option>
                    <option value="ระบบ">ระบบ</option>
                    <option value="เกมส์ออนไลน์">เกมส์ออนไลน์</option>
                    <option value="แอคชั่น">แอคชั่น</option>
                  </select>
                  <select
                    className="form-t"
                    id="value"
                    value={catgory}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">หมวดหมู่ / ประเภทที่ 2</option>
                    <option value="กำลังภายใน">กำลังภายใน</option>
                    <option value="โรแมนติก">โรแมนติก</option>
                    <option value="แฟนตาซี">แฟนตาซี</option>
                    <option value="รักวัยรุ่น">รักวัยรุ่น</option>
                    <option value="สืบสวน">สืบสวน</option>
                    <option value="Girl love">Girl love</option>
                    <option value="Boy love">Boy love</option>
                    <option value="ไลท์โนเวล">ไลท์โนเวล</option>
                    <option value="เว็บโนเวล">เว็บโนเวล</option>
                    <option value="กีฬา">กีฬา</option>
                    <option value="ผจญภัย">ผจญภัย</option>
                    <option value="สยองขวัญ">สยองขวัญ</option>
                    <option value="คอเมดี้">คอเมดี้</option>
                    <option value="ย้อนยุค">ย้อนยุค</option>
                    <option value="ระบบ">ระบบ</option>
                    <option value="เกมส์ออนไลน์">เกมส์ออนไลน์</option>
                    <option value="แอคชั่น">แอคชั่น</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="box-sy-book">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={synopsi}
                onChange={(e) => setSyBook(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="box--book">
              <SunEditor onChange={setText} setContents={taglines} />
            </div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="choose-t">
              <div className="c-b-t">
                <table>ประเภทหนังสือการ์ตูน</table>
                <div className="co">
                  <div className="flex-row">
                    <input
                      type="radio"
                      id="custom-in-c1"
                      className="bg-bor-c"
                      value="เล่มเดี่ยว"
                      name="ctypebook"
                      checked ={isChecked("เล่มเดี่ยว")}
                      onChange={onSelecTypeBook}
                    />
                    <label
                      htmlFor="custom-in-c1"
                      className="custom-control-label"
                    >
                      เล่มดี่ยว
                    </label>
                    <input
                      type="radio"
                      id="custom-in-c2"
                      className="bg-bor-c"
                      value="รายตอน"
                      name="ctypebook"
                      checked ={isChecked("รายตอน")}
                      onChange={onSelecTypeBook}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="custom-in-c2"
                    >
                      รายตอน
                    </label>
                  </div>
                </div>
              </div>
              <div className="c-b-t">
                <table>ประเภทการ์ตูน</table>
                <div className="co">
                  <div className="flex-row">
                    <input
                      type="radio"
                      className="bg-bor-c"
                      name="ctype"
                      value="การ์ตูนแปล"
                      checked ={isChecked3("การ์ตูนแปล")}
                      onChange={onSelectTandP}
                    />
                    <label className="custom-control-label">การ์ตูนแปล</label>
                    <input
                      type="radio"
                      className="bg-bor-c"
                      value="การ์ตูน"
                      name="ctype"
                      checked ={isChecked3("การ์ตูน")}
                      onChange={onSelectTandP}
                    />
                    <label className="custom-control-label">การ์ตูน</label>
                  </div>
                </div>
              </div>
              {ctypebook === "เล่มเดี่ยว" ? (
                <div className="c-b-t">
                  <table>ประเภทราคา</table>
                  <div className="co">
                    <div className="flex-row">
                      <input
                        type="radio"
                        className="bg-bor-c"
                        name="ctypefofree"
                        value={null}
                        onChange={(e) => setCpice(e.target.value)}
                      />
                      <label className="custom-control-label">ตั้งราคา</label>
                      <input
                        type="radio"
                        className="bg-bor-c"
                        name="ctypefofree"
                        value="ฟรี"
                        onChange={(e) => setCpice(e.target.value)}
                      />
                      <label className="custom-control-label">ฟรี</label>
                      {cpicefofree === "ฟรี" ? (
                        <input
                          type="number"
                          className="in-pice"
                          value={cpicefofree}
                          name="num"
                          onChange={(e) => setCpice(e.target.value)}
                          disabled
                        />
                      ) : (
                        <input
                          type="number"
                          className="in-pice"
                          value={cpicefofree}
                          name="num"
                          onChange={(e) => setCpice(e.target.value)}
                          placeholder="ราคา"
                        />
                      )}
                      <label className="custom-control-label ml-5">
                        {cpicefofree === "ฟรี"
                          ? cpicefofree + ""
                          : "฿" + cpicefofree}
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {ctypebook === "เล่มเดี่ยว" ? (
            <div className="box-container-book filter-drop-container ">
                <div className="box-sy-book">
                <p>ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวเต็ม <p> ( ไม่สามารถอ่านลิ้งจาก Google Drive )</p></p>
                <div className="box-input">
                <input
                  type="text"
                  id="uploadfilebook"
                  placeholder="ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวเต็ม"
                  onChange={(e) => setFileFullPDF(e.target.value)}
                />
                </div>
              </div>
              <div className="box-sy-book">
                <p>ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวทดลองให้อ่าน<p> ( ไม่สามารถอ่านลิ้งจาก Google Drive )</p></p>
                <div className="box-input">
                <input
                  type="text"
                  id="uploadfilebooktry"
                  placeholder="ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวทดลองให้อ่าน"
                  onChange={(e) => setFileTryPDF(e.target.value)}
                />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="box-container-book filter-drop-container ">
            <div className="btn-book-save">
              <button onClick={handleSummit}>บันทึก</button>
            </div>
          </div>
        </div>
       )}
      </>
    );
  } else if (DataBook?.typebookAndnovel === "หนังสือนิยาย") {
    return (
      <>
       { load ? <Load/> : (
        <div className="box-bg-book-cte">
          <div className="box-container-book filter-drop-container">
            <div className="title-h-book">แก้ไขหนังสือของฉัน</div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="b-book-cor">
              <div className="im-book-cover">
                <label htmlFor="imgeCover">
                  <img
                    src={
                      image ? image : DataBook?.cover_image?.cover_image_url || TestCover1
                    }
                    alt=""
                  />
                </label>
                <input
                  id="imgeCover"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
              </div>
              <div className="row-in">
                <div className="in-dt-book">
                  <table>ชื่อเรื่อง</table>
                  <input
                    type="text"
                    value={bookname}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>
                <div className="in-dt-namet">
                  <div className="t-name-book">
                    <table>ชื่อผู้แต่ง</table>
                    <input
                      type="text"
                      value={tbook}
                      onChange={(e) => setTBook(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-control"
                    value={ratings}
                    id="value"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">เลือกเรตติ้ง</option>
                    <option value="ทั่วไป">ทั่วไป</option>
                    <option value="18+">18+</option>
                    <option value="25+">25+</option>
                  </select>
                </div>
                <div className="in-dt-name-a">
                  <div className="a-name-book">
                    <table>ชื่อผู้แปล</table>
                    <input
                      type="text"
                      value={abook}
                      onChange={(e) => setABook(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-t"
                    id="value"
                    value={categorymain}
                    onChange={(e) => setCategoryMain(e.target.value)}
                  >
                    <option value> หมวดหมู่ / ประเภทที่ 1</option>
                    <option value="กำลังภายใน">กำลังภายใน</option>
                    <option value="โรแมนติก">โรแมนติก</option>
                    <option value="แฟนตาซี">แฟนตาซี</option>
                    <option value="รักวัยรุ่น">รักวัยรุ่น</option>
                    <option value="สืบสวน">สืบสวน</option>
                    <option value="Girl love">Girl love</option>
                    <option value="Boy love">Boy love</option>
                    <option value="ไลท์โนเวล">ไลท์โนเวล</option>
                    <option value="เว็บโนเวล">เว็บโนเวล</option>
                    <option value="กีฬา">กีฬา</option>
                    <option value="ผจญภัย">ผจญภัย</option>
                    <option value="สยองขวัญ">สยองขวัญ</option>
                    <option value="คอเมดี้">คอเมดี้</option>
                    <option value="ย้อนยุค">ย้อนยุค</option>
                    <option value="ระบบ">ระบบ</option>
                    <option value="เกมส์ออนไลน์">เกมส์ออนไลน์</option>
                    <option value="แอคชั่น">แอคชั่น</option>
                  </select>
                  <select
                    className="form-t"
                    id="value"
                    value={catgory}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">หมวดหมู่ / ประเภทที่ 2</option>
                    <option value="กำลังภายใน">กำลังภายใน</option>
                    <option value="โรแมนติก">โรแมนติก</option>
                    <option value="แฟนตาซี">แฟนตาซี</option>
                    <option value="รักวัยรุ่น">รักวัยรุ่น</option>
                    <option value="สืบสวน">สืบสวน</option>
                    <option value="Girl love">Girl love</option>
                    <option value="Boy love">Boy love</option>
                    <option value="ไลท์โนเวล">ไลท์โนเวล</option>
                    <option value="เว็บโนเวล">เว็บโนเวล</option>
                    <option value="กีฬา">กีฬา</option>
                    <option value="ผจญภัย">ผจญภัย</option>
                    <option value="สยองขวัญ">สยองขวัญ</option>
                    <option value="คอเมดี้">คอเมดี้</option>
                    <option value="ย้อนยุค">ย้อนยุค</option>
                    <option value="ระบบ">ระบบ</option>
                    <option value="เกมส์ออนไลน์">เกมส์ออนไลน์</option>
                    <option value="แอคชั่น">แอคชั่น</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="box-sy-book">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={synopsi}
                onChange={(e) => setSyBook(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="box--book">
              <SunEditor onChange={setText} setContents={taglines} />
            </div>
          </div>
          <div className="box-container-book filter-drop-container">
            <div className="choose-t">
              <div className="c-b-t">
                <table>ประเภทหนังสือนิยาย</table>
                <div className="co">
                  <div className="flex-row">
                    <input
                      type="radio"
                      id="custom-in-c1"
                      className="bg-bor-c"
                      value="เล่มเดี่ยว"
                      name="ctypebook"
                      checked ={isChecked("เล่มเดี่ยว")}
                      onChange={onSelecTypeBook}
                    />
                    <label
                      htmlFor="custom-in-c1"
                      className="custom-control-label"
                    >
                      เล่มดี่ยว
                    </label>
                    <input
                      type="radio"
                      id="custom-in-c2"
                      className="bg-bor-c"
                      value="รายตอน"
                      name="ctypebook"
                      checked ={isChecked("รายตอน")}
                      onChange={onSelecTypeBook}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="custom-in-c2"
                    >
                      รายตอน
                    </label>
                  </div>
                </div>
              </div>
              <div className="c-b-t">
                <table>ประเภทนิยาย</table>
                <div className="co">
                  <div className="flex-row">
                    <input
                      type="radio"
                      className="bg-bor-c"
                      name="ctype"
                      value="นิยายแต่ง"
                      checked ={isChecked3("นิยายแต่ง")}
                      onChange={onSelectTandP}
                    />
                     <label className='custom-control-label'>นิยายแต่ง</label>
                    <input
                      type="radio"
                      className="bg-bor-c"
                      value="นิยายแปล"
                      name="ctype"
                      checked ={isChecked3("นิยายแปล")}
                      onChange={onSelectTandP}
                    />
                     <label className='custom-control-label'>นิยายแปล</label>
                  </div>
                </div>
              </div>
              {ctypebook === "เล่มเดี่ยว" ? (
                <div className="c-b-t">
                  <table>ประเภทราคา</table>
                  <div className="co">
                    <div className="flex-row">
                      <input
                        type="radio"
                        className="bg-bor-c"
                        name="ctypefofree"
                        checked ={isChecked2()}
                        onChange={onSelectPrice}
                        value="cpicefofree"
                      />
                      <label className="custom-control-label">ตั้งราคา</label>
                      <input
                        type="radio"
                        className="bg-bor-c"
                        name="ctypefofree"
                        value="ฟรี"
                        checked ={isChecked2("ฟรี")}
                        onChange={onSelectPrice}
                      />
                      <label className="custom-control-label">ฟรี</label>
                      {cpicefofree === "ฟรี" ? (
                        <input
                          type="number"
                          className="in-pice"
                          value={cpicefofree}
                          name="num"
                          onChange={(e) => setCpice(e.target.value)}
                          disabled
                        />
                      ) : (
                        <input
                          type="number"
                          className="in-pice"
                          value={cpicefofree}
                          name="num"
                          onChange={(e) => setCpice(e.target.value)}
                          placeholder="ราคา"
                        />
                      )}
                      <label className="custom-control-label ml-5">
                        {cpicefofree === "ฟรี"
                          ? cpicefofree + ""
                          : "฿" + cpicefofree}
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {ctypebook === "เล่มเดี่ยว" ? (
            <div className="box-container-book filter-drop-container ">
                     <div className="box-sy-book">
                <p>ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวเต็ม <p> ( ไม่สามารถอ่านลิ้งจาก Google Drive )</p></p>
                <div className="box-input">
                <input
                  type="text"
                  id="uploadfilebook"
                  placeholder="ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวเต็ม"
                  onChange={(e) => setFileFullPDF(e.target.value)}
                />
                </div>
              </div>
              <div className="box-sy-book">
                <p>ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวทดลองให้อ่าน<p> ( ไม่สามารถอ่านลิ้งจาก Google Drive )</p></p>
                <div className="box-input">
                <input
                  type="text"
                  id="uploadfilebooktry"
                  placeholder="ลิ้งไฟล์ PDF ของ E - Book ฉบับตัวทดลองให้อ่าน"
                  onChange={(e) => setFileTryPDF(e.target.value)}
                />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="box-container-book filter-drop-container ">
            <div className="btn-book-save">
              <button onClick={handleSummit}>บันทึก</button>
            </div>
          </div>
        </div>
       )}
      </>
    );
  }
};

export default UpdataBook;
