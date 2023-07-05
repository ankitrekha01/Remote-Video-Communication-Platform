import React, { useState } from "react";
import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled);
    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };

  return (
    <div className="video_button_container tooltip">
      <img src={isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg} 
      className='video_button_image'
      onClick={handleCameraButtonPressed}
      />
      <span className="tooltiptext">Camera</span>
    </div>
  );
};

export default CameraButton;
