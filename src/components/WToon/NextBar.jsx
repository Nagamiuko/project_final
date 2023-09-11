import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft,faList ,faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import './WToon.css'

const NextBar = ({postsPage, totalPosts, paginat}) => {
     console.log(postsPage);
     const pageNumbers = []
    for(let i=1; i <= Math.ceil(totalPosts / postsPage) ; i++){
        pageNumbers.push(i);
    }
    console.log(pageNumbers);
  return (
    <nav>  
         <div className="center">
            <div className="pagination">
            {pageNumbers.map(num =>(
                <a key={num} className="nextBttn" onClick={()=>paginat(num)}>{num}<FontAwesomeIcon icon={faArrowRight} /></a>
            ))}
           </div>
         </div>
     </nav>   
  )
}
export default NextBar