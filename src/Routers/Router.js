import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ViewToon from "../pages/ViewToon";
import ReadToon from "../pages/ReadToon";
import CreateAccount from "../pages/CreateAccount";
import EditProfile from "../pages/EditProfile";
import EditPassword from "../pages/EditPassword";
import EditAddress from "../pages/EditAddress";
import { AuthContext } from "../components/Context/AuthContext";
import UserNull from "./NotUser/UserNull";
import CreateBook from "../pages/CreateBook";
import CreateNovel from "../pages/CreateNovel";
import MyBooks from "../pages/MyBooks";
import AddChBook from "../pages/AddChBook";
import AddChpter from "../pages/AddChpter";
import SearchT from "../pages/SearchT";
import UpdataBooks from "../pages/UpdataBook";
import UpChapter from "../pages/UpdataChpter";
import Cartoon from "../pages/Cartoon";
import Novels from "../pages/Novels";
import CartPage from "../pages/CartPage";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Line from "../pages/Line";
import PaymentPage from "../pages/PaymentPage";
import axios from "axios";
import config from "../config.json";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContextProvider } from "../components/Context/AuthContext";
import OrderSuccessfully from "../pages/OrderSuccessfully";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrderWhaitPaymentPage from "../pages/OrderWaitPayment";
import OrderShippingPage from "../pages/OrderShipping";
import OrderPreparingPage from "../pages/OrderPreparing";
import Collec from "../pages/Collec";
import ViewPDFPage from "../pages/ViewPDFPage";
import ProductShop from "../pages/ProductShop";
import ProductIncomeShop from "../pages/ProductIncomeShop";
import ReceiptPage from "../pages/ReceiptPage";
import ReceiptListShopPage from "../pages/ReceiptListShopPage";
import DetailOrPage from "../pages/DetailOrPage";
const Router = () => {
  const { user } = useContext(AuthContext);
  const [stripeapikey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(config.stripeApiKey);
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey();
  }, []);
  return (
    <BrowserRouter>
      {stripeapikey && (
        <Elements stripe={loadStripe(stripeapikey)}>
          <Routes>
            <Route path="/payment" element={user !== null ? <PaymentPage /> : <UserNull/>} />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route
          path="/my-account/user"
          element={user !== null ? <EditProfile /> : <UserNull />}
        />
        <Route
          path="/my-account/security"
          element={user !== null ? <EditPassword /> : <UserNull />}
        />
        <Route
          path="/my-account/addresses"
          element={user !== null ? <EditAddress /> : <UserNull />}
        />
        <Route
          path="/AddCartoon"
          element={user !== null ? <CreateBook /> : <UserNull />}
        />
        <Route
          path="/UpdataCartoon/:bookid"
          element={user !== null ? <UpdataBooks /> : <UserNull />}
        />
        <Route
          path="/UpdataChapter/:chapteid/book/:bookid"
          element={user !== null ? <UpChapter /> : <UserNull />}
        />
        <Route
          path="/AddNovel"
          element={user !== null ? <CreateNovel /> : <UserNull />}
        />
        <Route
          path="/MyBooks"
          element={user !== null ? <MyBooks /> : <UserNull />}
        />
        <Route
          path="/MyFavorite"
          element={user !== null ? <Wishlist /> : <UserNull />}
        />
        <Route
          path="/PreviewBook/:bookid"
          element={user !== null ? <AddChBook /> : <UserNull />}
        />
        <Route
          path="/AddtoonEP/:bookid"
          element={user !== null ? <AddChpter /> : <UserNull />}
        />
        <Route
          path="/Carts"
          element={user !== null ? <CartPage /> : <UserNull />}
        />
        <Route
          path="/CheckoutOrder"
          element={user !== null ? <Checkout /> : <UserNull />}
        />
        <Route
          path="/order-success"
          element={user !== null ? <OrderSuccessfully /> : <UserNull />}
        />
        <Route
          path="/orders/shipped"
          element={user !== null ? <OrderDetailPage /> : <UserNull />}
        />
        <Route
          path="/orders/waitpayment"
          element={user !== null ? <OrderWhaitPaymentPage /> : <UserNull />}
        />
        <Route
          path="/orders/shipping"
          element={user !== null ? <OrderShippingPage/> : <UserNull />}
        />
        <Route
          path="/orders/preparing"
          element={user !== null ? <OrderPreparingPage /> : <UserNull />}
        />
        <Route
          path="/bookshelf"
          element={user !== null ? <Collec /> : <UserNull />}
        />
        <Route
          path="/view"
          element={user !== null ? <ViewPDFPage /> : <UserNull />}
        />
        <Route
          path="/bookstand"
          element={user !== null ? <ProductShop/> : <UserNull />}
        />
        <Route
          path="/my/shopincome"
          element={user !== null ? <ProductIncomeShop /> : <UserNull />}
        />
        <Route
          path="/receipt/:receiptId"
          element={user !== null ? <ReceiptPage /> : <UserNull />}
        />
        <Route
          path="/receipt-shop/:shopId"
          element={user !== null ? <ReceiptListShopPage /> : <UserNull />}
        />
        <Route
          path="/detail-or-shop/:orId"
          element={user !== null ? <DetailOrPage /> : <UserNull />}
        />

        <Route index element={<HomePage />} />
        <Route path="/Search" element={<SearchT />} />
        <Route path="/my-create/account" element={<CreateAccount />} />
        <Route path="/ViewChapter/:chapterid/:bookid" element={<ReadToon />} />
        <Route path="/ViewToon/:book_id" element={<ViewToon />} />
        <Route path="/CarToon" element={<Cartoon />} />
        <Route path="/Novels" element={<Novels />} />
        <Route path="/line" element={<Line />} />
        {/* <Route path="/*" element={<UserNull />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
