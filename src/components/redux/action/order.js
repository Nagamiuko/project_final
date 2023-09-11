import axios from "axios";
import config from '../../../config.json'

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${config.apiGetOrderUser}/${userId}`
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};
export const getOrdersOneOfUser = (orderid) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrdersOneUserRequest",
    });

    const { data } = await axios.get(`${config.apiGetOrderOneUser}/${orderid}`
    );

    dispatch({
      type: "getOrdersOneUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getOrdersOneUserFailed",
      payload: error.response.data.message,
    });
  }
};

export const getOrdersAllOfShop = (shopid) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrdersAllShopRequest",
    });

    const { data } = await axios.get(`${config.apiGetOrderAllShop}/${shopid}`
    );

    dispatch({
      type: "getOrdersAllShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getOrdersAllShopFailed",
      payload: error.response.data.message,
    });
  }
};

export const getOrdersBookAllOfShop = (bookid) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrdersBookAllShopRequest",
    });

    const { data } = await axios.get(`${config.apiGetOrderBookAllShop}/${bookid}`
    );

    dispatch({
      type: "getOrdersBookAllShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getOrdersBookAllShopFailed",
      payload: error.response.data.message,
    });
  }
};
export const getReceiptDetail = (receiptId) => async (dispatch) => {
  try {
    dispatch({
      type: "getReceiptDetailRequest",
    });

    const { data } = await axios.get(`${config.apiGetReceipt}/${receiptId}`
    );

    dispatch({
      type: "getReceiptDetailSuccess",
      payload: data.receiptDetail,
    });
  } catch (error) {
    dispatch({
      type: "getReceiptDetailFailed",
      payload: error.response.data.message,
    });
  }
};