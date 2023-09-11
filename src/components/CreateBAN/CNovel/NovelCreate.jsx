import React, { useContext, useEffect, useState } from 'react'
import './NovelCreate.css'
import TestCover1 from '../../../assets/book-test/nocover.png'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import parse from 'html-react-parser';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Swl from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import config from '../../../config.json'
import Load from '../../alertshow/Load';
const NovelCreate = () => {
   const {user} = useContext(AuthContext)
   const [load , setLoad] = useState(false)
   const [synopsis , setSyBook] = useState('')
   const [taglines , setTagline] = useState('')
   const [bookname , setBookName] = useState("")
   const [tbook , setTBook] = useState("")
   const [abook , setABook] = useState("")
   const [ctype , setCtype] = useState('')
   const [ratings , setRating] = useState('')
   const [category, setCategory] = useState('')
   const [categorymain , setCategoryMain] = useState('')
   const [typenovel , setCtypnovel] = useState('')
   const [cpicefofree , setCpice] = useState(0)
   const [filefullpdf, setFileFullPDF] = useState("");
   const [filetrypdf, setFileTryPDF] = useState("");
   const [fileCover , setFileCover] = useState()
   const [image, setFileImage] = useState("")
   const [novel, setNovel] = useState("หนังสือนิยาย")
   const navigator = useNavigate()

   const previewFile =(file)=> {
      const reader  = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () =>{
         setFileImage(reader.result)
      }
   }
    const handleChange = (e) =>{
       const file = e.target.files[0]
       setFileCover(file)
       previewFile(file) 
    }
    const setText = (content) =>{
       return setTagline(content)
    }

    let FreBok = ''
    let Price = null

    const FreeBok = (ctypebook) =>{
         if(ctypebook === 'รายตอน'){
            FreBok = 'ฟรี'
            Price = 0
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
   FreeBokType(cpicefofree)
   FreeBok(typenovel)
   
    const handleSummit = async (e) =>{
      const formData = new FormData();
      formData.append("titlebook",bookname)
      formData.append("tname",tbook)
      formData.append("shopid", user._id);
      formData.append("aname",abook)
      formData.append("rating",ratings)
      formData.append("categoryone",categorymain)
      formData.append("categorywto",category)
      formData.append("tagline",taglines)
      formData.append("synopsis",synopsis)
      formData.append("tybook",typenovel)
      formData.append("typebook",ctype)
      formData.append("typeprice",Price)
      formData.append("typebookAndnovel",novel)
      formData.append("imagecover",fileCover)
      formData.append("freeBook",FreBok)
      formData.append("book_pdf_full", filefullpdf);
      formData.append("book_pdf_try", filetrypdf);
      const configsheaders = {
         headers:{
          'content-type':'multipart/form-data',
         },
      }

  try{
      setLoad(true)
      await axios.post(`${config.apiaddcartoon}/${user._id}`,formData ,configsheaders )
      setLoad(false)
         Swl.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
         })
      navigator('/MyBooks')
      setLoad(false)
   }catch(err){
      Swl.fire({
         icon: 'error',
         title: 'บันทึกข้อมูลไม่สำเร็จ',
       })
      console.log(err);
      setLoad(false)
 }
}
  return (
    <>   { load ? <Load/> : (
         <div className="box-bg-book-cte">
           <div className="box-container-book filter-drop-container"> 
              <div className="title-h-book">
                 สร้างหนังสือนิยาย
              </div>
           </div>
            <div className="box-container-book filter-drop-container">
               <div className="b-book-cor">
                   <div className="im-book-cover">
                    <label htmlFor="imgeCover" >
                       <img src={image? image : '' || TestCover1} alt="" /> 
                    </label>
                     <input  
                           id='imgeCover' 
                           type="file" 
                           style={{display:'none'}} 
                           onChange={handleChange} 
                     />
                   </div>
                 <div className="row-in">
                   <div className="in-dt-book">
                      <table>ชื่อเรื่อง</table>
                        <input 
                           type="text" 
                           placeholder='ระบุชื่อเรื่อง'
                           onChange={(e)=>
                           setBookName(e.target.value)
                           }
                        />
                   </div>
                     <div className="in-dt-namet">
                         <div className="t-name-book">
                           <table>ชื่อผู้แต่ง</table>
                           <input 
                              type="text" 
                              placeholder='ระบุชื่อผู้แต่ง' 
                              onChange={(e)=>
                               setTBook(e.target.value)
                              }
                           />
                         </div>
                         <select 
                                className="form-control"
                                id='value' 
                                onChange={(e)=>
                                 setRating(e.target.value) 
                              }
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
                             placeholder='ระบุชื่อผู้แปล'
                             onChange={(e)=>
                             setABook(e.target.value)
                           }
                           />
                        </div>
                        <select
                              className="form-t" 
                              id='value' 
                              onChange={(e)=>
                               setCategoryMain(e.target.value)
                              } 
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
                             id='value'
                             onChange={(e)=>
                              setCategory(e.target.value)
                             }
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
                   <textarea name="" id="" cols="30" rows="10" 
                    placeholder='ระบุคำบรรยายเรื่อง'
                    onChange={(e)=> setSyBook(e.target.value)}>
                   </textarea>
                </div>
            </div>                                           
            <div className="box-container-book filter-drop-container">
                <div className="box--book">
                     <SunEditor 
                     onChange={setText}
                     placeholder='ระบุเนื้อเรื่องย่อ'
                     />
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
                               id='custom-in-c1' 
                               className='bg-bor-c' 
                               value='เล่มเดี่ยว' 
                               name='ctypnovel' 
                               onChange={(e) => 
                               setCtypnovel(e.target.value)}
                            />
                             <label className='custom-control-label' htmlFor='custom-in-c2'>เล่มเดี่ยว(E - Book)</label>
                           <input 
                              type="radio" 
                              id='custom-in-c2' 
                              className='bg-bor-c' 
                              value='รายตอน' 
                              name='ctypnovel' 
                              onChange={(e)=>setCtypnovel(e.target.value)}
                           />       
                           <label className='custom-control-label' htmlFor='custom-in-c2'>รายตอน</label>
                         </div>
                       </div>
                    </div>
                    <div className="c-b-t">
                        <table>ประเภทนิยาย</table>
                      <div className="co">
                       <div className="flex-row"> 
                           <input type='radio' className='bg-bor-c' name='ctype' value='นิยายแปล'onChange={(e)=> setCtype(e.target.value)}/>
                           <label className='custom-control-label'>นิยายแปล</label>
                           <input type='radio' className='bg-bor-c' value='นิยายแต่ง' name='ctype' onChange={(e)=> setCtype(e.target.value)} />
                           <label className='custom-control-label'>นิยายแต่ง</label>
                        </div>
                      </div>
                    </div>
                    {typenovel === 'เล่มเดี่ยว' ? (
                    <div className="c-b-t">
                        <table>ประเภทราคา</table>
                      <div className="co">
                       <div className="flex-row"> 
                           <input type='radio' 
                              className='bg-bor-c' 
                              name='ctypefofree' 
                              value={ctype} 
                              onChange={(e)=> setCpice(e.target.value)}
                           />
                           <label className='custom-control-label'>ตั้งราคา</label>
                           <input 
                               type='radio' 
                               className='bg-bor-c' 
                               value='ฟรี' 
                               name='ctypefofree' 
                               onChange={(e)=> setCpice(e.target.value)} 
                           />
                           <label className='custom-control-label'>ฟรี</label>
                           { cpicefofree === 'ฟรี' ?  
                             <input 
                                 type='number' 
                                 className='in-pice' 
                                 value={cpicefofree} 
                                 name='num' 
                                 onChange={(e)=> setCpice(e.target.value)}
                                 disabled 
                              />
                             :
                             <input 
                                 type='number' 
                                 className='in-pice' 
                                 value={cpicefofree} 
                                 name='num' 
                                 onChange={(e)=> setCpice(e.target.value)} 
                                 placeholder='ราคา'
                                 
                             />
                           }
                           
                           <label className='custom-control-label ml-5'>{cpicefofree === 'ฟรี'?cpicefofree+'':'฿'+cpicefofree}</label>
                        </div>
                      </div>
                    </div>
                    ):''
                  }
               </div>
            </div>   
           {typenovel === 'เล่มเดี่ยว' ? (
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
           ):''
            }                                     
            <div className="box-container-book filter-drop-container ">
               <div className="btn-book-save">
                   <button onClick={handleSummit}>save</button>
               </div>
            </div>                                      
         </div>
      )}
    </>
  )
}

export default NovelCreate