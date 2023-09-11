import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menufoot from "../components/Menufootbar/Menufoot";
import MenuR from "../components/Menufootbar/MenuR/MenuR";
import "./HomePage.css";
import useFetchDataToonOne from "../components/hooks/BookOne";
import useFetchDataToonChapter from "../components/hooks/BookChapter";
import { useParams } from "react-router-dom";
import AddCBook from "../components/CreateBAN/AddChBook/AddCBook";
import useFetchDataCommentBooks from "../components/hooks/DataCommentBook";
import { AuthContext } from "../components/Context/AuthContext";

const AddChBook = () => {
  const { bookid } = useParams();
  const { databookone } = useFetchDataToonOne(bookid);
  const { databookchapter } = useFetchDataToonChapter(bookid);
  const { dataCommentBook } = useFetchDataCommentBooks(bookid);
  const {user} = useContext(AuthContext)
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="container">
          <AddCBook
            DataToon={databookchapter}
            DatatoonD={databookone}
            DataCment={dataCommentBook}
            userID={user}
          />
        </div>
      </section>
      <div className="menu-b-r-ao">
        <div className="menu-as">
          <MenuR />
        </div>
      </div>
      <div className="menu-foot">
        <Menufoot />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AddChBook;
