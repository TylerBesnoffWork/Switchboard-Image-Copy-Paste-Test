import React, { useContext, useState, useEffect } from "react";
import "./MessageBar.css";
import { SwitchboardContext } from "../../../context/switchboard/switchboardContext";
import SwitchboardContextType from "../../../context/switchboard/switchboardContextType";
import useReadClipboard from "../../../hooks/useReadClipboard";
import { Button, Form } from "antd";
import ImageBar from "./ImageBar";
import TextArea from "antd/es/input/TextArea";

const MessageBar: React.FC = () => {
  const [nextMessage, setNextMessage] = useState("");
  // Context is used as a simplified version of redux to manage the state of the messages
  const { addMessage } = useContext(SwitchboardContext) as SwitchboardContextType;
  const [form] = Form.useForm();

  // see useReadClipboard.tsx for more information
  const {clipboardImages, handleReadClipboard, clearImages, removeImage} = useReadClipboard();

  // Handle changes in the text input
  const handleMessageChange = (value: string) => {
    setNextMessage(value);
  };

  // Handle sending the message (text or image)
  const handleSend = () => {
    if (nextMessage.trim() !== "") {
      addMessage(nextMessage); // Send the text message
      setNextMessage(""); // Clear text field
    }

    // Send the clipboard image if there are any
    clipboardImages.forEach((image) => {
      addMessage(image); // Send the image message
    });
    
    clearImages(); // Clear clipboard images
  };

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
          <TextArea
                placeholder="Enter message..."
                value={nextMessage} // Bind the value prop
                onPressEnter={(event): void => {
                    if (!event.shiftKey) {
                        event.preventDefault();
                        form.submit();
                    }
                }}
                onChange={(event): void => handleMessageChange(event.target.value)}
            />
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
