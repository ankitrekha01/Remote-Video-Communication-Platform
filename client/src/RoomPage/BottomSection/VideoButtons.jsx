import React from "react";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import CopyId from "./CopyId";
import ShowParticipants from "./ShowParticipants";
import ChatWithEveryone from "./ChatWithEveryone";
import { connect } from "react-redux";

const VideoButtons = (props) => {
  const { connectOnlyWithAudio, roomId } = props;

  return (
    <div className="video_buttons_container">
      <CopyId roomId={roomId} />
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <SwitchToScreenSharingButton />
      <LeaveRoomButton />
      <ShowParticipants />
      <ChatWithEveryone />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(VideoButtons);
