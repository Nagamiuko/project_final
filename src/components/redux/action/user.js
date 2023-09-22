import axios from "axios";
import config from '../../../config.json'

// get all orders of user
export const getWithdramAllOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getWithdramAllUserRequest",
    });

    const { data } = await axios.get(
      `${config.apiUserAllWithdram}/${userId}`
    );

    dispatch({
      type: "getWithdramAllUserSuccess",
      payload: data.userWithdram,
    });
  } catch (error) {
    dispatch({
      type: "getWithdramAllUserFailed",
      payload: error.response.data.message,
    });
  }
};
export const getCreditOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getCreditUserRequest",
    });

    const { data } = await axios.get(
      `${config.apigetUser}/${userId}`
    );

    dispatch({
      type: "getCreditUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "getCreditUserFailed",
      payload: error.response.data.message,
    });
  }
};