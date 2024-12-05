import React, { useContext, useState, useEffect, useCallback } from "react";
import "./MessageBar.css";
import { SwitchboardContext } from "../../../context/switchboard/switchboardContext";
import SwitchboardContextType, { image } from "../../../context/switchboard/switchboardContextType";
import useReadClipboard from "../../../hooks/useReadClipboard";
import { Button, Form, ImageProps } from "antd";
import PlainTextArea from "./plaintextarea";
import ImageBar from "./ImageBar";

const MessageBar: React.FC = () => {
  const [message, setMessage] = useState("");
  const { addMessage } = useContext(SwitchboardContext) as SwitchboardContextType;
  const {clipboardImages, handleReadClipboard, clearImages, removeImage} = useReadClipboard();
  const [form] = Form.useForm();

  // Handle changes in the text input
  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  // Handle sending the message (text or image)
  const handleSend = () => {
    if (message.trim() !== "") {
      addMessage(message); // Send the text message
      setMessage(""); // Clear text field
    }

    // Send the clipboard image if there are any
    clipboardImages.forEach((image) => {
      const imageMessage: image = { url: image.URL };
      addMessage(imageMessage); // Send the image message
    });
    
    clearImages(); // Clear clipboard images
  };

  const getDefaultValue = useCallback(() => {
    return message.length > 0 ? message : undefined;
  }, [message]);

  // Add paste event listener on component mount and cleanup on unmount
  useEffect(() => {
    const handlePaste = () => {
      handleReadClipboard();
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handleReadClipboard]);

  return (
    <Form 
      className="message-bar" 
      form={form} 
      layout="horizontal" 
      onFinish={(): void =>{
        handleSend();
      }}>
        <Form.Item
          className="message-bar-textarea"
          name="inputText"
        >
          <ImageBar images={clipboardImages} removeImage={removeImage}/>
          <PlainTextArea handleMessageChange={handleMessageChange} form={form} value={message}/>
        </Form.Item>
        <Form.Item>
            <Button
                className="send-button"
                htmlType="submit"
                type="primary"
                size="large"
            >
                <span className="hide-on-small">Send</span>
            </Button>
        </Form.Item>
    </Form>
  );
};

export default MessageBar;
