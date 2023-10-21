import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import styles from "./ChatButton.module.css";
import Popover from "@mui/material/Popover";
import Home from "pages/ChatPage/Home";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { AuthContext } from "./context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function ChatButton() {
  const [anchorEl, setAnchorEl] = useState();

  const { currentUser, alarm } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    updateDoc(doc(db, "users", currentUser.uid), {
      alarm: 0,
    });
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
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="lg"
          className={styles.icon}
          type="button"
          onClick={handleClick}
        >
          <Badge badgeContent={alarm} color="primary">
            <MailIcon color="action" />
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Home />
        </Popover>
      </div>
    </>
  );
}

export default ChatButton;
