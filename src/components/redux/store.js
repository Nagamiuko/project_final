import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cart'
import { wishlistReducer } from './reducers/wishlist'
import { orderReducer } from './reducers/order'
import { productBookReducer } from './reducers/productBook'
import { getUserDetail } from './reducers/user'
const Store = configureStore({
   reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      order: orderReducer,
      productBook : productBookReducer,
      user:getUserDetail
   }
})

export default Store