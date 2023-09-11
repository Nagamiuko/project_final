import React from "react";
import { Offline, Online ,Detector} from "react-detect-offline";
const InternetOff = () => {
  return (
    <div>
      <Detector
        render={({ online }) => (
          <div className={online ? "normal" : "warning"}>
            You are currently {online ? "online" : "offline"}
          </div>
        )}
      />
    </div>
  );
};

export default InternetOff;
