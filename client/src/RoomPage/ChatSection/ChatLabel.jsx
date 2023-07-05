import React from "react";
import close from "../../resources/images/close.svg";
import { connect } from "react-redux";
import store from "../../store/store";
import { setIsParticipantOrChat } from "../../store/actions";

const ChatLabel = ({ isParticipantOrChat }) => {
  const handleKeyPressed = () => {
    if (isParticipantOrChat === 1) {
      document.getElementById("videos_portal").style.width = "100%";
      document.getElementsByClassName("room_container")[0].style.width = "0%";
      document.getElementsByClassName(
        "chat_section_container"
      )[0].style.display = "none";
      store.dispatch(setIsParticipantOrChat(0));
    }
  };
  return (
    <div className="chat_label_container">
      <p className="chat_label_paragraph">&nbsp;&nbsp;CHAT</p>
      <img
        src={close}
        className="chat_label_close"
        onClick={handleKeyPressed}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ChatLabel);
