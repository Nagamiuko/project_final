import React from 'react'
import Nocover from '../../assets/NoDataImage/book02.webp'
import './LogoList.css'
const LogoList = () => {
  return (
    <div>
       <div className="box-bg-lo">
           <img src={"https://webtoons-static.pstatic.net/image/pc/home_bg003.jpg" || Nocover } alt="" />
       </div>
    </div>
  )
}

export default LogoList
