import React, { useContext} from "react";
import Preview from "../components/PreviewToon/Preview";
import Menufoot from "../components/Menufootbar/Menufoot";
import MenuR from "../components/Menufootbar/MenuR/MenuR";
import useFetchDataToonOne from "../components/hooks/BookOne";
import useFetchDataToonChapter from "../components/hooks/BookChapter";
import { AuthContext } from "../components/Context/AuthContext";
import useFetchDataCommentBooks from "../components/hooks/DataCommentBook";
const PreviewToon = ({ setPopupToon, DataID }) => {
  const {user} = useContext(AuthContext)
  const { databookone, loadings } = useFetchDataToonOne(DataID);
  const {dataCommentBook} = useFetchDataCommentBooks(DataID)
  const { databookchapter } = useFetchDataToonChapter(DataID);

  return (
    <div>
      <div className="container">
        <Preview
          setPopupToon={setPopupToon}
          DataToonChapter={databookchapter}
          DatatoonD={databookone}
          Loadings={loadings}
          DataCommentBook={dataCommentBook}
          userID={user}
        />
      </div>
      <div className="menu-b-r-ao">
        <div className="menu-as">
          <MenuR />
        </div>
      </div>
      <div className="menu-foot">
        <Menufoot />
      </div>
    </div>
  );
};

export default PreviewToon;
