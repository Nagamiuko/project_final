import React from "react";
import "./SW.css";
import {Oval} from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
const Load = () => {
  const navigator = useNavigate()
  const refa = () =>{
     navigator(0)
  }
   refa()
  return (
    <>
      <div className="box-l-load">
         <div className="flex-center-load">
         <Oval
            height={80}
            width={80}
            color="#008fc3"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#5487ff"
            strokeWidth={2}
            strokeWidthSecondary={2}
         />
         </div>
      </div>
    </>
  );
};

export default Load;
