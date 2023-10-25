import React, { useState } from 'react'
import './Sreach.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronDown , faChevronUp} from '@fortawesome/free-solid-svg-icons'
import Lis from './ListTNST/Lis'
const SreachTN = ({DataToon , Loading}) => {
   const [dropbox , setDropBox] = useState(false) 
   const [query , setQuery] = useState()
   const [checked , setChecked]= useState("ทั้งหมด")
   const [checked1 , setChecked1]= useState('ทั่วไป')
   const [checked2 , setChecked2]= useState('ทั้งหมด')
   
   const isChecked = (value) => value === checked;
   const onSelect = ({target: {value} }) => {
      setChecked(value)
   }
   const isChecked2 = (value) => value === checked1;
   const onSelect2 = ({target: {value} }) => {
      setChecked1(value)
   }
   const isChecked3 = (value) => value === checked2;
   const onSelect3 = ({target: {value} }) => {
      setChecked2(value)
   }
  return (
    <>
      <div className="box-cbg-sth">
          <div className="con-sth">
            <div className="col-r-t-sth">
               <div className="in-search">
                  {/* <img src={imgbg} alt="" /> */}
                   <div className="drop-sth">
                    <div className="cheack-box" onClick={()=> setDropBox(!dropbox)}>
                       {checked || "ทั้งหมด"}<FontAwesomeIcon icon={dropbox === true ? faChevronUp: faChevronDown} style={{marginLeft:'1.5rem'}}/>
                    </div>
                    {dropbox && 
                      <div className="dop-lis">
                           <label className='keyword-container' htmlFor="all"> ทั้งหมด
                            <input 
                               type="radio" 
                               name='typeBN'
                               value='ทั้งหมด'
                               id='all'
                               checked ={isChecked('ทั้งหมด')}
                               onChange={onSelect}
                            />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="novel"> นิยาย
                              <input 
                                  type="radio" 
                                  name='typeBN'
                                  value='นิยายแปล'
                                  checked ={isChecked('นิยายแปล')}
                                  id='novel'
                                  onChange={onSelect}
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="novelcom"> นิยายแต่ง
                              <input 
                                  type="radio" 
                                  name='typeBN'
                                  value='นิยายแต่ง'
                                  checked ={isChecked('นิยายแต่ง')}
                                  id='novelcom'
                                  onChange={onSelect}
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="cartoon"> การ์ตูน
                              <input 
                                  type="radio" 
                                  name='typeBN'
                                  value='การ์ตูน'
                                  checked ={isChecked('การ์ตูน')}
                                  id='cartoon'
                                  onChange={onSelect}
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="cartoonts">การ์ตูนแปล
                             <input 
                                  type="radio" 
                                  name='typeBN'
                                  value='การ์ตูนแปล'
                                  checked ={isChecked('การ์ตูนแปล')}
                                  id='cartoonts'
                                  onChange={onSelect}
                                />
                            <span className='checkmark'></span>
                           </label>
                      </div>
                    }  
                   </div>
                   <div className="sth">
                      <input  
                        type="search" 
                        placeholder='ค้นหา' 
                        onChange={(e)=>
                         setQuery(...e.target.value)
                        }
                      />
                   </div>
               </div>
            </div>
            <div className="col-r-t-sth">
               <div className="containar-box-rl row">
                   <div className="box-ml-toonlist">
                       <div className="row-colis">
                          <Lis 
                            DataT={DataToon} 
                            Load={Loading} 
                            Search={query} 
                            SearchCT={checked2}
                            SearchRT={checked1}
                            SearchBN={checked}
                          />
                       </div>
                   </div>
                   <div className="box-mr-list">
                        <div className="lis-menu-r">
                        <div className="redgin">
                          เรตติ้ง
                        <label className='keyword-container' htmlFor="allRT"> ทั่วไป
                            <input 
                               type="radio" 
                               name='typeRT'
                               value='ทั่วไป'
                               checked ={isChecked2('ทั่วไป')}
                               onChange={onSelect2}
                               id='allRT'
                            />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="novelRT"> 18+
                              <input 
                                  type="radio" 
                                  name='typeRT'
                                  value='18+'
                                  checked ={isChecked2('18+')}
                                  onChange={onSelect2}
                                  id='novelRT'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="RT25"> 25+
                              <input 
                                  type="radio" 
                                  name='typeRT'
                                  value='25+'
                                  checked ={isChecked2('25+')}
                                  onChange={onSelect2}
                                  id='RT25'
                                />
                            <span className='checkmark'></span>
                           </label>
                        </div>
                        <div className="cort">
                           กรองหมวดหมู่
                           <label className='keyword-container' htmlFor="allCT"> ทั้งหมด
                            <input 
                               type="radio" 
                               name='typeCT'
                               value='ทั้งหมด'
                               checked ={isChecked3('ทั้งหมด')}
                               onChange={onSelect3}
                               id='allCT'
                            />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT1"> กำลังภายใน
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='กำลังภายใน'
                                  checked ={isChecked3('กำลังภายใน')}
                                  onChange={onSelect3}
                                  id='CT1'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT2"> โรแมนติก
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='โรแมนติก'
                                  checked ={isChecked3('โรแมนติก')}
                                  onChange={onSelect3} 
                                  id='CT2'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT3"> แฟนตาซี
                            <input 
                               type="radio" 
                               name='typeCT'
                               value='แฟนตาซี'
                               checked ={isChecked3('แฟนตาซี')}
                               onChange={onSelect3}
                              id='CT3'
                            />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT4"> รักวัยรุ่น
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='รักวัยรุ่น'
                                  checked ={isChecked3('รักวัยรุ่น')}
                                  onChange={onSelect3}
                                  id='CT4'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT5"> สืบสวน
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='สืบสวน'
                                  checked ={isChecked3('สืบสวน')}
                                  onChange={onSelect3}
                                  id='CT5'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT6"> Girl love
                            <input 
                               type="radio" 
                               name='typeCT'
                               value='Girl love'
                               checked ={isChecked3('Girl love')}
                               onChange={onSelect3}
                              id='CT6'
                            />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT7"> Boy love
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='Boy love'
                                  checked ={isChecked3('Boy love')}
                                  onChange={onSelect3}
                                  id='CT7'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT8"> ไลท์โนเวล
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='ไลท์โนเวล'
                                  checked ={isChecked3('ไลท์โนเวล')}
                                  onChange={onSelect3}
                                  id='CT8'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT9"> เว็บโนเวล
                            <input 
                               type="radio" 
                               name='typeCT'
                               value='เว็บโนเวล'
                               checked ={isChecked3('เว็บโนเวล')}
                               onChange={onSelect3}
                              id='CT9'
                            />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT10"> กีฬา
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='กีฬา'
                                  checked ={isChecked3('กีฬา')}
                                  onChange={onSelect3}
                                  id='CT10'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT11"> ผจญภัย
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='ผจญภัย'
                                  checked ={isChecked3('ผจญภัย')}
                                  onChange={onSelect3}
                                  id='CT11'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT11"> สยองขวัญ
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='สยองขวัญ'
                                  checked ={isChecked3('สยองขวัญ')}
                                  onChange={onSelect3}
                                  id='CT11'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT11"> ย้อนยุค
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='ย้อนยุค'
                                  checked ={isChecked3('ย้อนยุค')}
                                  onChange={onSelect3}
                                  id='CT11'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT11"> ระบบ
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='ระบบ'
                                  checked ={isChecked3('ระบบ')}
                                  onChange={onSelect3}
                                  id='CT11'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT11"> เกมส์ออนไลน์
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='เกมส์ออนไลน์'
                                  checked ={isChecked3('เกมส์ออนไลน์')}
                                  onChange={onSelect3}
                                  id='CT11'
                                />
                            <span className='checkmark'></span>
                           </label>
                           <label className='keyword-container' htmlFor="CT11"> แอคชั่น
                              <input 
                                  type="radio" 
                                  name='typeCT'
                                  value='แอคชั่น'
                                  checked ={isChecked3('แอคชั่น')}
                                  onChange={onSelect3}
                                  id='CT11'
                                />
                            <span className='checkmark'></span>
                           </label>
                        </div>
                        </div>
                   </div>
               </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default SreachTN