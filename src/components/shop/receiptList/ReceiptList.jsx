import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAllOfShop } from "../../redux/action/order";
import moment from "moment-timezone";
import { RotatingLines } from "react-loader-spinner";
const ReceiptList = () => {
  const navigator = useNavigate();
  const { shopId } = useParams();
  const { orderoneshop } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [dataprice, setDataPrice] = useState(null);

  useEffect(() => {
    dispatch(getOrdersAllOfShop(shopId));
    const orderData =
      orderoneshop &&
      orderoneshop.filter((item) => item.status === "Delivered");
      setDataPrice(orderData);
  }, [dispatch, shopId]);

  const components = useRef();
  const handPrint = useReactToPrint({
    content: () => components.current,
    documentTitle: `ข้อมูลรายงานการชื้อขายทั้งหมด | CommicBook Novels`,
    pageStyle: "print",
  });
  const totalPriceBook =
    dataprice && dataprice.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalPriceBook * 0.1;
  const availablePrice = totalPriceBook - serviceCharge.toFixed(2);
  const row = [];
  orderoneshop &&
    orderoneshop.forEach((item) => {
      row.push({
        id: item._id,
        qty: item.cart.qty,
        title: item.cart.title,
        total: item.totalPrice + " THB",
        date: moment(item.paidAt).format("YY MMM,DD - h:mm:ss A"),
      });
    });
  const columns = [
    { field: "id", headerName: "หมายเลขสั่งชื้อ #", width: 220 },
    {
      field: "title",
      headerName: "รายการ",
      width: 200,
      editable: true,
    },
    {
      field: "qty",
      headerName: "จำนวน",
      width: 100,
      editable: true,
    },
    {
      field: "date",
      headerName: "วันเวลา",
      width: 200,
      editable: true,
    },
    {
      field: "total",
      headerName: "ราคา",
      width: 100,
      editable: true,
    },
  ];
  return (
    <>
      <div className="box-container-receipt">
        <div className="title-receipt">
          <p
            onClick={() => navigator("/my/shopincome")}
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
            <Box sx={{ height: "auto", width: "100%", marginBottom: "5rem" }}>
              <DataGrid
                rows={row}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            </Box>
            </div>
          <div className="box-contant-receipt">
              <label>สรุปยอดขาย</label>
          </div>
          <div className="box-contant-receipt">
            {totalPriceBook !== 0 ? (
               <>
                <div className="detail-monney">
                  <p>
                    รายได้รวมของร้านค้า ( ยังไม่หักค่าทำเนียม ) คงเหลือ :{" "}
                    {totalPriceBook || (
                       <RotatingLines
                       strokeColor="grey"
                       strokeWidth="5"
                       animationDuration="0.75"
                       width="11"
                       visible={true}
                       />
                       )}{" "}
                    THB
                  </p>
                  <p>
                    หลักจากหักค่าทำเนียบแล้ว รายได้รวมของร้านค้า คงเหลือ :{" "}
                    {availablePrice || (
                       <RotatingLines
                       strokeColor="grey"
                       strokeWidth="5"
                       animationDuration="0.75"
                       width="11"
                       visible={true}
                       />
                       )}{" "}
                    THB
                  </p>
                </div>
              </>
            ) : (
               <>
                <div className="detail-monney">
                  <p>ไม่มีรายการ</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptList;
