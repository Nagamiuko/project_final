import React ,{ useEffect, useState} from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const GoTop = () => {
  
   const [isVisible, setIsVisible] = useState(false);

   const goToBtn = () => {
     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   };
 
   const listenToScroll = () => {
     let heightToHidden = 1500;
     const winScroll =
       document.body.scrollTop || document.documentElement.scrollTop;
     if (winScroll > heightToHidden) {
       setIsVisible(true);
     } else {
       setIsVisible(false);
     }
   };
 
   useEffect(() => {
     window.addEventListener("scroll", listenToScroll);
     return () => window.removeEventListener("scroll", listenToScroll);
   }, []);
 
   return (
     <Wrapper>
       {isVisible && (
         <div className="top-btn" onClick={goToBtn}>
           <FontAwesomeIcon icon={faArrowUp} className="top-btn--icon"/>
         </div>
       )}
     </Wrapper>
   );
 };
 
 const Wrapper = styled.section `
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
 
   .top-btn {
     font-size: 2.4rem;
     width: 2.5rem;
     height: 2.5rem;
     color: #fff;
     border-radius: 50%;
     position: fixed;
     bottom: 5rem;
     right: 10rem;
     z-index: 999;
     display: flex;
     justify-content: center;
     align-items: center;
     cursor: pointer;
     background: #7100f3;
     &--icon {
       animation: gototop 1.2s linear infinite alternate-reverse;
       width:15px
     }
 
     @keyframes gototop {
       0% {
         transform: translateY(-0.5rem);
       }
       100% {
         transform: translateY(0.5rem);
       }
     }
   }
`
export default GoTop