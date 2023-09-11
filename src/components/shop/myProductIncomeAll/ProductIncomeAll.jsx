import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./productshop.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAllOfShop } from "../../redux/action/order";
import Charts from "../chart/Charts";
import moment from "moment-timezone";
import BarCharts from "../barChart/BarCharts";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuLeft from "../../mycollection/menuLeft/MenuLeft";
import { AuthContext } from "../../Context/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import Withdraw from "../withdraw/Withdraw";
import axios from "axios";
import config from "../../../config.json";
import { getCreditOfUser } from "../../redux/action/user";


const ProductIncomeAll = () => {
  const navigator = useNavigate();
  const [openWihdraw, setOpenWihraw] = useState(false);
  const { user } = useContext(AuthContext);
  const [dataprice, setDataPrice] = useState(null);
  const { orderoneshop } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const totalPriceBook =
    dataprice && dataprice.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalPriceBook * 0.1;
  const availablePrice = totalPriceBook - serviceCharge.toFixed(2);

  useEffect(() => {
    dispatch(getOrdersAllOfShop(user._id));
    dispatch(getCreditOfUser(user._id))
    const orderData =
      orderoneshop &&
      orderoneshop.filter((item) => item.status === "Delivered");
    setDataPrice(orderData);
    const UpdateCredit = async () => {
      try {
        await axios.put(`${config.apiUserUpdateCredit}/${user._id}`, {
          availablePrice: availablePrice,
        });
      } catch (err) {
        console.log(err);
      }
    };
    UpdateCredit();
  }, [dispatch, user._id,availablePrice]);


  console.log(users);
  const row = [];
  orderoneshop &&
    orderoneshop.forEach((item) => {
      row.push({
        qty: item.cart.qty,
        Total: item.totalPrice,
        date: moment(item.createdAt).format("DD ,MMM YY"),
      });
    });

  return (
    <>
      {openWihdraw && (
        <Withdraw
          setOpenWihraw={setOpenWihraw}
          user={user}
          totalPrice={users?.credit}
        />
      )}
      <div className="box-container-book-shop">
        <div className="flex-row">
          <div className="box-content-lr-book-detail">
            <MenuLeft />
          </div>
          <div className="box-rl-book-shop">
            <div className="title-menu-shop">Charts Books All Of Shop</div>
            <div className="flex-row-chart">
              <div className="box-charts-b">
                <Charts
                  aspect={2 / 1}
                  title={"ยอดขายรวมของร้านค้า"}
                  data={row}
                  qty={orderoneshop?.length}
                />
              </div>
              <div className="box-charts-b">
                <BarCharts data={row} />
              </div>
            </div>
            <div className="table-order-shop">
              <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell">
                        หมายเลขสั่งชื้อ #
                      </TableCell>
                      <TableCell className="tableCell">สภานะชำระเงิน</TableCell>
                      <TableCell className="tableCell">จำนวน</TableCell>
                      <TableCell className="tableCell">ราคา</TableCell>
                      <TableCell className="tableCell">วันที่</TableCell>
                      <TableCell className="tableCell">สรุปรายการ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderoneshop?.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell className="tableCell">{row._id}</TableCell>
                        <TableCell className="tableCell">
                          <span className={`status succeeded`}>
                            {row?.paymentInfo?.status}
                          </span>
                        </TableCell>
                        <TableCell className="tableCell">
                          {row?.cart?.qty}
                        </TableCell>
                        <TableCell className="tableCell">
                          {row?.cart?.price_of_free}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(row?.updatedAt).format("DD ,MMM ,YYYY")}
                        </TableCell>
                        <TableCell className="tableCell">
                          <Link to={`/receipt-shop/${row?.cart?.shopId}`}>
                            <Button>
                              <FontAwesomeIcon
                                icon={faChartLine}
                                style={{ fontSize: 20 }}
                              />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="totalprice-all-shop">
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
                      {users?.credit || (
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
                      ยอดเงินที่สามารถถอนได้ คงเหลือ :{" "}
                      {users?.credit || (
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
                  <div className="wi-out">
                    <button onClick={setOpenWihraw.bind(this, true)}>
                      แจ้งถอน
                    </button>
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
      </div>
    </>
  );
};

export default ProductIncomeAll;
