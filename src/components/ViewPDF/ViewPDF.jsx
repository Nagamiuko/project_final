import React, { useContext, useEffect } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductBook } from "../redux/action/productBook";
import { getOrdersOneOfUser } from "../redux/action/order";
import { AuthContext } from "../Context/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/icon/AnimationNoData.json";
import "./pdf.css";
const ViewPDF = () => {
  const [bookpdf] = useSearchParams();
  const bookpdfid = bookpdf.get("bookpdf");
  const statusid = bookpdf.get("Status");
  const { bookonepayment, isLoading } = useSelector(
    (state) => state.productBook
  );
  const { orderone } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    dispatch(getOneProductBook(bookpdfid));
    dispatch(getOrdersOneOfUser(statusid));
  }, [dispatch, bookpdfid, statusid]);
  let UrlNoFIle =
    "https://res.cloudinary.com/dz4xrddoy/image/upload/v1698134137/NoFile/z6mmgokrwdhb11tjknm5.pdf";
  if (user?._id === orderone?.user?._id) {
    try {
      if (orderone?.paymentInfo?.status === "succeeded") {
        return (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="book-pdf">
              <Viewer
                fileUrl={bookonepayment.book_pdf.book_pdf_full || UrlNoFIle}
              />
            </div>
          </Worker>
        );
      } else {
        return <p>No Payments</p>;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return (
      <div className="box-container-no-payment">
        <div className="box-alert">
          <Lottie animationData={animationData} loop={true} autoPlay={true} />
          <h4>คุณไม่มีสิทธิ์เข้าถึงไฟล์นี้ !</h4>
          <div>
            <Link>กลับหน้าหลัก</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewPDF;
