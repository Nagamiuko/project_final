import React ,{useState} from 'react'
import nocover from '../../../assets/book-test/nocover.png'
import './Lis.css'
import useFetchDataToon from '../../hooks/BooksAll'
import useFetchDataToonAll from '../../hooks/BooksAlls'
import useFetchDataNovelAlls from '../../hooks/NovelAlls'
import PreviewToon from '../../../pages/PreviewToon'
const Lis = ({DataT , Load, Search , SearchCT , SearchRT , SearchBN}) => {
   const {datanovelAll} = useFetchDataNovelAlls() //api นิยายทั้งหมด
   const {datatoon} = useFetchDataToon() //api การ์ตูนทั้งหมด
   const {datatoonall} = useFetchDataToonAll()
   const [popuptoon , setPopupToon] = useState(false)
   const [datatoonid , setDataToon] = useState()
   if(SearchBN === 'นิยายแปล' || SearchBN === 'นิยายแต่ง'){
      return (
         <>
          {popuptoon && <PreviewToon setPopupToon={setPopupToon} DataID={datatoonid} />}
           <div className="box-col-bg">
           {datanovelAll.filter(da => da.title.toLowerCase().includes(Search)||   da.category_main.toLowerCase().includes(SearchCT)|| da.rating.toLowerCase().includes(SearchRT)||da.category.toLowerCase().includes(SearchCT)
             ).map((dat, keys)=>(
               <div onClick={setPopupToon.bind(this,true)}>
               <div className="row-detail" key={keys} onClick={()=>
                  setDataToon(dat?._id)}>
                 <div className="img-bok">
                    <img src={dat?.cover_image?.cover_image_url||nocover} alt="" />
                 </div>
                   <div className="detail-toon">
                      <div className="title-n-b" style={{fontSize:'14px'}}>
                       {dat?.title}
                     </div>
                      <div className="title-n-b" style={{fontSize:'12px'}}>
                       {dat?.category+' / '+dat?.category_main}
                     </div>
                      <div className="title-n-b"  style={{fontSize:'12px'}}>
                        {'แปลโดย '+dat?.mangauser?.fullname}
                       </div>
                      <div className="title-n-b"  style={{fontSize:'12px'}}>
                        {':'}
                       </div>
                      <div className="title-n-b"  style={{fontSize:'12px'}}>
                        {dat?.rating}
                       </div>
                       <div className='title-n-b'>
                           <span className='flex-n' onClick={(e)=> e.stopPropagation()}>
                                 <button >{dat?.price_of_free === 0 ? "ฟรี" :
                                 '฿'+dat?.price_of_free}</button>
                           </span>
                       </div>
                   </div>
               </div>
              </div>
              ))}
           </div>
         </>
      )
   }

  else if(SearchBN === 'การ์ตูน' || SearchBN === 'การ์ตูนแปล'){
  return (
    <>
     {popuptoon && <PreviewToon setPopupToon={setPopupToon} DataID={datatoonid} />}
      <div className="box-col-bg">
      {datatoon.filter(da => 
        da.title.toLowerCase().includes(Search)||da.category_main.toLowerCase().includes(SearchCT)||da.rating.toLowerCase().includes(SearchRT)||da.category.toLowerCase().includes(SearchCT) 
        ).map((dat, keys)=>(
         <div onClick={setPopupToon.bind(this,true)}>
         <div className="row-detail" key={keys} onClick={()=>
            setDataToon(dat?._id)}>
            <div className="img-bok">
               <img src={dat?.cover_image?.cover_image_url||nocover} alt="" />
            </div>
              <div className="detail-toon">
                 <div className="title-n-b" style={{fontSize:'14px'}}>
                  {dat?.title}
                </div>
                 <div className="title-n-b" style={{fontSize:'12px'}}>
                  {dat?.category+' / '+dat?.category_main}
                </div>
                 <div className="title-n-b"  style={{fontSize:'12px'}}>
                   {'แปลโดย '+dat?.mangauser?.fullname}
                  </div>
                 <div className="title-n-b"  style={{fontSize:'12px'}}>
                   {':'}
                  </div>
                 <div className="title-n-b"  style={{fontSize:'12px'}}>
                   {dat?.rating}
                  </div>
                  <div className='title-n-b'>
                     <span className='flex-n' onClick={(e)=> e.stopPropagation()}>
                           <button >{dat?.price_of_free === 0 ? "ฟรี" :
                           '฿'+dat?.price_of_free}</button>
                     </span>
                  </div>
              </div>
          </div>
          </div>
         ))}
      </div>
    </>
  )
}
else if(SearchBN === 'ทั้งหมด'){
   return(
      <>
       {popuptoon && <PreviewToon setPopupToon={setPopupToon} DataID={datatoonid} />}
      <div className="box-col-bg">
      {datatoonall.filter(da => 
        da.title.toLowerCase().includes(Search) || da.category_main.toLowerCase().includes(SearchCT)|| da.rating.toLowerCase().includes(SearchRT) 
        ).map((dat, keys)=>(         
         <div onClick={setPopupToon.bind(this,true)}>
         <div className="row-detail" key={keys} onClick={()=>
            setDataToon(dat?._id)}>
            <div className="img-bok">
               <img src={dat?.cover_image?.cover_image_url||nocover} alt="" />
            </div>
              <div className="detail-toon">
                 <div className="title-n-b" style={{fontSize:'14px'}}>
                  {dat?.title}
                </div>
                 <div className="title-n-b" style={{fontSize:'12px'}}>
                  {dat?.category+' / '+dat?.category_main}
                </div>
                 <div className="title-n-b"  style={{fontSize:'12px'}}>
                   {'แปลโดย '+dat?.mangauser?.fullname}
                  </div>
                 <div className="title-n-b"  style={{fontSize:'12px'}}>
                   {':'}
                  </div>
                 <div className="title-n-b"  style={{fontSize:'12px'}}>
                   {dat?.rating}
                  </div>
                  <div className='title-n-b'>
                     <span className='flex-n' onClick={(e)=> e.stopPropagation()}>
                           <button >{dat?.price_of_free === 0 ? "ฟรี" :
                           '฿'+dat?.price_of_free}</button>
                     </span>
                  </div>
              </div>
          </div>
          </div>
         ))}
      </div>
    </>
   )
}
  console.log(DataT);
  console.log(Search);
  console.log(SearchCT);
  console.log(SearchRT);
  console.log(SearchBN);

}

export default Lis
