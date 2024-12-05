import React from "react";
import "./TextBubble.css";

interface TextBubbleProps {
  text: string;
}

const TextBubble: React.FC<TextBubbleProps> = ({ text }) => {
  return (
    <div className={`text-bubble`}>
      <p>{text}</p>
    </div>
  );
};

export default TextBubble;