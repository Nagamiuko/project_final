import React, { useContext, useEffect } from "react";
import liff from "@line/liff";
import config from '../config.json'
import axios from "axios";
import { AuthContext } from "../components/Context/AuthContext";
import Swal from "sweetalert2";
import Load from "../components/alertshow/Load";
import { useNavigate } from "react-router-dom";
const Line = () => {
 const {loading, dispatch} = useContext(AuthContext);
 const navigator = useNavigate()
  useEffect(() => {
    liff.init({ liffId: "2000028080-wWk5pKQG" }).then(() => {
        handdleLogin()
    });
  }, []);
  const handdleLogin = async () =>{
      dispatch({ type: "LOGIN_START", loading });
    try{
        const profile = await liff.getProfile()
        console.log(profile);
        await axios.post(config.apiloginLineauth,profile).then((res)=>{
         dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        }).catch(err => console.log(err));
        navigator('/')
    }catch(err){
      console.log(err);
    }
  }
  return <>{loading ? <Load/> :''}</> ;
};

export default Line;
