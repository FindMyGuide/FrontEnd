import React, { useState } from 'react';
import { IconButton } from '@material-tailwind/react';
import styles from './GuideButton.module.css';
import Popover from '@mui/material/Popover';
import Home from 'pages/ChatPage/Home';

function GuideButton(props) {
  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className={styles.topButton}>
        <IconButton
          style={{
            backgroundColor: '#50abf2',
            borderRadius: '5px',
            padding: '10px 20px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1783d8';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#50abf2';
          }}
          size="lg"
          className={styles.icon}
          type="button"
          onClick={handleClick}
        >
          <div className={styles.content} style={{ color: 'black', fontWeight: 'semi-bold' }}>
            📩 {props.text}와 채팅하기
          </div>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Home />
        </Popover>
      </div>
    </>
  );
}

export default GuideButton;
