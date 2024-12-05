import React, { useContext, useState, useEffect, useRef } from "react";
import "./MessageBar.css";
import { SwitchboardContext } from "../../../context/switchboard/switchboardContext";
import SwitchboardContextType from "../../../context/switchboard/switchboardContextType";
import useReadClipboard, { ImageProps } from "../../../hooks/useReadClipboard";
import { Button, Form } from "antd";
import ImageBar from "./ImageBar";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";

const MessageBar: React.FC = () => {
  const messageInputRef = useRef<TextAreaRef>(null);

  const [nextMessage, setNextMessage] = useState("");
  // Context is used as a simplified version of redux to manage the state of the messages
  const { addMessage } = useContext(SwitchboardContext) as SwitchboardContextType;
  const [form] = Form.useForm();
  const [messageInputFocused, setMessageInputFocused] = useState(false);

    // State to hold images from the clipboard
  // This is currently managed in the FileUploadModel which is only when the user uploads a file
  // We probably want this on the message bar so that we can send the images with the message
  const [nextImages, setNextImages] = useState<ImageProps[]>([]);

  // see useReadClipboard.tsx for more information
  const {handleReadClipboard} = useReadClipboard();

  //Clear the images from the clipboard
  const clearImages = () => {
    // A security concern may be with createObjectURL. Once the images are sent they can be uploaded to our servers in the way we do it already in switchboard.
    // Currently we are sending using sendPhotoAsCustomer which takes data as FormData. We can modify our eventual send function to call this sendPhotoAsCustomer which will upload to our server
    // The issue is the image using the created link is still live. We want to be able to clean this up. We can call this function to do it in our send photo function
    // We can call clear images when we send the images which allows us to clean up the images when they are removed or when they are sent.
    // The same is done in remove image
    nextImages.forEach((img) => URL.revokeObjectURL(img.URL));

    setNextImages([]);
  }

  //Remove an image from the clipboard by its key
  const removeImage = (key: string) => {
    const image = nextImages.find((img) => img.key === key);
    if (image) {
      URL.revokeObjectURL(image.URL);
      setNextImages((prevImages) => prevImages.filter((img) => img.key !== key));
    }
  }

  // Handle sending the message (text or image)
  const handleSend = () => {
    if (nextMessage.trim() !== "") {
      addMessage(nextMessage); // Send the text message
      setNextMessage(""); // Clear text field
    }

    // Send the clipboard image if there are any
    nextImages.forEach((image) => {
      addMessage(image); // Send the image message
    });
    
    clearImages(); // Clear clipboard images
  };

  // Add paste event listener on component mount and cleanup on unmount
  useEffect(() => {
    const handlePaste = async () => {
      // Make sure that the message input ref is available and the message input is focused
      if(!messageInputRef.current || !messageInputFocused) return;

      const { clipboardImages } = await handleReadClipboard();

      if (clipboardImages) {
        setNextImages((previousImages) => [...previousImages, ...clipboardImages]);
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);

      // Clean up the images when the component is unmounted
      // This may possibly need to accommodate refreshing? If the component is unmounted and remounted the images will be lost
      nextImages.forEach((img) => URL.revokeObjectURL(img.URL));
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
          <>
            <ImageBar images={nextImages} removeImage={removeImage}/>
            <TextArea
                placeholder="Enter message..."
                value={nextMessage}
                onPressEnter={(event): void => {
                    if (!event.shiftKey) {
                        event.preventDefault();
                        form.submit();
                    }
                }}
                onChange={(event): void => setNextMessage(event.target.value)}
                onFocus={() => setMessageInputFocused(true)}
                onBlur={() => setMessageInputFocused(false)}  
                ref={messageInputRef}

            />
          </>
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
