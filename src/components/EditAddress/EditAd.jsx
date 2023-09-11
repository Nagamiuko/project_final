import React, { useState } from 'react'
import MenuEdit from '../MenuEdits/MenuEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './EditAd.css'
import AddAd from './AdAddress/AddAd'
import axios from 'axios'
import config from '../../config.json'
import Swal from 'sweetalert2'
import useFetchUpdataAddres from '../hooks/UserOneAddres'
import Load from '../alertshow/Load'
const EditAd = ({DataAddress , Loading ,setDataFile  }) => {
   const [openAdd,setOpenAdd] = useState(false)
   const [dataaddId,setDataAddId] = useState()
   const [updataAddres,setUpdataAddres] = useState('')
   const [load , setLoad] = useState(false)
   const {datanew} = useFetchUpdataAddres(dataaddId)

   const DeleteAddres = (data) => {
      try{
            Swal.fire({
            title: 'ต้องการลบใช่หรือไม่ ?',
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
               setDataFile(DataAddress.filter((f)=> f._id !== data._id))
               await axios.delete(`${config.apiuserDeleteaddress}/${data?._id}`)
               console.log("ลบ");
               }
            })
      }catch(err){
         Swal.fire({
            icon: 'error',
            title: 'ลบข้อมูลไม่สำเร็จ',
          })
      }
   }
  return (
     <>
     <div>  {openAdd &&
        <AddAd 
          setOpenAdd={setOpenAdd} 
          setLoad={setLoad} 
          UpdataAddres={updataAddres}  
          DataAddres={datanew} 
          Addreid={dataaddId}
         />}
    </div>
      {load ? <Load/>: 
      <div className="box-e-bg">
         <div className="title-e-pf">
            My Account
         </div>
         <div className="flex-d-ma-dpf fil-d-s">
         <div className="box-e-m-pf-ad">
               <MenuEdit/>
         </div>
         <div className="box-e-d-pf-ad">
               <div className="m-li-d-pf-ad"> 
                  <div className="title-ad">
                    Shipping Addresses
                      <div className="smal-test-t">
                           เพื่อความรวดเร็วในการซื้อสินค้า ท่านสามารถจัดการที่อยู่สำหรับจัดส่งสินค้าได้ล่วงหน้าที่นี่
                      </div>
                      <div className="ad-ad">
                           <button onClick={()=>{
                              setUpdataAddres('add')
                              setOpenAdd(true)
                           }}><FontAwesomeIcon icon={faPlus} /> เพิ่มที่อยู่</button>
                      </div>
                      {Loading ? <div className="load">Loading...</div> :
                      <div className="addresse-oly">
                      {DataAddress?.map((data ,keys) => (
                           <div className="border-box" key={keys}>
                                <div className="d-da">
                                   <p>{data?.nameaddress+` ( ${data?.tel} ) `+ data?.typeAddress}</p>
                                      {data?.address + ' ' + data?.distrct + ' ' + data?.dists + ' ' + data?.province + ' ' + data?.postalcode}
                                </div>
                                <div className="btn-e-d">
                                   <button 
                                    onClick={()=>{
                                       setDataAddId(data._id)
                                       setUpdataAddres('updata')
                                       setOpenAdd(true)
                                    }                                       
                                   }>แก้ไข</button>
                                   <button  
                                     className='del-btl'
                                     onClick={()=> DeleteAddres(data)}
                                     >ลบ</button>
                                </div>
                           </div>
                           ))}
                           </div>
                     }
                  </div>
               </div>
         </div>
      </div>
   </div>
   }
</>
  )
}

export default EditAd