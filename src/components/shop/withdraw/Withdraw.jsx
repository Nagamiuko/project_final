import React, { useState } from "react";
import { toast } from "react-toastify";
import "./withdraw.css";
import axios from "axios";
import config from "../../../config.json"
import Load from "../../alertshow/Load";
const Withdraw = ({ setOpenWihraw, user, totalPrice }) => {
  const [shopnumber, setShopNumber] = useState(user && user?._id);
  const [moneyTotal, setmoneyTotal] = useState(totalPrice);
  const [bankHolderName, setbankHolderName] = useState(user && user?.fullname);
  const [bankName, setbankName] = useState("");
  const [mailShop, setmailShop] = useState("");
  const [bankAddress, setbankAddress] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [loading, setLoad] = useState(false);
  const HandWithdram = () => {
    const Data = {
      shopId: shopnumber,
      moneyTotal: moneyTotal,
      bankHolderName: bankHolderName,
      bankName: bankName,
      mailShop: mailShop,
      bankAddress: bankAddress,
      bankAccountId: bankAccountNumber,
    };
    try {
      if (
        Data.bankName === "" ||
        Data.mailShop === "" ||
        Data.bankAddress === "" ||
        Data.bankAccountNumber === ""
      ) {
        toast.error("โปรดใส่ข้อมูลให้ครบ");
      }else{
        setLoad(true)
        axios.post(config.apiCreateWithdram , Data).then((res) => {
           toast.success("คุณได้ทำการแจ้งถอดเงินกับเราสำเร็จ")
           setbankName("")
           setmailShop("")
           setbankAddress("")
           setbankAccountNumber("")
        })
        setLoad(false)
        setOpenWihraw(false)
      }
    } catch (err) {
       toast.error("มีข้อผิดพลาดโปรดรองใหม่อีกครั้ง")
    }
    console.log(Data);
  };
  return (
    <>
    { loading ? <Load/> :
      <div className="box-container-pop">
        <div className="box-layer">
          <div className="layer-input">
            <div className="title-notifiction">
              <div className="title">แจ้งถอนเงิน</div>
              <div
                className="close-btn"
                onClick={setOpenWihraw.bind(this, false)}
              >
                x
              </div>
            </div>

            <div className="input-text-with">
              <label htmlFor="">หมายเลขร้านค้า</label>
              <input
                type="text"
                value={user?._id}
                disabled
                onChange={(e) => setShopNumber(e.target.value)}
              />
              <label htmlFor="">จำนวนเงิน (THB)</label>
              <input
                type="text"
                value={totalPrice}
                disabled
                onChange={(e) => setmoneyTotal(e.target.value)}
              />
              <label htmlFor="">ชื่อ - สกุล</label>
              <input
                type="text"
                value={user?.fullname}
                disabled
                onChange={(e) => setbankHolderName(e.target.value)}
              />
              <label htmlFor="">อีเมลร้านค้า</label>
              <input
                type="text"
                onChange={(e) => setmailShop(e.target.value)}
              />
              <label htmlFor="">เลือกธนาคาร</label>
              <select
                name=""
                id="value"
                onChange={(e) => setbankName(e.target.value)}
              >
                <option value="ธนาคารกรุงไทย">เลือกธนาคาร</option>
                <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                <option value="ธนาคารกรุงศรีอยุธยา">ธนาคารกรุงศรีอยุธยา</option>
                <option value="ธนาคารยูโอบี">ธนาคารยูโอบี</option>
                <option value="ธนาคารออมสิน">ธนาคารออมสิน</option>
                <option value="ธนาคารทิสโก้">ธนาคารทิสโก้</option>
                <option value="ธนาคารซีไอเอ็มบีไทย">ธนาคารซีไอเอ็มบีไทย</option>
                <option value="ธนาคารทหารไทยธนชาต">ธนาคารทหารไทยธนชาต</option>
              </select>
              <label htmlFor="">ธนาคารสาขา</label>
              <input
                type="text"
                onChange={(e) => setbankAddress(e.target.value)}
              />
              <label htmlFor="">หมายเลขบัญชีธนาคาร</label>
              <input
                type="text"
                onChange={(e) => setbankAccountNumber(e.target.value)}
              />
            </div>
            <div className="btn-sub">
              <button onClick={HandWithdram}>แจ้งถอน</button>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Withdraw;
