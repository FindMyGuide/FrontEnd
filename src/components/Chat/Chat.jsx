import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "./context/ChatContext";
import styles from "../../pages/ChatPage/style.module.scss";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
