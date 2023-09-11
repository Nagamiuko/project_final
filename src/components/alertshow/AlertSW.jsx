import React from 'react'
import Alertwel from '../../assets/icon/alertwel.png'
import './SW.css'
import { RotatingLines } from  'react-loader-spinner'
const AlertSW = () => {
  return (
    <div>
        <div className="show-al">
             <div className="title-alert-t">
                <img src={Alertwel} alt="" />
                <RotatingLines
                   strokeColor="#008fc3"
                   strokeWidth="4.5"
                   animationDuration="0.75"
                   width="90"
                   visible={true}
                />
                <div className="title-ta">
                   Login Success...
                </div>
             </div>
        </div>
    </div>
  )
}

export default AlertSW