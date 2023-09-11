import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faShieldHalved,
  faHeart,
  faBookTanakh,
  faBell,
  faCartShopping,
  faClipboardList,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { GiBookshelf } from "react-icons/gi";
import {AuthContext} from '../../Context/AuthContext'
import "./menuLr.css";
const MenuLeft = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <div className="box-content">
        <div className="box-img-pro-lr">
          <img src={user?.avatar?.avatar_url} alt="" />
        </div>
        <div className="title-pro-lr">
          <p>{user?.namedisplay || user?.fullname}</p>
        </div>
      </div>
      <div className="box-content">
        <div className="list-menu-lr">
          <div className="title-menu">
            <p>บัญชี</p>
            <li>
              <NavLink to="/my-account/user">
                <FontAwesomeIcon icon={faAddressCard} /> ข้อมูลของฉัน
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-account/security">
                <FontAwesomeIcon icon={faShieldHalved} /> บัญชีและความปลอดภัย
              </NavLink>
            </li>
          </div>
          <div className="title-menu">
            <p>หนังสือ</p>
            <li>
              <NavLink to="/MyBooks">
                <GiBookshelf /> หนังสือของฉัน
              </NavLink>
            </li>
            <li>
              <NavLink to="/MyFavorite">
                <FontAwesomeIcon icon={faHeart} /> หนังสือที่ชอบ
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookshelf">
                <FontAwesomeIcon icon={faBookTanakh} /> ชั้นหนังสือของฉัน
              </NavLink>
            </li>
          </div>
          <div className="title-menu">
            <p>ร้านค้า</p>
            <li>
              <NavLink to="/Carts">
                <FontAwesomeIcon icon={faCartShopping} /> ตะกร้าของฉัน
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders/shipped">
                <FontAwesomeIcon icon={faClipboardList} />  รายการสั่งชื้อของฉัน
              </NavLink>
            </li>
            <li>
              <NavLink to="/my/shopincome">
                <FontAwesomeIcon icon={faSackDollar} />  รายได้ของฉัน
              </NavLink>
            </li>
            </div>
        </div>
      </div>
    </>
  );
};

export default MenuLeft;
