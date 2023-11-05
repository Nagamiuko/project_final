import React, { useContext, useEffect, useState } from "react";
import nocover from "../../assets/book-test/nocover.png";
import "./checkout.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import useFetchDataAddress from "../hooks/UserAddress";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config.json"

const CheckoutOrder = () => {
  const navigator = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const { data_address } = useFetchDataAddress(user._id);
  const [dataad, setDataAd] = useState();
  const [nameaddre, setNameaddress] = useState("");
  const [telss, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [distrct, setDistrct] = useState("");
  const [dists, setDistrct2] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostal_code] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTelpayment] = useState("");
  const [typeAd, setTypeAd] = useState("");
  const [openaddres, setOpenAddress] = useState(false);
  const [DataChackOut, setDataChakOut] = useState(false);
 

  useEffect(() => {
    setDataAd(data_address);
    const orderData = JSON.parse(localStorage.getItem("latestChackout"));
    setDataChakOut(orderData)
  }, [data_address]);

  const paymentSubmit = async () => {
    if (
      address === "" ||
      distrct === "" ||
      dists === "" ||
      province === "" ||
      postalcode === "" ||
      name === "" ||
      email === "" || 
      tel === ""
    ) {
      toast.error("Please choose your delivery address!")
    } else {
      const DataPostAddres ={
        naddress: nameaddre,
        tels: telss,
        uaddress:address,
        dit: distrct,
        dits:dists,
        provin: province,
        postalcode: postalcode,
        typeAddres:""
      };
      const shippingAddress = {
        nameaddre,
        telss,
        address,
        distrct,
        dists,
        province,
        postalcode,
      };
      const informationPayment = {
        name,
        email,
        tel,
      };
      const orderData = {
        DataChackOut,
        TotalPaice,
        shippingAddress,
        user,
        informationPayment,
      };
       try{
        await axios.post(
          `${config.apiAddUpDataAddress}/${user?._id}`,
           DataPostAddres
        );
       }catch(err){
            toast.error("ข้อมูลไม่ถูกต้องหรือมีข้อผิดพลาดโปรดลองอีกครั้ง")
       }
      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigator("/payment");
    }
  };

  // const TotalPaice = DataChackOut.reduce(
  //   (acc, item) => acc + item.qty * item.price_of_free,
  //   0,
  // );
  const TotalPaice = DataChackOut?.price_of_free;
  const ToTalBook = cart.map((b, item) => item);

  return (
    <>
      <div className="box-con-checkout">
        <div className="box-leth">
          <div className="title-checkout">ข้อมูลติดต่อ สำหลับชำระเงิน</div>
          <div className="box-container-addres-name">
            <label htmlFor="">ชื่อ - สกุล</label>
            <input
              type="text"
              placeholder="ระบุชื่อ"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="">อีเมล</label>
            <input
              type="text"
              placeholder="อีเมล"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="">เบอร์โทรศัพท์</label>
            <input
              type="text"
              placeholder="เบอร์โทรศัพท์"
              onChange={(e) => setTelpayment(e.target.value)}
              required
            />
          </div>
          <div className="box-content-title-btn">
            <div className="title-checkout">ที่อยู่จัดส่ง</div>
            <button onClick={() => setOpenAddress(!openaddres)}>
              {typeAd || "เลือกที่อยู่"}{" "}
              <FontAwesomeIcon
                icon={openaddres === false ? faChevronDown : faChevronUp}
              />
            </button>
            {openaddres && (
              <div className="box-check-faAddressBook">
                {dataad.map((data, keys) => (
                  <div className="list-addres" key={keys}>
                    <p>
                      <input
                        type="checkbox"
                        value={data.typeAddress}
                        onClick={() =>
                          setNameaddress(data?.nameaddress) ||
                          setTel(data?.tel) ||
                          setAddress(data?.address) ||
                          setDistrct(data?.distrct) ||
                          setDistrct2(data?.dists) ||
                          setProvince(data?.province) ||
                          setPostal_code(data?.postalcode) ||
                          setTypeAd(data?.typeAddress)
                        }
                      />
                      {data.typeAddress}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="box-address">
            <div className="box-size">
              <div className="flex-row-n-t">
                <label htmlFor="">ชื่อผู้รับ</label>
                <input
                  type="text"
                  value={nameaddre}
                  placeholder="ระบุชื่อผู้รับ"
                  onChange={(e) => setNameaddress(e.target.value)}
                />
              </div>
              <div className="flex-row-n-t">
                <label htmlFor="">โทรศัพท์</label>
                <input
                  type="text"
                  value={telss}
                  placeholder="ระบุโทรศัพท์"
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="">ที่อยู่</label>
            <input
              type="text"
              placeholder="บ้านเลขที่ ซอย ถนน"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="box-size">
              <div className="flex-row-n-t">
                <label htmlFor="">ตำบน / แขวง</label>
                <input
                  type="text"
                  placeholder="ระบุ ตำบน แขวง"
                  value={distrct}
                  onChange={(e) => setDistrct(e.target.value)}
                />
              </div>
              <div className="flex-row-n-t">
                <label htmlFor="">อำเภอ / เขต</label>
                <input
                  type="text"
                  placeholder="ระบุ อำเภอ เขต"
                  value={dists}
                  onChange={(e) => setDistrct2(e.target.value)}
                />
              </div>
            </div>
            <div className="box-size">
              <div className="flex-row-n-t">
                <label htmlFor="">จังหวัด</label>
                <input
                  type="text"
                  placeholder="ระบุจังหวัด"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div className="flex-row-n-t">
                <label htmlFor="">รหัสไปรษณีย์</label>
                <input
                  type="text"
                  placeholder="ระบุรหัสไปรษณีย์"
                  value={postalcode}
                  onChange={(e) => setPostal_code(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="title-checkout">
            ที่อยู่สำหลับออกใบเสร็จ / ใบกำกับภาษี
          </div>
          <div className="box-address">
            <div className="box-size">
              <div className="flex-row-n-t">
                <label htmlFor="">ชื่อผู้รับ</label>
                <input
                  type="text"
                  value={nameaddre}
                  placeholder="ระบุชื่อผู้รับ"
                  disabled
                />
              </div>
              <div className="flex-row-n-t">
                <label htmlFor="">โทรศัพท์</label>
                <input
                  type="text"
                  value={telss}
                  placeholder="ระบุโทรศัพท์"
                  disabled
                />
              </div>
            </div>
            <label htmlFor="">ที่อยู่</label>
            <input
              type="text"
              placeholder="บ้านเลขที่ ซอย ถนน"
              value={address}
              disabled
            />
            <div className="box-size">
              <div className="flex-row-n-t">
                <label htmlFor="">ตำบน / แขวง</label>
                <input
                  type="text"
                  placeholder="ระบุ ตำบน แขวง"
                  value={distrct}
                  disabled
                />
              </div>
              <div className="flex-row-n-t">
                <label htmlFor="">อำเภอ / เขต</label>
                <input
                  type="text"
                  placeholder="ระบุ อำเภอ เขต"
                  value={dists}
                  disabled
                />
              </div>
            </div>
            <div className="box-size">
              <div className="flex-row-n-t">
                <label htmlFor="">จังหวัด</label>
                <input
                  type="text"
                  placeholder="ระบุจังหวัด"
                  value={province}
                  disabled
                />
              </div>
              <div className="flex-row-n-t">
                <label htmlFor="">รหัสไปรษณีย์</label>
                <input
                  type="text"
                  placeholder="ระบุรหัสไปรษณีย์"
                  value={postalcode}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="box-address">
            <div className="back" onClick={() => navigator("/Carts")}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
              แก้ไขรายการสั่งชื้อ
            </div>
          </div>
        </div>
        <div className="box-rh">
          <div className="text-sellr">หนังสือจำหน่วยโดย: Keroro Manga</div>
          <div className="box-details">
              <div className="box-detail-order">
                <div className="box-img-cover">
                  <img
                    src={DataChackOut?.cover_image?.cover_image_url || nocover}
                    alt=""
                  />
                </div>
                <div className="book-detail-nt">
                  <p>{DataChackOut?.title}</p>
                  <p>{DataChackOut?.typebookAndnovel}</p>
                  <div className="order-bat">
                    <p>จำนวน: {DataChackOut?.qty}</p>
                    <p>{DataChackOut?.price_of_free} บาท</p>
                  </div>
                </div>
              </div>
          </div>
          <div className="box-details">
            <div className="send-order-detail">
              <div className="item-list-detail">
                <p>หนังสือรวม:</p>
                <p>{DataChackOut?.qty} รายการ</p>
              </div>
              <div className="item-list-detail">
                <p>ค่าจัดส่งรวม:</p>
                <p>ไม่มีค่าจัดส่ง</p>
              </div>
              <div className="item-list-detail">
                <p className="font">รวม:</p>
                <p className="font">{TotalPaice} บาท</p>
              </div>
            </div>
          </div>
          <div className="box-details">
            <button onClick={paymentSubmit}>ถัดไป</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutOrder;
