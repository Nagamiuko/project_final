import React, { useContext } from "react";
import "./add.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addTocart } from "../../redux/action/cart";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
const CartAdd = ({ setOpenCart, dataID }) => {
  const navigator = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext)
  const addToCartHandler = (id) => {
     if(user === null){
        Swal.fire({
          icon: "warning",
          title: "โปรดทำการล็อกอินเข้าสู่ระบบ",
          text: "ถึงจะสามารถเพิ่มสินค้าของคุณได้ขอบคุณ",
          showConfirmButton: false,
          timer: 2500,
        });
     }else{
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
          toast.error("Item already in cart !");
        } else {
          const cartData = {...dataID, qty: 1 };
          dispatch(addTocart(cartData));
          toast.success("เพิ่มรายการลงในรถเข็นเรียบร้อยแล้ว!");
        }
   }
  };
  return (
    <>
      <div className="box-bg" onClick={setOpenCart.bind(this, false)}>
        <div className="container-box" onClick={(e) => e.stopPropagation()}>
          <button className="close-c" onClick={setOpenCart.bind(this, false)}>
            <span>X</span>
          </button>
          <div className="btn-sellr" onClick={setOpenCart.bind(this, false)}>
            <button onClick={() => addToCartHandler(dataID?._id)}>
              เพิ่มหนังสือลงตะกร้าของฉัน
            </button>
          </div>
          <div className="btn-sellr ">
            <button onClick={setOpenCart.bind(this, false)}>
              เลือกชื้อหนังสือต่อ
            </button>
          </div>
          <div className="line-b mt-2"></div>
          <div className="btn-sellr mt-2">
            <button onClick={() => navigator("/Carts")}>ชำระเงิน</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartAdd;
