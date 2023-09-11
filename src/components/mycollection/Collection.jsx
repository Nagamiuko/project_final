import React, { useContext, useEffect } from "react";
import "./collection.css";
import { AuthContext } from "../Context/AuthContext";
import MenuLeft from './menuLeft/MenuLeft'
import nocover from '../../assets/book-test/nocover.png'
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../redux/action/order";
import { Link, useNavigate } from "react-router-dom";
const Collection = () => {
  const navigetor = useNavigate()
  const { user } = useContext(AuthContext);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const submitHandle = (i,oi) => {
    navigetor(`/view?bookpdf=${i._id}&&Status=${oi._id}`);
    window.location.reload();
  };
  return (
    <>
      <div className="box-container-item">
        <div className="pro-lr">
              <MenuLeft/>
        </div>
        <div className="item-rh">
            <div className="title-list">
               <div className="text-black">ชั้นหนังสือของฉัน</div> 
             </div>
            <div className="list-item-collection">
              { orders?.map((data , keys) => (
               <div className="item-book-my" key={keys}>
                <div className="img-item-my" >
                  <div onClick={() => submitHandle(data.cart,data)}>
                        <img src={data?.cart?.cover_image?.cover_image_url ||nocover} alt="" />
                  </div>
                  {/* <Link to={`/view/${d._id}/${data._id}`}>
                        <img src={d?.cover_image?.cover_image_url ||nocover} alt="" />
                  </Link> */}
                  </div>
                 <div className="title-book-item">
                    {data?.cart?.title}
                 </div>
               </div>
              ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
