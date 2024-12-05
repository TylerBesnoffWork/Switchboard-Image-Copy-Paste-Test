import React, { useContext } from "react";
import "./MessageBox.css";
import { SwitchboardContext } from "../../../context/switchboard/switchboardContext";
import SwitchboardContextType from "../../../context/switchboard/switchboardContextType";
import TextBubble from "./TextBubble";
import ImageBubble from "./ImageBubble";

const MessageBox: React.FC = () => {
  const { messages } = useContext(SwitchboardContext) as SwitchboardContextType;

  const RenderMessages = () => {
    return messages.map((message, index) => {
      if (typeof message === "string") {
        return (
          <TextBubble key={index} text={message} />
        );
      } else {
        return (
          <ImageBubble key={index} imageUrl={message.url} />
        );
      }
    });
  }

  return (
    <div className="message-box">
      <RenderMessages />
    </div>
  );
};

export default MessageBox;