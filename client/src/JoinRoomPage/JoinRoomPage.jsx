import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./JoinRoomPage.css";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
import svg from "../resources/images/undraw_waiting__for_you_ldha.svg";

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props;
  const search = useLocation().search;
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      //setting in our redux store that user is host
      setIsRoomHostAction(true);
    }
  }, []);
  return (
    <div className="join_room_page_main_container">
      <div className="join_room_page_header">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/nolan/64/video-call.png"
          alt="video-call"
        />
        <h2>baatKaro</h2>
      </div>
      <div className="join_room_page_cont">
        <div className="join_room_page_panel">
          <JoinRoomTitle isRoomHost={isRoomHost} />
          <JoinRoomContent />
        </div>
        <div className="join_room_page_image_container">
          <img src={svg} className="join_room_page_image"></img>
        </div>
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
