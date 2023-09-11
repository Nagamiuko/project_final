import React, { useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReceiptDetail } from "../../redux/action/order";
import moment from "moment-timezone";
const DetailOr = () => {
  const { orId } = useParams();
  const { receiptDetail } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReceiptDetail(orId));
  }, [dispatch, orId]);
  console.log(receiptDetail);
  return (
    <div className="container-datail-or">
      <div className="col-or">
        <div className="row-detail-or">
          <div className="title-logo-or">
            <div className="box-image-detail-or">
              <img
                src="https://res.cloudinary.com/dz4xrddoy/image/upload/v1694258055/Screenshot_2566-09-09_at_18.11.11_aedfvb.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="row-detail-or">
          <div className="detail-title-or">
            <h3>ขอบคุณที่ช้อปปิ้งกับ</h3>
            <p>ComicBook Novels</p>
          </div>
        </div>
        <div className="row-detail-or">
          <div className="detail-or">
            <h3>
              เราได้รับคำสั่งซื้อหมายเลข {receiptDetail?._id} จากคุณแล้ว
              ทางเราจะแจ้งร้านค้าให้จัดส่งสินค้าให้กับคุณโดยเร็วที่สุด
            </h3>
          </div>
        </div>
        <div className="border "></div>
        <div className="row-detail-or">
          <div className="detail-or">
            <h3>รายการสั่งชื้อ</h3>
            <div className="detail-order-or mt-15">
              <p>รหัสสั่งชื้อ# {receiptDetail?._id}</p>
              <p>ขายโดย: {receiptDetail?.cart?.mangauser?.namedisplay}</p>
            </div>
            <div className="mt-15 detail-order-or">
              <p>{receiptDetail?.cart?.title} (อีบุ๊ค) x 1</p>
              <p>{receiptDetail?.cart?.price_of_free} บาท</p>
            </div>
            <div className="detail-order-or mt-15">
              <p>การจัดส่ง [ไม่มีค่าจัดส่ง]</p>
              <p>0.00 บาท</p>
            </div>
            <div className="detail-order-or mt-15">
              <p>รวม</p>
              <p>{receiptDetail?.totalPrice} บาท</p>
            </div>
            <div className="detail-order-or mt-25">
              <p>รวมทั้งหมด</p>
              <p>{receiptDetail?.totalPrice} บาท</p>
            </div>
          </div>
        </div>
        <div className="border"></div>
        <div className="row-detail-or">
          <div className="detail-or">
            <h3>รายละเอียดการชำระเงิน</h3>
            <div className="col-flex-cols">
              <p>{receiptDetail?.paymentInfo?.type}</p>
              <p>
                {moment(receiptDetail?.paidAt).format(
                  "YYYY/MMM/DD - h:mm:ss A"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOr;
