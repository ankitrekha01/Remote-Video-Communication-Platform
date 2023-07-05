import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const handleScreenSharingToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (e) {
        console.log("error getting display media");
      }
      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive,stream);
        setIsScreenSharingActive(true);
        //execute here the function to swtich the video track which we are sendin to other user
      } 
    }
    else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      //switch to video track
      setIsScreenSharingActive(false);

      //stop screen sharing
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <>
      <div className="video_button_container tooltip">
        <img
          src={SwitchImg}
          onClick={handleScreenSharingToggle}
          className="video_button_image"
        />
        <span className="tooltiptext">Share</span>
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default SwitchToScreenSharingButton;
