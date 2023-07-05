import React from "react";
import ParticipantsLabel from "./ParticipantsLabel";
import Participants from "./Participants";
import DirectChat from "./DirectChat/DirectChat";
const ParticipantsSection = () => {
  return (
    <div className="participants_section_container animate__animated animate__fadeIn">
        <ParticipantsLabel />
        <Participants />
        <DirectChat />
    </div>
  );
};

export default ParticipantsSection;
