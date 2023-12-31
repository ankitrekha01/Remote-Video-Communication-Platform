import { useState } from "react";
import MicButtonImg from "../../resources/images/mic.svg";
import MicButtonImgOff from "../../resources/images/micOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className="video_button_container tooltip">
      <img
        src={isMicMuted ? MicButtonImgOff : MicButtonImg}
        onClick={handleMicButtonPressed}
        className="video_button_image"
      />
      <span className="tooltiptext">Mic</span>
    </div>
  );
};

export default MicButton;
