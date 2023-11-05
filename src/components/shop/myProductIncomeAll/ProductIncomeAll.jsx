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
import { getCreditOfUser, getWithdramAllOfUser } from "../../redux/action/user";
import { toast } from "react-toastify";
const ProductIncomeAll = () => {
  const navigator = useNavigate();
  const [openWihdraw, setOpenWihraw] = useState(false);
  const { user } = useContext(AuthContext);
  const [dataprice, setDataPrice] = useState(null);
  const { orderoneshop } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);
  const { userWithdram } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [monney, setMonney] = useState(users && users.credit);
  const [monney_total, setMonneyTaotal] = useState(0);

  const totalsell =
    dataprice && dataprice.reduce((acc, item) => acc + item, 0);
  const totalPriceBook =
    dataprice && dataprice.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalWithCredit =
    userWithdram && userWithdram.reduce((ac, item) => ac + item.moneyTotal, 0);
  const serviceCharge = totalPriceBook * 0.1;
  const total = totalPriceBook - serviceCharge.toFixed(2);
  let availablePrice = total - totalWithCredit;
  console.log(totalsell);
  useEffect(() => {
    dispatch(getOrdersAllOfShop(user._id));
    dispatch(getCreditOfUser(user._id));
    dispatch(getWithdramAllOfUser(user._id));
    const orderData =
      orderoneshop &&
      orderoneshop.filter((item) => item.status === "Delivered");
    setDataPrice(orderData);
  }, [dispatch, user._id]);
  

  const UpdateCredit = async (totalPrice, total) => {
    try {
      if (totalPrice > 0) {
        await axios.put(`${config.apiUserUpdateCredit}/${user._id}`, {
          availablePrice: totalPrice,
          totalMonneyShop: total,
          sellbook: orderoneshop?.length,
        });
      } else {
        console.log(totalPrice);
        toast.error(
          `คุณมีจำนวนเงินไม่เพียงพอให้สรุปยอด เงินที่เหลืออยู่:${totalPrice} THB`
        );
      }
      console.log(totalPrice, total);
    } catch (err) {
      console.log(err);
    }
  };

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
                <Table sx={{ minWidth: 670 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell">
                        หมายเลขสั่งชื้อ #
                      </TableCell>
                      <TableCell className="tableCell">รายการ</TableCell>
                      <TableCell className="tableCell">จำนวน</TableCell>
                      <TableCell className="tableCell">ราคา</TableCell>
                      <TableCell className="tableCell">สถานะชำระ</TableCell>
                      <TableCell className="tableCell">วันที่</TableCell>
                      <TableCell className="tableCell">สรุปรายการ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderoneshop?.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell className="tableCell">{row._id}</TableCell>
                        <TableCell className="tableCell">
                          {row?.cart?.title}
                        </TableCell>
                        <TableCell className="tableCell">
                          {row?.cart?.qty}
                        </TableCell>
                        <TableCell className="tableCell">
                          {row?.totalPrice}
                        </TableCell>
                        <TableCell className="tableCell">
                          <span className={`status succeeded`}>
                            {row?.paymentInfo?.status}
                          </span>
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
                      หลักจากหักค่าทำเนียบแล้วรายได้รวมของร้านค้า ยอดคงเหลือ :{" "}
                      {total || (
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
                    {monney === 0 ? (
                      <p>
                        หลักจากหักค่าทำเนียบแล้ว ยอดคงเหลือ : โปรดสรุปยอดก่อน
                      </p>
                    ) : (
                      <p>
                        รายได้ที่สามารถถอนได้จริง คงเหลือ :{" "}
                        {users?.credit === 0 ? (
                          <> 0 THB</>
                        ) : (
                          `${users?.credit} THB`
                        )}
                      </p>
                    )}
                    {monney === 0 ? (
                      <p>ยอดเงินที่สามารถถอนได้ คงเหลือ : โปรดสรุปยอดก่อน</p>
                    ) : (
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
                    )}
                  </div>
                  <div className="wi-out">
                    <button
                      className="button"
                      onClick={() =>
                        setMonney(1) || UpdateCredit(availablePrice, total)
                      }
                    >
                      สรุปยอด
                    </button>
                    {users?.credit === 0 ? (
                      <button disabled onClick={setOpenWihraw.bind(this, true)}>
                        แจ้งถอน
                      </button>
                    ) : (
                      <button
                        className="button"
                        onClick={setOpenWihraw.bind(this, true)}
                      >
                        แจ้งถอน
                      </button>
                    )}
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
