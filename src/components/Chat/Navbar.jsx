import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import styles from "../../pages/ChatPage/style.module.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <span>{currentUser.displayName}님의 채팅창</span>
      </div>
    </div>
  );
};

export default Navbar;
