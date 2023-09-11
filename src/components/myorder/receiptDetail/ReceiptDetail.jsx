import React, { useContext, useEffect, useRef } from "react";
import "./Receiptdetail.css";
import MenuOr from "../menuOrder/MenuOrder";
import { AuthContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import StatusPayment from "../stepStatus/StatusPayment";
import { useNavigate, useParams } from "react-router-dom";
import { getReceiptDetail } from "../../redux/action/order";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
const ReceiptDetail = () => {
  const { user } = useContext(AuthContext);
  const { receiptId } = useParams();
  const { receiptDetail } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  console.log(receiptId);

  const components = useRef();

  const handPrint = useReactToPrint({
    content: () => components.current,
    documentTitle: `ข้อมูลใบแจ้งหนี้/ใบเสร็จรับเงิน ${receiptId} | CommicBook Novels`,
    pageStyle: "print",
  });
  
  useEffect(() => {
    dispatch(getReceiptDetail(receiptId));
  }, [dispatch, receiptId]);

  console.log("Data:", receiptDetail?.cart?.title);
  return (
    <>
      <div className="box-container-receipt">
        <div className="title-receipt">
          <p
            onClick={() => navigator("/orders/shipped")}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faAnglesLeft} /> ดูรายการสั่งซื้อทั้งหมด
          </p>
          <div className="btn-print">
            <button onClick={handPrint}>PRINT</button>
          </div>
        </div>
        <div className="border-line-bar"></div>
        <div className="content-print" ref={components}>
          <div className="box-contant-receipt">
            <div className="print">
              <h2>RECEIPT</h2>
            </div>
          </div>
          <div className="box-contant-receipt">
            <div className="detail-bine">
              <div className="haed-order-detail">
                <div className="number-order">
                  <label>หมายเลขสั่งชื้อ #</label>
                  <p>{receiptDetail?._id?.slice(0, 8)}</p>
                </div>
                <div className="date-order">
                  <label>DATE</label>
                  <p>
                    {moment(receiptDetail?.paidAt).format(
                      "YYYY/MMM/DD - h:mm:ss A"
                    )}{" "}
                  </p>
                </div>
                <div className="date-order">
                  <label>TRANSACTION DATE</label>
                  <p>
                    {moment(receiptDetail?.createdAt).format(
                      "YYYY/MMM/DD - h:mm:ss A"
                    )}{" "}
                  </p>
                </div>
                <div className="total-order">
                  <label>STATUS</label>
                  <p>
                    {receiptDetail?.paymentInfo?.status === "succeeded"
                      ? "ชำระแล้ว"
                      : "ยังไม่ชำระ"}
                  </p>
                </div>
                <div className="total-order">
                  <label>TOTAL</label>
                  <p>{receiptDetail?.totalPrice} บาท</p>
                </div>
              </div>
              <div className="border-line-bar"></div>
              <div className="list-receipt-detail">
                <div className="detail-order-book">
                  <div className="row-list">
                    <label>สรุปรายการ</label>
                    <p>ยอดรวม</p>
                    <p>ค่าจัดส่ง</p>
                    <p></p>
                    <p>รวมยอดทั้งหมด</p>
                  </div>
                  <div className="row-list">
                    <label>-</label>
                    <p>{receiptDetail?.totalPrice} บาท</p>
                    <p>{`0`} บาท</p>
                    <p>{receiptDetail?.totalPrice} บาท</p>
                  </div>
                </div>
              </div>
              <div className="border-line-bar"></div>
              <div className="list-receipt-detail flex-start">
                <div className="detail-order-book">
                  <div>
                    <label>ข้อมูลการชำระเงิน</label>
                    <p>{receiptDetail?.paymentInfo?.type}</p>
                  </div>
                </div>
              </div>
              <div className="border-line-bar"></div>
              <div className="list-receipt-detail flex-between">
                <div className="w-j-b-80">
                  <label>รายการ</label>
                  <p>{receiptDetail?.cart?.title}</p>
                  <p>ค่าจัดส่ง [{`ไม่มีค่าจัดส่ง`}]</p>
                </div>
                <div className="w-j-b row-list">
                  <label>จำนวน</label>
                  <p>{receiptDetail?.cart?.qty}</p>
                </div>
                <div className="w-j-b row-list">
                  <label>ราคา/หน่วย</label>
                  <p>{receiptDetail?.totalPrice} บาท</p>
                  <p>{`0`} บาท</p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-contant-receipt">
            <div className="print">
              <h3>ขอบคุณที่ช้อปปิ้งกับ CommicBook Novels</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptDetail;
