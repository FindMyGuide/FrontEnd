import Chat from "components/Chat/Chat";
import Sidebar from "components/Chat/Sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
