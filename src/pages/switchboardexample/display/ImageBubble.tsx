import React from "react";
import "./ImageBubble.css";

interface ImageBubbleProps {
  imageUrl: string;
}

const ImageBubble: React.FC<ImageBubbleProps> = ({ imageUrl }) => {
  return (
    <div className="image-bubble">
      <img src={imageUrl} alt="bubble" className="bubble-image" />
    </div>
  );
};

export default ImageBubble;
