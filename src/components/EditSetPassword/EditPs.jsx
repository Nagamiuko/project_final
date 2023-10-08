import React, { useContext, useState } from "react";
import MenuEdit from "../MenuEdits/MenuEdit";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditPs.css";
import config from "../../config.json";
import { AuthContext } from "../Context/AuthContext";
const EditPs = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useContext(AuthContext);
  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(`${config.apiUserRePassword}/${user._id}`, {
        oldPassword,
        newPassword,
        confirmPassword,
      })
      .then((res) => {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="box-e-bg">
      <div className="title-e-pf">My Account</div>
      <div className="flex-d-ma-dpf fil-d-s">
        <div className="box-e-m-pf-ps ">
          <MenuEdit />
        </div>
        <div className="box-e-d-pf-ps">
          <div className="m-li-d-ps">
            <div className="title-ps">
              <form onSubmit={passwordChangeHandler}>
                Password and Security
                <div className="smal-test-ps">
                  ตั้งค่ารหัสผ่านและความปลอดภัย
                </div>
                <div className="in-pass-ps">
                  <table>รหัสปัจจุบัน</table>
                  <input
                    type="password"
                    placeholder="Current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="in-pass-ps">
                  <table>รหัสผ่านใหม่ของฉัน</table>
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="in-pass-ps">
                  <table>ยืนยันรหัสผ่านใหม่ของฉัน</table>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="in-pass-ps">
                  <div className="btn-ss">
                    <button type="submit">Reset Password</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPs;
