import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menufoot from "../components/Menufootbar/Menufoot";
import MenuR from "../components/Menufootbar/MenuR/MenuR";
import "./HomePage.css";
import WToon from "../components/WToon/WToon";
import { useParams } from "react-router-dom";
import useFetchDataToonChapterImage from "../components/hooks/ChapterImage";
import useFetchDataToonChapterDetail from "../components/hooks/BookChapterDetail";
import useFetchDataToonOne from "../components/hooks/BookOne";
import useFetchDataCommentChapter from "../components/hooks/DataCommentChapter";
import { AuthContext } from "../components/Context/AuthContext";
const ReadToon = () => {
  const { bookid, chapterid } = useParams();
  const { databookone } = useFetchDataToonOne(bookid);
  const {user} = useContext(AuthContext)
  const { databookchapterimage, loadings } = useFetchDataToonChapterImage(
    bookid,
    chapterid
  );
  const { databookchapterdetail } = useFetchDataToonChapterDetail(chapterid);
  const { datacomchapter } = useFetchDataCommentChapter(chapterid);
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="container">
          <WToon
            DataChapterToon={databookchapterimage}
            DataToonChapterDetali={databookchapterdetail}
            DataBook={databookone}
            Loading={loadings}
            DataCment={datacomchapter}
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

export default ReadToon;
