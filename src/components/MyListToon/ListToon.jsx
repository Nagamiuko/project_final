import React, { useState } from "react";
import "./ListToon.css";
import { useNavigate } from "react-router-dom";
import PreviewToon from "../../pages/PreviewToon";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { RotatingLines } from "react-loader-spinner";
import Addcart from "../Cart/addToCart/CartAdd";
const ListToon = ({ DataToon, Loadings, TileTap }) => {
  const navigator = useNavigate();
  const [openAddToCart, setOpenCart] = useState(false);
  const [popuptoon, setPopupToon] = useState(false);
  const [datatoonid, setDataToon] = useState();
  const [dataid, setDataID] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const toonPerPage = 6;
  const pageVisited = pageNumber * toonPerPage;
  const displayToon = DataToon.slice(
    pageVisited,
    pageVisited + toonPerPage
  ).map((dtoon, keys) => {
    return (
      <div key={keys} onClick={() => setDataToon(dtoon?._id)}>
        <div
          title={dtoon?.title}
          className="b-toon"
          onClick={setPopupToon.bind(this, true)}
        >
          <img src={dtoon?.cover_image?.cover_image_url} alt="" />
          <div className="title-n">
            {dtoon?.title}
            <div className="view-li">{dtoon?.t_name}</div>
            <div className="view-li flex-n">
              {dtoon?.category + "/" + dtoon?.category_main}
            </div>
            <span className="flex-n" onClick={(e) => e.stopPropagation()}>
              <p>👁️10 </p>
              {/* {`dtoon.views`} */}
             {dtoon?.price_of_free !== 0 ? (
              <button onClick={setOpenCart.bind(this, true)}>
                <div onClick={()=>setDataID(dtoon)}>
                {dtoon?.price_of_free === 0
                  ? "ฟรี"
                  : "฿" + dtoon?.price_of_free}
                </div>
              </button>
               ):'ฟรี'
              }
            </span>
          </div>
        </div>
      </div>
    );
  });
  const pageCount = Math.ceil(DataToon.length / toonPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      {openAddToCart && (
        <Addcart setOpenCart={setOpenCart} dataID={dataid} />
      )}
      {popuptoon && (
        <PreviewToon setPopupToon={setPopupToon} DataID={datatoonid} />
      )}
      <div className="menu-p">
        {TileTap}
        <div className="p-p" onClick={() => navigator("/Search")}>
          ดูทั้งหมด
        </div>
      </div>
      <div className="bor"></div>
      {Loadings ? (
        <div className="loadding-center">
          <RotatingLines
            strokeColor="#182c6f"
            strokeWidth="4.5"
            animationDuration="0.75"
            width="90"
            visible={true}
          />
          <div>Loading...</div>
        </div>
      ) : (
        <div className="box-list-toon-bg carousel">
          <div className="next-prev">
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
              nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
              pageCount={pageCount}
              containerClassName={"paginationBar"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisbled"}
              onPageChange={changePage}
            />
          </div>
          <div className="list-toon-r ">{displayToon}</div>
        </div>
      )}
    </div>
  );
};

export default ListToon;
