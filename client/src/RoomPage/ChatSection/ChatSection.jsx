import React from "react";
import ChatLabel from "./ChatLabel";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

const ChatSection = () => {
  return (
    <div className="chat_section_container animate__animated animate__fadeIn">
      <ChatLabel />
      <Messages />
      <NewMessage />
    </div>
  );
};

export default ChatSection;
