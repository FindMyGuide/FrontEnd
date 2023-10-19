import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "./context/AuthContext";
import styles from "../../pages/ChatPage/style.module.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
