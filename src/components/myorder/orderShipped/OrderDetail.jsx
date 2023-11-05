import React, { useContext, useEffect } from "react";
import "./orderdetail.css";
import MenuOr from "../menuOrder/MenuOrder";
import { AuthContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/action/order";
import moment from "moment-timezone";
import StatusPayment from "../stepStatus/StatusPayment";
import { useNavigate } from "react-router-dom";
const OrderDetail = () => {
  const { user } = useContext(AuthContext);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  console.log("Data:", orders);
  return (
    <>
      <div className="box-container-order">
        <div className="title-order">การสั่งชื้อของฉัน</div>
        <div className="border-line-bar"></div>
        <div className="box-contant-order">
          <MenuOr />
        </div>
        <div className="box-contant-order">
          {orders?.map((data, keys) => (
            <div className="order-detail-bine" key={keys}>
              <div className="haed-order-detail">
                <div className="number-order">
                  <label>หมายเลขสั่งชื้อ #</label>
                  <p>{data?._id?.slice(0, 8)}</p>
                </div>
                <div className="date-order">
                  <label>DATE</label>
                  <p>
                    {moment(data?.createdAt).format(
                      "YYYY / MMM / DD  h:mm:ss A"
                    )}{" "}
                  </p>
                </div>
                <div className="total-order"></div>
                <div className="btn-detail">
                  <button onClick={() => navigator(`/receipt/${data?._id}`)}>
                    รายละเอียด
                  </button>
                </div>
              </div>
              <div className="border-line-bar"></div>
              <div className="list-order-detail">
                <div className="data-order">
                  <label>จำนวน</label>
                  <p>{data?.cart?.qty}</p>
                </div>
                <div className="detail-order-book">
                  <label>หนังสือ</label>
                  <p>{data?.cart?.title} (อีบุ๊ค) x 1 </p>
                </div>
                <div className="total-book">
                  <label>Total</label>
                  <p>{data?.cart?.price_of_free + " THB"}</p>
                </div>
              </div>
              <div className="border-line-bar"></div>
              <div className="foodbar-status-send">
                <div className="status-bar">
                  {data && data?.paymentInfo?.status === "succeeded" ? (
                    <StatusPayment active={"succeeded"} />
                  ) : (
                    <StatusPayment active={"Incomplete"} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
