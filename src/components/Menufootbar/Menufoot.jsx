import React, { useContext, useRef, useState } from "react";
import IconLogo from "../../assets/icon/open-book.png";
import Login from "../Login/Login";
import "./Menufoot.css";
import { Link, useNavigate } from "react-router-dom";
import { GrProductHunt} from 'react-icons/gr';
import { MdOutlineFavorite} from 'react-icons/md';
import {GiBookshelf} from 'react-icons/gi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faMoneyBill,
  faCompass,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import NoAvatar from "../../assets/icon/user.png";
import Jenna from "../../assets/icon/jenna.jpg";
import { AuthContext } from "../Context/AuthContext";
const Menufoot = () => {
  const navigator = useNavigate();
  const { user } = useContext(AuthContext);
  const [loginpopup, setLoginpopup] = useState(false);
  const [openMenuProfile, setOpenProFile] = useState(false);
  const [openMenuMyAccount, setOpenMenuMyAccount] = useState(false);
  let datanum = 2;
  const menuprofile = {
    data1: "รายได้ของฉัน",
    data2: "จัดการบัญชี",
  };
  const menuAccout = {
    d1: "การสั่งชื้อหนังสือของฉัน",
    d2: "หนังสือที่ชื่นชอบ",
    d3: "ชั้นหนังสือของฉัน",
  };
  const menuProfileRef = useRef();
  const menuAcountRef = useRef();
  window.addEventListener("click", (e) => {
    if (
      e.target !== menuProfileRef.current &&
      e.target !== menuAcountRef.current
    ) {
      setOpenMenuMyAccount(false);
    }
  });

  const handLogout = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };
  return (
    <div>
      <div>{loginpopup && <Login setLoginpopup={setLoginpopup} />}</div>
      {openMenuProfile && (
        <div className="menu-pop-profile ac-up-donw">
          <div className="box-c-t">
            <div className="cor-flex">
              <Link>
                <div className="m-p">
                  <div className="m-m">
                    <img src={user?.avatar?.avatar_url || NoAvatar} alt="" />
                  </div>
                  <div className="n-a">{user?.namedisplay || user?.fullname}</div>
                </div>
              </Link>
              <div className="a-o">
                <button onClick={() => handLogout()}>ออกจากระบบ</button>
              </div>
            </div>
            <div className="b-b">
              <div className="m-i">
                <Link
                  ref={menuProfileRef}
                  onClick={() => setOpenMenuMyAccount(!openMenuMyAccount)}
                >
                  <FontAwesomeIcon icon={faCompass} /> ข้อมูลของฉัน &nbsp;
                  <FontAwesomeIcon
                    icon={
                      openMenuMyAccount === true ? faChevronUp : faChevronDown
                    }
                  />
                </Link>
              </div>
              <div className="line-b-b"></div>
              {openMenuMyAccount && (
                <div ref={menuAcountRef} className="m-i-top anime-drop-menu">
                  <div className="m-i">
                    <div className="but">
                      <Link to="/orders/shipped"><GrProductHunt style={{color:' #8400ff',fontSize:'12px'}}/> {menuAccout.d1}</Link>
                    </div>
                    <div className="but">
                      <Link to="/MyFavorite"><MdOutlineFavorite style={{color:' #8400ff'}}/> {menuAccout.d2}</Link>
                    </div>
                    <div className="but">
                      <Link to="/bookshelf"><GiBookshelf style={{color:' #8400ff'}}/> {menuAccout.d3}</Link>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className="m-i">
                  <div className="p-pt">
                    <Link to='/my/shopincome'>
                    <FontAwesomeIcon icon={faMoneyBill}/> {menuprofile.data1}
                    </Link>
                  </div>
                </div>
                <div className="line-b-b"></div>
                <div className="m-i">
                  <Link to={`/my-account/user`}>
                    <FontAwesomeIcon icon={faPenToSquare} /> {menuprofile.data2}
                  </Link>
                </div>
                <div className="line-b-b"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="menu-foot-bar">
        <div className="menu-li">
          <Link to="/">
            <div className="logo-book">
              <img src={IconLogo} alt="" />
            </div>
          </Link>
          <ul>
            <li>
              <Link to="/Novels">นิยาย</Link>
            </li>
            <li>
              <Link to="/CarToon">การ์ตูน</Link>
            </li>
            <li>
              <Link>นิยายแต่ง</Link>
            </li>
            <li>
              <Link>การ์ตูนแฟนคลับแปล</Link>
            </li>
          </ul>
          {user == null ? (
            <div className="login-re" onClick={(e) => e.stopPropagation()}>
              <button onClick={setLoginpopup.bind(this, true)}>
                ล็อกอินเข้าสู่ระบบ / สมัครสมาชิก
              </button>
            </div>
          ) : (
            <div className="login-re">
              <button onClick={() => setOpenProFile(!openMenuProfile)}>
                <div className="pro-f">
                  <div className="m-mei">
                    <img
                      src={user?.avatar?.avatar_url || NoAvatar}
                      alt=""
                      width={30}
                    />
                  </div>
                  <div className="font-pro">{user?.namedisplay||user?.fullname}</div>
                  <div className="arrow">
                    <FontAwesomeIcon
                      icon={
                        openMenuProfile === false ? faChevronUp : faChevronDown
                      }
                    />
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menufoot;
