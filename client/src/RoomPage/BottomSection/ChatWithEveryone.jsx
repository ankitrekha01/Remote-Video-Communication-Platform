import React from "react";
import chat from "../../resources/images/chat.svg";
import { connect } from "react-redux";
import store from "../../store/store";
import { setIsParticipantOrChat } from "../../store/actions";

const ChatWithEveryone = ({ isParticipantOrChat }) => {
  const handleKeyPressed = () => {
    if (isParticipantOrChat === 1) {
      document.getElementById("videos_portal").style.width = "100%";
      document.getElementsByClassName("room_container")[0].style.width = "0%";
      document.getElementsByClassName(
        "chat_section_container"
      )[0].style.display = "none";
      store.dispatch(setIsParticipantOrChat(0));
    } else if (isParticipantOrChat === 0) {
      document.getElementById("videos_portal").style.width = "80%";
      document.getElementsByClassName("room_container")[0].style.width = "20%";
      document.getElementsByClassName(
        "chat_section_container"
      )[0].style.display = "flex";
      store.dispatch(setIsParticipantOrChat(1));
    } else if (isParticipantOrChat === 2) {
      document.getElementsByClassName(
        "chat_section_container"
      )[0].style.display = "flex";
      document.getElementsByClassName(
        "participants_section_container"
      )[0].style.display = "none";
      store.dispatch(setIsParticipantOrChat(1));
    }
  };

  return (
    <div className="video_button_container tooltip">
      <img
        src={chat}
        className="video_button_image"
        onClick={handleKeyPressed}
      />
      <span className="tooltiptext">Chat</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ChatWithEveryone);
