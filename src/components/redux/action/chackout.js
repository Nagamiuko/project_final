// add to cart product
export const addToChackout = (data) => async (dispatch, getState) => {
   dispatch({
     type: "addToChackout",
     payload: data,
   });
 
   localStorage.setItem("ItemsChackout", JSON.stringify(getState().cart.cart));
   return data;
 };
 
 // remove from cart
 
 export const removeFromCart = (data) => async (dispatch, getState) => {
   dispatch({
     type: "removeFromChackout",
     payload: data._id,
   });
   localStorage.setItem("ItemsChackout", JSON.stringify(getState().cart.cart));
   return data;
 };
 