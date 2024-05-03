import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import config_api from "../../config.json";
import "./Login.css";
import Swal from "sweetalert2";
import Load from "../alertshow/Load";
import liff from "@line/liff";
import { urladmin } from "../../serverimage";

const Login = ({ setLoginpopup }) => {
  const { loading, dispatch } = useContext(AuthContext);
  const [InText, setInText] = useState({
    username: undefined,
    password: undefined,
  });
  const handleChange = (e) => {
    setInText((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    liff.init({ liffId: "2000028080-wWk5pKQG" });
  }, []);

  const handledLoginLine = () => {
    try {
      liff.login();
    } catch (err) {
      console.log(err);
    }
  };

  const handLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START", loading });
    try {
      const res = await axios.post(config_api.apiloginuserauth, InText);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setLoginpopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "ยินดีต้อนรับ",
        text: "ขอบคุณที่ร่วมเป็นสมาชิกของเรา 😍",
        showConfirmButton: false,
        timer: 1500,
      });
      // navigator(0)
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "ไม่พบบันชีผู้ใช้นี้ !",
        text: "โปรดตรวจสอบอีกครั้ง",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <div className="box-l" onClick={setLoginpopup.bind(this, false)}>
          <div className="btn-c" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-c"
              onClick={setLoginpopup.bind(this, false)}
            >
              <span>X</span>
            </button>
            <div className="head-h">
              <h1>ล็อกอินเข้าสู่ระบบ</h1>
            </div>
            <div className="line-b"></div>
            <div className="head-h">
              <h1>CommicBook Novels</h1>
            </div>
            <div className="log-l">
              <table className="font-color-f">ชื่อผู้ใช้งาน</table>
              <input
                className="font-pp"
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
              />
              <table className="font-color-f">รหัสผ่าน</table>
              <input
                className="font-pp"
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {/* {error && <span>{error.massage}</span>} */}
            <div className="btn-log ">
              <button onClick={handLogin}>ล็อกอินเข้าสู่ระบบ</button>
            </div>
    
            <div className="foot-t">
              <button className="btn-n" onClick={handledLoginLine}>
                เข้าสู่ระบบด้วย Line
              </button>
            </div>
            <div className="-foot-r-l">
              <table className="font-f font-color-f">
                {" "}
                หากยังไม่มีบัญชี{" "}
                <Link to="/my-create/account" className="font-f font-color-t ">
                  CommicBook Novels
                </Link>{" "}
                โปรด
                <Link to="/my-create/account">
                  <button>สมัครสมาชิก</button>
                </Link>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
