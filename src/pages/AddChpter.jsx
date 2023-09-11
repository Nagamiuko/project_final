import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menufoot from "../components/Menufootbar/Menufoot";
import MenuR from "../components/Menufootbar/MenuR/MenuR";
import "./HomePage.css";
import { useParams } from "react-router-dom";
import AddCh from "../components/CreateBAN/AddChpter/AddCh";
import useFetchDataToonOne from "../components/hooks/BookOne";
import useFetchDataToonChapter from "../components/hooks/BookChapter";
const AddChpter = () => {
  const { bookid } = useParams();
  const { databookone, loadings } = useFetchDataToonOne(bookid);
  const { databookchapter, setDataChapter } = useFetchDataToonChapter(bookid);
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="container">
          <AddCh
            DataToonChapter={databookchapter}
            DatatoonD={databookone}
            Loadings={loadings}
            setDataChapter ={setDataChapter}
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

export default AddChpter;
