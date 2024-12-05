import React, { useState, FC } from 'react';
import { image } from './switchboardContextType';
import { SwitchboardContext } from './switchboardContext';

export const SwitchboardContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<(image | string)[]>([]);

  const addMessage = (message: image | string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
      setMessages([]);
  }

  return (
    <SwitchboardContext.Provider value={{ messages: messages, addMessage: addMessage, clearMessages: clearMessages }}>
      {children}
    </SwitchboardContext.Provider>
  );
};
