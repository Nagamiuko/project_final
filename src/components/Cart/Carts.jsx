import React, { useEffect, useState } from "react";
import excover from "../../assets/book-test/nocover.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/action/cart";
import MenuLeft from "../mycollection/menuLeft/MenuLeft";
const Carts = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigator = useNavigate()
  const [item, setItem] = useState(null)
  
  let n = 0;
  const TotalPaice = cart.reduce(
    (acc, item) => acc + item.qty * item.price_of_free,
    0
  );
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };
  const addChackout = (ChackOutID) => {
    const DataItem = cart && cart.find((id) => id._id === ChackOutID._id)
    localStorage.setItem("latestChackout", JSON.stringify(DataItem));
    navigator('/CheckoutOrder')
    console.log(DataItem);
  }
  return (
    <>
      <div className="box-bg-list-mybook top-buttom">
         <div className="box-left-menu">
           <MenuLeft/>
          </div>
        <div className="box-container-list-mybook">
          <div className="title-my">ตะกร้าหนังสือของฉัน</div>
          <div className="box-contai-book">
            <div className="box-search-mybook"></div>
            <div className="border-bar-bottom"></div>
            <div className="list-book-box">
              {cart === "" ? "ไม่มีรายการ" : cart.map((datoon, keys) => (
                <div className="box-item filter-drop" key={keys}>
                  <Link to={`/ViewToon/${datoon._id}`}>
                    <div className="flex-le">
                      <div className="im-cover-book">
                        <img
                          src={datoon?.cover_image?.cover_image_url || excover}
                          alt=""
                        />
                      </div>
                      <div className="title-name-book col ">
                        <p>{datoon?.title}</p>
                        <h6>{`ราคา: ${datoon?.price_of_free} ฿`}</h6>
                      </div>
                    </div>
                  </Link>
                  <div className="flex-rh">
                    <div className="d-dt-book-t">
                      <div className="view-book">
                        <p> {"ขายโดย: " + datoon?.mangauser?.fullname} </p>
                      </div>
                      <div className="btn-t-book">
                        <button onClick={() => removeFromCartHandler(datoon)}>
                          นำออก
                        </button>
                        <button className="btn-pay"onClick={()=> addChackout(datoon)} >
                          ชำระเงิน
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-bar-bottom"></div>
            {/* {TotalPaice === 0 ? (
            <div className="title-my  btn-payment ">
              <button disabled onClick={()=> navigator('/CheckoutOrder')}>ไปหน้าชำระเงิน</button>
            </div>
            ):(
            <div className="title-my  btn-payment ">
              <button onClick={()=> navigator('/CheckoutOrder')}>ไปหน้าชำระเงิน</button>
            </div>
            )} */}
            <div className="box-search-mybook">{`Total : ${TotalPaice} ฿`}</div>
          </div>
          <div className="box-contai-book"></div>
        </div>
      </div>
    </>
  );
};
export default Carts;
