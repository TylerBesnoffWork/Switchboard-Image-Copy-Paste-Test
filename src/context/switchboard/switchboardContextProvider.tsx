import React, { useState, FC } from 'react';
import { SwitchboardContext } from './switchboardContext';
import { ImageProps } from '../../hooks/useReadClipboard';

export const SwitchboardContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<(ImageProps | string)[]>([]);

  const addMessage = (message: ImageProps | string) => {
    if(typeof message === 'string') {
      setMessages((prevMessages) => [...prevMessages, message]);
    } else {
      const formData = new FormData();
      formData.append('Image', message.blob as Blob);

      // Simulate the sending of a photo like it is done on switchboard
      // This obviously is not going to be the place to send it but it will be similar
      sendPhotoAsCustomer(formData);
    }
  };  

  const sendPhotoAsCustomer = async (data: FormData): Promise<void> => {
    // Upload the image to the server
    // Get the url of the image
    // Since we don't actually have a server I am going to simulate the server response even though the image is not actually uploaded and will not be cleaned up
    const blob = data.get('Image') as Blob;
    const imgURL = URL.createObjectURL(blob);

    setMessages((prevMessages) => [...prevMessages, { URL: imgURL, key: '123', blob: blob }]);
  }

  const clearMessages = () => {
      setMessages([]);
  }

  return (
    <SwitchboardContext.Provider value={{ messages: messages, addMessage: addMessage, clearMessages: clearMessages }}>
      {children}
    </SwitchboardContext.Provider>
  );
};
