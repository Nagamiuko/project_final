import axios from "axios";
import config from '../../../config.json'

export const getOneProductBook = (bookid) => async (dispatch) => {
   try {
     dispatch({
       type: "getOneProductsBookRequest",
     });
 
     const { data } = await axios.post(`${config.apidatatoonone}/${bookid}`);
     dispatch({
       type: "getOneProductsBookSuccess",
       payload: data,
     });
   } catch (error) {
     dispatch({
       type: "getOneProductsBookFailed",
       payload: error.response.data.message,
     });
   }
 };