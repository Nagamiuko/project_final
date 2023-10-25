import React, { useContext, useEffect, useState } from "react";
import nocover from "../../assets/book-test/nocover.png";
import "./payment.scss";
import Bank from "../../assets/icon/banking.png";
import Credit from "../../assets/icon/credit.png";
import axios from "axios";
import config from "../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons'
import Swal from "sweetalert2";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Load from "../alertshow/Load";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/action/cart";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const navigator = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [orderData, setOrderData] = useState([]);
  const [typePayment, settypePayment] = useState("");
  const [payment, setPayment] = useState("");
  const [select, setSelect] = useState(1);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);
  console.log(orderData.DataChackOut);
  const order = {
    cart: orderData.DataChackOut,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.TotalPaice,
    status:"Delivered",
    informationPayment:orderData?.informationPayment,
  };
  const AddMyBook = {
    cart: orderData?.cart,
  };
  const paymentData = {
    amount: Math.round(orderData?.TotalPaice * 100),
  };
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };
  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const configHeaders = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        config.apiPayment,
        paymentData,
        configHeaders
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        Swal.fire({
          icon: "warning",
          title: result.error.message,
          text: "โปรดตรวจสอบอีกครั้ง",
          showConfirmButton: false,
          timer: 2500,
        });
        
        // alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPayment("Delivered")
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
          setLoad(true)
          await axios.post(config.apiCreateOrder, order, configHeaders).then((res)=> {
            dispatch(removeFromCart(order.cart));
            localStorage.removeItem("latestOrder")
            window.location = '/order-success';
          });
          setLoad(false)
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ToTalBook = orderData?.DataChackOut;
  const isChecked = (value) => value === typePayment;
  const onSelect = ({ target: { value } }) => {
    settypePayment(value);
  };
  return (
    <>
    {load ? <Load/> : (
      <div className="box-con-checkout">
        <div className="box-leth">
          <div className="title-checkout">เลือกวิธีชำระเงิน</div>
          <div className="box-choose-payment">
            <label htmlFor="banking" className="box-border" disabled>
              <div className="small">
                <img src={Bank} alt="" />
              </div>
              Internet Banking
              <input
                type="radio"
                id="banking"
                value="banking"
                name="typePayment"
                checked={isChecked("banking")}
                onChange={onSelect}
                disabled
              />
            </label>
            <label htmlFor="credit" className="box-border">
              <div className="icon">
                <img src={Credit} alt="" />
              </div>
              Credit Card
              <input
                type="radio"
                id="credit"
                value="credit"
                name="typePayment"
                checked={isChecked("credit")}
                onChange={onSelect}
              />
            </label>
          </div>
          <div className="box-container-">
            {typePayment && typePayment === "credit" ? (
              <PaymentCardit
                user={user}
                paymentHandler={paymentHandler}
                orderData={orderData}  
              />
            ) : (
              ""
            )}
          </div>
          <div className="box-container-detail">
            <div className="contact-title">
              <div className="title-tact">
                <h5>ข้อมูลติดต่อ</h5>
                <h6>(สำหลับชำระเงิน)</h6>
              </div>
              <div className="detail-user">
                <p>{orderData?.informationPayment?.name}</p>
                <p>{orderData?.informationPayment?.email}</p>
                <p>{orderData?.informationPayment?.tel}</p>
              </div>
            </div>
            <div className="line-bar"></div>
            <div className="contact-title">
              <div className="title-tact">
                <h5>ที่อยู่จัดส่ง</h5>
              </div>
              <div className="detail-user">
                <p>
                  {orderData?.shippingAddress?.nameaddre +
                    " " +
                    orderData?.shippingAddress?.address}
                </p>
                <p>
                  {orderData?.shippingAddress?.distrct +
                    " " +
                    orderData?.shippingAddress?.dists +
                    " " +
                    orderData?.shippingAddress?.province +
                    " " +
                    orderData?.shippingAddress?.postalcode}
                </p>
                <p>0628607353</p>
              </div>
            </div>
            <div className="line-bar"></div>
            <div className="contact-title">
              <div className="title-tact">
                <h5>ข้อมูลใบเสร็จ / ใบกำกับภาษี</h5>
              </div>
              <div className="detail-user">
                <p>
                  {orderData?.shippingAddress?.nameaddre +
                    " " +
                    orderData?.shippingAddress?.address}
                </p>
                <p>
                  {orderData?.shippingAddress?.distrct +
                    " " +
                    orderData?.shippingAddress?.dists +
                    " " +
                    orderData?.shippingAddress?.province +
                    " " +
                    orderData?.shippingAddress?.postalcode}
                </p>
                <p>0628607353</p>
              </div>
            </div>
          </div>
          <div className="box-container-detail">
            <div className="back-payment" onClick={() => navigator("/CheckoutOrder")}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
              แก้ไขรายการสั่งชื้อ
            </div>
          </div>
        </div>
        <div className="box-rh">
          <div className="text-sellr">หนังสือจำหน่วยโดยผ่านแพลตฟอร์ม: CommicBook Novels </div>
          <div className="box-details">
              <div className="box-detail-order">
                <div className="box-img-cover">
                  <img
                    src={orderData?.DataChackOut?.cover_image?.cover_image_url || nocover}
                    alt=""
                  />
                </div>
                <div className="book-detail-nt">
                  <p>{orderData?.DataChackOut?.title}</p>
                  <p>{orderData?.DataChackOut?.typebookAndnovel}</p>
                  <div className="order-bat">
                    <p>จำนวน: {orderData?.DataChackOut?.qty}</p>
                    <p>{orderData?.DataChackOut?.price_of_free} บาท</p>
                  </div>
                </div>
              </div>
          </div>
          <div className="box-details">
            <div className="send-order-detail">
              <div className="item-list-detail">
                <p>หนังสือรวม:</p>
                <p>{ToTalBook?.qty} รายการ</p>
              </div>
              <div className="item-list-detail">
                <p>ค่าจัดส่งรวม:</p>
                <p>ไม่มีค่าจัดส่ง</p>
              </div>
              <div className="item-list-detail">
                <p className="font">รวม:</p>
                <p className="font">{orderData?.TotalPaice} บาท</p>
              </div>
            </div>
          </div>
          <div className="box-details-btn">
            {typePayment === "credit" ? 
               <button className="btn-pay" onClick={paymentHandler}>Pay now</button>
            :  <button disabled >Pay now</button>
            }
          </div>
        </div>
      </div>
     )}
    </>
  );
};

const PaymentCardit = ({ user, paymentHandler, orderData }) => {
  const [select, setSelect] = useState(1);
  return (
    <form onSubmit={paymentHandler}>
      <div className="box-container">
        <div className="col-c-dx">
          <div className="row-card-a-exd">
            <label className="block pb-2">Name On Card</label>
            <input
              required
              placeholder={orderData && orderData?.informationPayment?.name}
              className=""
              value={orderData && orderData?.informationPayment?.name}
            />
          </div>
          <div className="row-card-a-exd">
            <label className="block-bad">Exp Date</label>
            <CardExpiryElement
              className="exd"
              options={{
                style: {
                  base: {
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "#444",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "#6e6e6eee",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="col-nc-bad">
          <div className="row-card-a-exd">
            <label className="block pb-2">Card Number</label>
            <CardNumberElement
              className="exd"
              options={{
                style: {
                  base: {
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "#444",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "#6e6e6eee",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="row-card-a-exd">
            <label className="block-bad">CVC</label>
            <CardCvcElement
              className="exd"
              options={{
                style: {
                  base: {
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "#444",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "#6e6e6eee",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Payment;
