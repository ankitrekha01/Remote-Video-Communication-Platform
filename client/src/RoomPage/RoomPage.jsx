import React, { useEffect, useState } from "react";
import ChatSection from "./ChatSection/ChatSection";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
// import VideoSection from "./VideoSection/VideoSection";
import BottomSection from "./BottomSection/BottomSection";
// import RoomLabel from "./RoomLabel";
import Overlay from "./Overlay";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";

import "animate.css/animate.min.css";
import "./RoomPage.css";
// import { toast } from "react-toastify";
// import {useNavigate} from "react-router-dom"
// import { Offline } from "react-detect-offline";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  // const navigate = useNavigate();
  // function goHome() {
  //   console.log('offline')
  //   const siteUrl = window.location.origin;
  //   window.location.href = siteUrl;
    // toast.error("Your internet has been lost, please login again");
    // document.getElementById("videos_portal").classList.remove("videos_portal_styles");
    // document.getElementById("videos_portal").innerHTML='';
    // navigate("/");
  // }
  // console.log("RoomPage rendered");
  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio
      );
      // toast.success(`${identity} joined the room!`, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  }, []);

  return (
    <div className="room_main_container">
      <br />
      <div className="room_container">
        {/* <VideoSection /> */}
        <ChatSection />
        <ParticipantsSection />
        {/* <RoomLabel roomId={roomId} /> */}
      </div>
      <div className="room_bottom_container">
        <BottomSection
          connectOnlyWithAudio={connectOnlyWithAudio}
          roomId={roomId}
          // isParticipantOrChat={isParticipantOrChat}
          // setIsParticipantOrChat={setIsParticipantOrChat}
        />
      </div>
      {showOverlay && <Overlay />}
      {/* <Offline onChange={goHome}></Offline> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(RoomPage);
