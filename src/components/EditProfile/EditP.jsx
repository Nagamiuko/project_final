import React, { useContext, useState } from "react";
import "./EditP.css";
import { NavLink, useNavigate } from "react-router-dom";
import MenuEdit from "../MenuEdits/MenuEdit";
import Novatar from "../../assets/userAvatar/user.png";
import {} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import config from "../../config.json";
import { AuthUpdataContext } from "../Context/AuthUpdataContext";
import Swal from "sweetalert2";
import Load from "../alertshow/Load";
const EditP = () => {
  const navigator = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatchup } = useContext(AuthUpdataContext);
  const [fullname, setName] = useState([user?.fullname]);
  const [displayname, setNameDisplay] = useState([user?.namedisplay]);
  const [mail, setMail] = useState([user?.email]);
  const [gender, setGender] = useState(user?.sex || "");
  const [fileCover, setFileCover] = useState([]);
  const [image, setFileImage] = useState("");
  const [loading, setLoad] = useState(false);

  const isChecked = (value) => value === gender;
  const onSelecGender = ({ target: { value } }) => {
    setGender(value);
  };

  const previewFile = (file) => {
     const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileImage(reader.result);
    };
  };
  const handleChangeProfile = (e) => {
    const file = e.target.files[0];
    setFileCover(file);
    previewFile(file);
  };
  const handleSummit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", fileCover);
    data.append("fullname", fullname);
    data.append("displayName", displayname);
    data.append("email", mail);
    data.append("sex", gender);
    const configsheaders = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      setLoad(true);
      const res = await axios.put(
        `${config.apiuserupdata}/${user._id}`,
        data,
        configsheaders
      );
      dispatchup({ type: "UPDATA_SUCCESS", payload: res.data.details });
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
      });
      navigator(0);
      setLoad(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
      });
      setLoad(false);
      console.log(err);
    }
  };
  const handleDeleteUser = async (user) => {
    console.log(user?._id);
    try {
      Swal.fire({
        text: "ต้องการลบบันชีผู้ใช้นี้ ใช่หรือไม่ ?",
        text: "โปรดอ่านลายระเอียดก่อนทำการลบบันชีผู้ใช้ของคุณ",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Success!", "ลบข้อมูลสำเร็จ", "success");
          await axios
            .delete(`${config.apiuserDelete}/${user?._id}`)
            .then(localStorage.removeItem("user"), navigator(0));
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };

  return (
    <div className="body">
      {loading ? (
        <Load />
      ) : (
        <div className="box-e-bg">
          <div className="title-e-pf">My Account</div>
          <div className="flex-d-ma-dpf fil-d-s-p">
            <div className="box-e-m-pf">
              <MenuEdit />
            </div>
            <div className="box-e-d-pf">
              <div className="m-li-d-pf">
                <div className="t-e">
                  Profile
                  <div className="smal-test-t">ข้อมูลส่วนตัวของฉัน</div>
                  <div className="in-name-disp">
                    <table>ชื่อ - สกุล</table>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                    />
                    <table>นามปากกา</table>
                    <input
                      type="text"
                      value={displayname}
                      onChange={(e) => setNameDisplay(e.target.value)}
                      placeholder="Display Name"
                    />
                    <table>อีเมล</table>
                    <input
                      type="email"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      placeholder="Set Email"
                    />
                  </div>
                  <div className="me-s-c">
                    <div className="n-s-c">Gender</div>
                    <input
                      id="m"
                      name="gender"
                      className="c-se"
                      type="radio"
                      value="ชาย"
                      checked={isChecked("ชาย")}
                      onChange={onSelecGender}
                    />
                    <label className="button" htmlFor="m">
                      ชาย
                    </label>
                    <input
                      id="w"
                      name="gender"
                      className="c-se"
                      type="radio"
                      value="หญิง"
                      checked={isChecked("หญิง")}
                      onChange={onSelecGender}
                    />
                    <label htmlFor="w" className="button">
                      หญิง
                    </label>
                    <input
                      id="no"
                      name="gender"
                      className="c-se"
                      type="radio"
                      value="ไม่ระบุ"
                      checked={isChecked("ไม่ระบุ")}
                      onChange={onSelecGender}
                    />
                    <label htmlFor="no" className="button">
                      ไม่ระบุ
                    </label>
                  </div>
                  <div className="me-b-setting">
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user)}
                    >
                      ลบบัญชีผู้ใช้งาน
                    </button>
                    <button onClick={handleSummit} className="btn-save">
                      save
                    </button>
                  </div>
                </div>
                <div className="im-pro-dit let">
                  <label className="ora-ty w-h font-s-c" htmlFor="imgeProfile">
                    <h2>Edit</h2>
                  </label>
                  <div id="imgset" className="box-im-pf">
                    <img
                      src={image ? image : user?.avatar?.avatar_url || Novatar}
                      alt=""
                    />
                  </div>
                  <input
                    id="imgeProfile"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChangeProfile}
                  />
                  <div className="name-prof">Image Profile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditP;
