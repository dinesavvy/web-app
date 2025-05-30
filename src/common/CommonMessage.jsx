import React from "react";
import { createContext, useContext } from "react";
import { message } from "antd";

const MessageContext = createContext();

export const CommonMessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useCommonMessage = () => {
  return useContext(MessageContext);
};
