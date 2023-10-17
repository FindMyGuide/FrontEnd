import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import styles from "../../pages/ChatPage/style.module.scss";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${styles.message} ${
        message.senderId === currentUser.uid ? styles.owner : ""
      }`}
    >
      <div className={styles.messageContent}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
