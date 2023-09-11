import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookMedical ,faBookBookmark } from '@fortawesome/free-solid-svg-icons'
import './Pop.css'
const Pop = ({setPopAdd}) => {
  return (
    <div>
        <div className="box-bg-pop-r filter-drop">
            <div className="cor-r-btn">
            <small onClick={setPopAdd.bind(this,false)}>x</small>
            <div className="title-pop-r">เลือกประเภท</div>
            <div className="line-bar"></div>
                  <Link to='/AddNovel'><button><FontAwesomeIcon icon={faBookBookmark} /> นิยาย & E-BooK</button></Link>
                  <Link to='/AddCartoon'><button> <FontAwesomeIcon icon={faBookMedical} /> การ์ตูน & E-Book</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Pop
