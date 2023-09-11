import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faComments,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import useFetchDataToonOne from "../../hooks/BookOne";
import useFetchDataCommentBooks from "../../hooks/DataCommentBook";
import "./productshop.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersBookAllOfShop,
  getOrdersAllOfShop,
} from "../../redux/action/order";
import Charts from "../chart/Charts";
import moment from "moment-timezone";
import BarCharts from "../barChart/BarCharts";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const ProductMonney = () => {
  const navigator = useNavigate();
  const [bookid] = useSearchParams();
  const dataid = bookid.get("Book");
  const shopid = bookid.get("ShopId");
  const [data, setData] = useState([]);
  const [datacomment, setDataCmt] = useState([]);
  const { databookone } = useFetchDataToonOne(dataid);
  const { dataCommentBook } = useFetchDataCommentBooks(dataid);
  const { orderbookoneshop } = useSelector((state) => state.order);
  const { orderoneshop } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    setData(databookone);
    setDataCmt(dataCommentBook);
    dispatch(getOrdersBookAllOfShop(dataid));
    dispatch(getOrdersAllOfShop(shopid));
  }, [dispatch , databookone , dataid , shopid ]);

  const row = [];
  orderbookoneshop &&
  orderbookoneshop.forEach((item) => {
      row.push({
        qty: item.cart.qty,
        Total: item.totalPrice,
        date: moment(item.createdAt).format("YY MMM,DD"),
      });
    });

  const columns = [
    { field: "id", headerName: "หมายเลขสั่งชื้อ #", width: 250 },
    {
      field: "status",
      headerName: "จัดส่งสำเร็จ",
      width: 200,
      editable: true,
    },
    {
      field: "qty",
      headerName: "จำนวน",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "วันเวลา",
      width: 120,
      editable: true,
    },
    {
      field: "total",
      headerName: "ราคา",
      width: 100,
      editable: true,
    },
    {
      field: " ",
      minWidth: 100,
      headerName: "Detail",
      type: "number",
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/detail-or-shop/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const rows = [];
  orderbookoneshop &&
  orderbookoneshop.forEach((item) => {
      rows.push({
        id: item._id,
        qty: item.cart.qty,
        status: item.status,
        total: item.totalPrice+" THB",
        date: moment(item.createdAt).format("YY MMM,DD")
      });
    });
  return (
    <>
      <div className="box-container-book-shop">
        <div className="title-bar">
          <div onClick={() => navigator("/MyBooks")} className="back">
            <FontAwesomeIcon icon={faCircleArrowLeft} /> Back
          </div>
        </div>
        <div className="flex-row">
          <div className="box-content-lr-book-detail">
            <div className="box-img">
              <img src={data?.cover_image?.cover_image_url} alt="" />
            </div>
            <div className="title-name-book-shop">{data?.title}</div>
            <div className="box-list-c-p">
              <p>
                <FontAwesomeIcon icon={faComments} /> {datacomment?.length}{" "}
                ความคิดเห็น
              </p>
              <p>
                <FontAwesomeIcon icon={faHandHoldingDollar} />{" "}
                {orderbookoneshop?.length} รายการ
              </p>
            </div>
          </div>
          <div className="box-rl-book-shop">
            <div className="title-menu-shop">Charts Books All Of Shop</div>
            <div className="flex-row-chart">
              <div className="box-charts-b">
                <Charts
                  aspect={2 / 1}
                  title={"ยอดขายทั้งหมดของเล่ม"}
                  data={row}
                  qty={orderbookoneshop?.length}
                />
              </div>
              <div className="box-charts-b">
                <BarCharts data={row} />
              </div>
            </div>
            <div className="table-order-shop">
              <Box sx={{ height: 370, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMonney;
