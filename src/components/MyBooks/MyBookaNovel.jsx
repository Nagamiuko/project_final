import React, { useContext, useState } from 'react'
import './Book.css'
import excover from '../../assets/book-test/nocover.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass ,faScaleBalanced} from '@fortawesome/free-solid-svg-icons' 
import ReactPaginate from 'react-paginate'
import MenuLeft from '../mycollection/menuLeft/MenuLeft'
import { AuthContext } from '../Context/AuthContext'
const MyBooksaNovel = ({Datatoonalluser , Loading}) => {
  const navigator = useNavigate() 
  const {user} = useContext(AuthContext)
  const [Query , setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const toonPerPage = 4
  const pageVisited = pageNumber * toonPerPage

  const submitHandle = (i,oi) => {
    navigator(`/bookstand?Book=${i._id}&&ShopId=${user._id}`);
  };

  const displayToon = Datatoonalluser.filter(da => 
        da.title.toLowerCase().includes(Query) ||
        da.typebook_singer_a_muti.toLowerCase().includes(Query)
    ).slice(pageVisited, pageVisited + toonPerPage).map((datoon,keys)=>{
      return(
        <div className="box-item filter-drop" key={keys}>
        <Link to={`/PreviewBook/${datoon._id}`}>
          <div className="flex-le">
            <div className="im-cover-book">
                <img src={ datoon?.cover_image?.cover_image_url ||excover} alt="" />
            </div>
            <div className="title-name-book">
               {datoon?.title}
            </div>
          </div>
         </Link>
          <div className="flex-rh">
              <div className="d-dt-book-t">
                <div className="btn-m">
                   ราคาขาย: {datoon?.price_of_free + " THB"} 
                </div>
                <div className="btn-m">
                  <button onClick={() => submitHandle(datoon)} ><FontAwesomeIcon icon={faScaleBalanced} /></button>
                </div>
              </div>
          </div>
        </div>
      )
    })
    const pageCount = Math. ceil(Datatoonalluser.length / toonPerPage)
    const changePage = ({selected}) =>{
           setPageNumber(selected)
    }
  return (
    <>
       <div className="box-bg-list-mybook">
            <div className="box-left-menu">
              <MenuLeft/>
            </div>
           <div className="box-container-list-mybook">
               <div className="title-my">หนังสือของฉัน</div>
                <div className="box-contai-book">
                  <div className="box-search-mybook">
                     <div className="icon-search">
                       <FontAwesomeIcon icon={faMagnifyingGlass} />
                     </div>
                     <input 
                       type="search" 
                       placeholder='search mybook' 
                       onChange={
                        (e)=> setQuery(e.target.value)} 
                      />
                  </div>
                   <div className="btn-list-c-book">
                     <button onClick={()=>setQuery('')} >ทั้งหมด</button>
                     <button onClick={()=>setQuery('นิยายแปล')} >นิยาย</button>
                     <button onClick={()=>setQuery('นิยายแต่ง')} >นิยายแต่ง</button>
                     <button onClick={()=>setQuery('การ์ตูน')} >การ์ตูน</button>
                     <button onClick={()=>setQuery('การ์ตูนแปล')} >การ์ตูนแปล</button>
                   </div>
                   <div className="border-bar-bottom"></div>
                   <div className="list-book-box">
                       {displayToon}
                   </div>
                </div>
                <div className="box-contai-book">
                    <ReactPaginate 
                       previousLabel={'Prev'}
                       nextLabel={'Next'}
                       pageCount={pageCount}
                       onPageChange={changePage}
                       containerClassName={'paginationBttns'}
                       previousLinkClassName={'previousBttn'}
                       nextLinkClassName={'nextBttn'}
                       disabledClassName={'paginationDisbled'}
                       activeClassName={'paginationAcitve'}
                    />
                </div>
           </div>
       </div>
    </>
  )
}

export default MyBooksaNovel
