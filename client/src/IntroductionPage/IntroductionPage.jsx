import React, { useEffect } from "react";
import "./IntroductionPage.css";
import svg from "../resources/images/svg_image.svg";
import ConnectingButtons from "./ConnectingButtons";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_header">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/nolan/64/video-call.png"
          alt="video-call"
        />
        <h2>baatKaro</h2>
      </div>
      <div className="introduction_page_two_cont">
        <div className="introduction_page_panel">
          <h1> Premium Video Call.<br/>For everyone.</h1>
          <ConnectingButtons />
        </div>
        <div className="introduction_page_svg_image_container">
          <img src={svg} className="introduction_page_svg_image"></img>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapActionsToProps)(IntroductionPage);
