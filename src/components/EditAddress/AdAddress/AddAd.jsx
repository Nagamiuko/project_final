import React, { useContext, useState, useEffect } from "react";
import "./Add.css";
import axios from "axios";
import config from "../../../config.json";
import Swl from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Load from "../../alertshow/Load";
const AddAd = ({ setOpenAdd, setLoad, DataAddres, UpdataAddres, Addreid }) => {
  const navigator = useNavigate();
  const { user } = useContext(AuthContext);
  const [nameaddre, setNameaddress] = useState();
  const [letss, setTel] = useState();
  const [address, setAddress] = useState();
  const [distrct, setDistrct] = useState();
  const [dists, setDistrct2] = useState();
  const [province, setProvince] = useState();
  const [postalcode, setPostal_code] = useState();
  const [load, setLoads] = useState();
  const [typeAd, setTypeAd] = useState();
  const [DataPostAddres, setDataPostAddres] = useState({
    naddress: "",
    tels: "",
    uaddress: "",
    dit: "",
    dits: "",
    provin: "",
    postalcode: "",
    typeAddres:""
  });
  console.log("DataAddress:",DataAddres);

  useEffect(() => {
        setNameaddress(DataAddres.nameaddress);
        setTel(DataAddres.tel);
        setAddress(DataAddres.address);
        setDistrct(DataAddres.distrct);
        setDistrct2(DataAddres.dists);
        setProvince(DataAddres.province);
        setPostal_code(DataAddres.postalcode);
        setTypeAd(DataAddres.typeAddress);
  }, [DataAddres]);

  const handdleChang = (e) => {
    const dataPostAddress = { ...DataPostAddres };
    dataPostAddress[e.target.name] = e.target.value;
    setDataPostAddres(dataPostAddress);
  };

  console.log(DataPostAddres);
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      if (
        DataPostAddres.naddress === "" ||
        DataPostAddres.tels === "" ||
        DataPostAddres.uaddress === "" ||
        DataPostAddres.dit === "" ||
        DataPostAddres.dits === "" ||
        DataPostAddres.provin === "" ||
        DataPostAddres.postalcode === ""
      ) {
        Swl.fire({
          icon: "error",
          title: "ใส่ข้อมูลไม่ครบ",
          text: "โปรดใส่ข้อมูลให้ครบ",
        });
      } else {
        setOpenAdd(false);
        setLoad(true);
        await axios.post(
          `${config.apiadduseraddress}/${user?._id}`,
           DataPostAddres
        );
        Swl.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
        });
        navigator(0);
        setLoad(false);
      }
    } catch (err) {
      Swl.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
      });
      console.log(err);
    }
  };
  const handleUpData = async (e) => {
    const Data = {
      naddress: nameaddre,
      tels: letss,
      uaddress: address,
      dit: distrct,
      dits: dists,
      provin: province,
      postalcode: postalcode,
      typeAddres : typeAd
    };
    try {
      setOpenAdd(false);
      setLoad(true);
      await axios.put(
        `${config.apiuserUpdataaddress}/${DataAddres?._id}`,
        Data
      );
      Swl.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
      });
      navigator(0);
      setLoad(false);
    } catch (err) {
      Swl.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
      });
      console.log(err);
    }
  };
  if (UpdataAddres === "add") {
    return (
      <>
        <div className="box-a-add">
          <div className="bo-con-d">
            เพิ่มที่อยู่จัดส่ง
            <div className="b-d-add">
              <div className="in-name-a-tel">
                <div className="na-l">
                  <table>ชื่อผู้รับ</table>
                  <input
                    type="text"
                    placeholder="ชื่อผู้รับ"
                    name="naddress"
                    onChange={handdleChang}
                  />
                </div>
                <div className="tel-r">
                  <table>เบอร์โทรติดต่อ</table>
                  <input
                    type="text"
                    name="tels"
                    placeholder="เบอร์โทรติดต่อ"
                    onChange={handdleChang}
                  />
                </div>
              </div>
              <div className="in-addresse">
                <table>ที่อยู่</table>
                <input
                  type="text"
                  placeholder="บ้านเลขที่ ซอย ถนน"
                  name="uaddress"
                  onChange={handdleChang}
                />
              </div>
              <div className="in-name-a-tel">
                <div className="na-l">
                  <table>ตำบล/แขวง</table>
                  <input
                    type="text"
                    placeholder="ตำบล/แขวง"
                    name="dit"
                    onChange={handdleChang}
                  />
                </div>
                <div className="tel-r">
                  <table>อำเภอ/เขต</table>
                  <input
                    type="text"
                    placeholder="อำเภอ/เขต"
                    name="dits"
                    onChange={handdleChang}
                  />
                </div>
              </div>
              <div className="in-name-a-tel">
                <div className="na-l">
                  <table>จังหวัด</table>
                  <input
                    type="text"
                    placeholder="จังหวัด"
                    name="provin"
                    onChange={handdleChang}
                  />
                </div>
                <div className="tel-r">
                  <table>รหัสไปรษณีย์</table>
                  <input
                    type="text"
                    placeholder="รหัสไปรษณีย์"
                    name="postalcode"
                    onChange={handdleChang}
                  />
                </div>
              </div>
              <div className="in-addresse">
                <table>ประเภทที่อยู่</table>
                 <select name="typeAddres" id='value' onChange={handdleChang}>
                   <option value="">เลือกเป็นที่อยู่</option>
                   <option value="Home">Home</option>
                   <option value="Default">Default</option>
                </select>
              </div>
            </div>
            <div className="btn-close-a-save">
              <button onClick={setOpenAdd.bind(this, false)}>Cancel</button>
              <button onClick={handleSend}>Save</button>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (UpdataAddres === "updata") {
    return (
      <>
        {load ? (
          <Load />
        ) : (
          <div className="box-a-add">
            <div className="bo-con-d">
              แก้ไขที่อยู่จัดส่ง
              <div className="b-d-add">
                <div className="in-name-a-tel">
                  <div className="na-l">
                    <table>ชื่อผู้รับ</table>
                    <input
                      type="text"
                      placeholder="ชื่อผู้รับ"
                      value={nameaddre}
                      onChange={(e) => setNameaddress(e.target.value)}
                    />
                  </div>
                  <div className="tel-r">
                    <table>เบอร์โทรติดต่อ</table>
                    <input
                      type="text"
                      placeholder="เบอร์โทรติดต่อ"
                      value={letss}
                      onChange={(e) => setTel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="in-addresse">
                  <table>ที่อยู่</table>
                  <input
                    type="text"
                    placeholder="บ้านเลขที่ ซอย ถนน"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="in-name-a-tel">
                  <div className="na-l">
                    <table>ตำบล/แขวง</table>
                    <input
                      type="text"
                      placeholder="ตำบล/แขวง"
                      value={distrct}
                      onChange={(e) => setDistrct(e.target.value)}
                    />
                  </div>
                  <div className="tel-r">
                    <table>อำเภอ/เขต</table>
                    <input
                      type="text"
                      placeholder="อำเภอ/เขต"
                      value={dists}
                      onChange={(e) => setDistrct2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="in-name-a-tel">
                  <div className="na-l">
                    <table>จังหวัด</table>
                    <input
                      type="text"
                      placeholder="จังหวัด"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>
                  <div className="tel-r">
                    <table>รหัสไปรษณีย์</table>
                    <input
                      type="text"
                      placeholder="รหัสไปรษณีย์"
                      value={postalcode}
                      onChange={(e) => setPostal_code(e.target.value)}
                    />
                  </div>
                </div>
                  <div className="in-addresse">
                    <table>ประเภทที่อยู่</table>
                    <select id="value" name="value" value={typeAd} onChange={(e) => setTypeAd(e.target.value)}>
                      <option value="">เลือกเป็นที่อยู่</option>
                      <option value="Home">Home</option>
                      <option value="Default">Default</option>
                    </select>
                  </div>
              </div>
              <div className="btn-close-a-save">
                <button onClick={setOpenAdd.bind(this, false)}>Cancel</button>
                <button onClick={handleUpData}>Updata</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};
export default AddAd;
