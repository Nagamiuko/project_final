import React, { useState } from "react";
import "./Favorite.css";
import excover from "../../assets/book-test/nocover.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/action/wishlist";
import MenuLeft from '../mycollection/menuLeft/MenuLeft'
const Favorite = () => {
  const [Query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigator = useNavigate()
  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  console.log(Query);
  return (
    <>
      <div className="box-bg-mybook">
        <div className="box-left-menu">
           <MenuLeft/>
        </div>
        <div className="box-container-list-mybook">
          <div className="title-my">หนังสือที่ฉันชื้นชอบ</div>
          <div className="box-contai-book">
            <div className="box-search-mybook">
              <div className="icon-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <input
                type="search"
                placeholder="search mybook"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="btn-list-c-book">
              <button onClick={() => setQuery("")}>ทั้งหมด</button>
              <button onClick={() => setQuery("นิยายแปล")}>นิยาย</button>
              <button onClick={() => setQuery("นิยายแต่ง")}>นิยายแต่ง</button>
              <button onClick={() => setQuery("การ์ตูน")}>การ์ตูน</button>
              <button onClick={() => setQuery("การ์ตูนแปล")}>การ์ตูนแปล</button>
            </div>
            <div className="border-bar-bottom"></div>
            <div className="list-book-favor">
              {wishlist
                .filter(
                  (da) =>
                    da.title.toLowerCase().includes(Query) ||
                    da.typebook_singer_a_muti.toLowerCase().includes(Query)
                )
                .map((datoon ,keys) => (
                  <div className="list-flex-wrap" key={keys} onClick={()=> navigator(`/ViewToon/${datoon?._id}`)}>
                    <div className="box-wrap">
                      <div className="cover-img-box">
                        <img src={datoon?.cover_image?.cover_image_url||excover} alt="" />
                      </div>
                      <div className="name-book">
                        {datoon?.title}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="box-contai-book"></div>
        </div>
      </div>
    </>
  );
};

export default Favorite;
