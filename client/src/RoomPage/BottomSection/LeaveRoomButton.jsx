import React from "react";
import endCall from "../../resources/images/end-call.svg";

const LeaveRoomButton = () => {
  const handleRoomDisconnection = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="video_button_container tooltip">
      {/* <button className="video_button_end" onClick={handleRoomDisconnection}>
        Leave Room
      </button> */}
      <img
        src={endCall}
        className="video_button_end"
        onClick={handleRoomDisconnection}
      />
      <span className="tooltiptext">End Call</span>
    </div>
  );
};

export default LeaveRoomButton;
