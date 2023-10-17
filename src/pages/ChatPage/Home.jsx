import Chat from "components/Chat/Chat";
import Sidebar from "components/Chat/Sidebar";
import React from "react";
import styles from "./style.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
