import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { db } from "../../firebase";
import styles from "../../pages/ChatPage/style.module.scss";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={styles.chats}>
      <h4
        style={{
          color: "white",
          textAlign: "left",
          marginLeft: "10px",
          marginTop: "30px",
        }}
      >
        대화 상대 목록
      </h4>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={styles.userChat}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className={styles.userChatInfo}>
              <span>{chat[1].userInfo.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
