import React from "react";
import show from "../../resources/images/people.svg";
import { connect } from "react-redux";
import store from "../../store/store";
import { setIsParticipantOrChat } from "../../store/actions";

const ShowParticipants = ({ isParticipantOrChat }) => {
  const handleKeyPressed = (e) => {
    if (isParticipantOrChat === 2) {
      document.getElementById("videos_portal").style.width = "100%";
      document.getElementsByClassName("room_container")[0].style.width = "0%";
      document.getElementsByClassName(
        "participants_section_container"
      )[0].style.display = "none";
      store.dispatch(setIsParticipantOrChat(0));
    } else if (isParticipantOrChat === 0) {
      document.getElementById("videos_portal").style.width = "80%";
      document.getElementsByClassName("room_container")[0].style.width = "20%";
      document.getElementsByClassName(
        "participants_section_container"
      )[0].style.display = "flex";
      store.dispatch(setIsParticipantOrChat(2));
    }else if(isParticipantOrChat === 1){
      document.getElementsByClassName(
        "chat_section_container"
      )[0].style.display = "none";
      document.getElementsByClassName(
        "participants_section_container"
      )[0].style.display = "flex";
      store.dispatch(setIsParticipantOrChat(2));
    }
  };
  return (
    <div className="video_button_container tooltip">
      <img
        src={show}
        className="video_button_image"
        onClick={handleKeyPressed}
      />
      <span className="tooltiptext">Participants</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ShowParticipants);
