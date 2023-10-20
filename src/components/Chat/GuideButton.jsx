import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import styles from "./GuideButton.module.css";
import Popover from "@mui/material/Popover";
import Home from "pages/ChatPage/Home";

function GuideButton(props) {
  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className={styles.topButton}>
        <IconButton
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
          size="lg"
          className={styles.icon}
          type="button"
          onClick={handleClick}
        >
          <div
            className={styles.content}
            style={{ color: "black", fontWeight: "semi-bold" }}
          >
            📩 {props.text}와 채팅하기
          </div>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Home />
        </Popover>
      </div>
    </>
  );
}

export default GuideButton;
