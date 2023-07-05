import React from "react";
import CheckImg from "../resources/images/check.png";

const OnlyWithAudioCheckbox = ({
  connectOnlyWithAudio,
  setConnectOnlyWithAudio,
}) => {
  const handleConnectionTypeChange = () => {
    //change info in our store about connection type
    setConnectOnlyWithAudio(!connectOnlyWithAudio);
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio && (
          <img alt="checkbox image" className="checkbox_image" src={CheckImg}></img>
        )}
      </div>
      <p className="checkbox_container_paragraph"> Only Audio </p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
