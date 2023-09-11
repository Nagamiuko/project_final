import React, { useContext , useEffect ,useState} from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menufoot from "../components/Menufootbar/Menufoot";
import MenuR from "../components/Menufootbar/MenuR/MenuR";
import "./HomePage.css";
import View from "../components/PreviewToon/View";
import useFetchDataToonOne from "../components/hooks/BookOne";
import useFetchDataToonChapter from "../components/hooks/BookChapter";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/Context/AuthContext";
import useFetchDataCommentBooks from "../components/hooks/DataCommentBook";
import { useSelector } from "react-redux";
const ViewToon = () => {
  const { book_id } = useParams();
  const { user } = useContext(AuthContext);
  const { databookone } = useFetchDataToonOne(book_id);
  const { databookchapter } = useFetchDataToonChapter(book_id);
  const {dataCommentBook} = useFetchDataCommentBooks(book_id)
  const [click, setClick] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const Fovorite = () => {
     if ( wishlist.find((i) => i._id === databookone?._id)) {
       setClick(true);
     }else{
       setClick(false)
     }
   }
   Fovorite()
 },[wishlist,databookone]);
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="container">
          <View
            DataToonChapter={databookchapter}
            DatatoonD={databookone}
            DataComment={dataCommentBook}
            userID={user}
            setClick={setClick}
            click = {click}
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

export default ViewToon;
