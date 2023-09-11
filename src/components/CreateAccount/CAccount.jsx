import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config.json";
import "./CA.css";
import { Link, useNavigate } from "react-router-dom";
import Load from "../alertshow/Load";
const CAccount = () => {
  const [closeeye, setEye] = useState(false);
  const [closeeyerepass, setEyeRePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullname: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullname: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "กรุณาระบุชื่อผู้ใช้ของคุณ.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "กรุณาระบุรหัสผ่านของคุณ.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "กรุณาระบุรหัสผ่านให้ตรงกัน.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "กรุณายืนยันหัสผ่านของคุณ.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "กรุณาระบุรหัสผ่านให้ตรงกัน.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "กรุณาระบุอีเมลของคุณ";
          }
          break;
        case "fullname":
          if (!value) {
            stateObj[name] = "กรุณาระบุชื่อสกุลของคุณ.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handSendForm = async (e) => {
    e.preventDefault();
    const Data = {
      email: input.email,
      fullname: input.fullname,
      username: input.username,
      password: input.password,
    };
    try {
      if (
        input.username === "" ||
        input.password === "" ||
        input.email === "" ||
        input.fullname === ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "ระบุข้อมูลไม่ครบ",
          text: "โปรดระบุข้อมูลให้ครบ",
        });
      } else {
        setLoading(true);
        await axios.post(config.apiuserregister, Data);
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          text: "ยินดีต้อนรับสมาชิกใหม่ !",
        });
        navigator("/");
        setLoading(false);
      }
    } catch (err) {
      setLoading(true);
      Swal.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
        text: "ชื่อผู้ใช้หรืออีเมลมีผู้ใช้งานไปแล้ว!",
      });
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div>
      {loading ? (
        <Load />
      ) : (
        <div className="box-ca">
          <div className="btn-ca">
            <div className="head-h">
              <h1>CommicBook Novels</h1>
            </div>
            <div className="line-b"></div>
            <div className="head-h">
              <h1>สร้างบัญชีของคุณ</h1>
            </div>
            <div className="log-l-ca">
              <table className="font-color-f">ชื่อผู้ใช้งาน</table>
              <input
                className="font-pp"
                type="email"
                name="username"
                placeholder="Username"
                value={input.username}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.username && <span className="err">{error.username}</span>}
              <table className="font-color-f">รหัสผ่าน</table>
              <div className="i-p">
                <input
                  className="font-pp p-v"
                  type={closeeye === false ? "password" : "text"}
                  name="password"
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  placeholder="Password"
                />
                <div className="close-eye" onClick={() => setEye(!closeeye)}>
                  <FontAwesomeIcon
                    icon={closeeye === false ? faEye : faEyeSlash}
                  />
                </div>
              </div>
              {error.password && <span className="err">{error.password}</span>}
              <div
                className="close-eye"
                onClick={() => setEyeRePass(!closeeyerepass)}
              >
                <FontAwesomeIcon
                  icon={closeeyerepass === false ? faEye : faEyeSlash}
                />
              </div>
              <input
                className="font-pp "
                type={closeeyerepass === false ? "password" : "text"}
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
                placeholder="Confirm Password"
              />
              {error.confirmPassword && (
                <span className="err">{error.confirmPassword}</span>
              )}
            </div>
            <div className="line-b"></div>
            <div className="log-l-ca">
              <table className="font-color-f">อีเมล</table>
              <input
                className="font-pp"
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.email && <span className="err">{error.email}</span>}
              <table className="font-color-f">ชื่อ-นามสกุล</table>
              <input
                className="font-pp"
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={input.fullname}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.fullname && <span className="err">{error.fullname}</span>}
            </div>
            {/* {error && <span>{error.massage}</span>} */}
            <div className="btn-log ">
              <button
                type="submit"
                onClick={handSendForm}
                onBlur={validateInput}
              >
                นำส่งข้อมูล
              </button>
            </div>
            <div className="b-text">
              หากมีบัญชีอยู่แล้วหรือต้องการเข้าใช้งานด้วย Google หรือ Line
              กลับไปหน้า<Link to="/"> Login</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CAccount;
