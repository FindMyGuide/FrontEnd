import React from 'react';
import styles from './GuideCard.module.css';
import { useNavigate } from 'react-router-dom';

import profileImg from 'asset/images/emptyprofile.png';

const GuideCard = ({ guideId, name, tour, imageLink }) => {
  const movePage = useNavigate();

  const id = guideId;
  function goToDetailPage() {
    movePage(`/guide/detail/${id}`);
  }
  return (
    <>
      <div className={styles.guideBox} onClick={goToDetailPage}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <h4 style={{ marginTop: '10px', marginLeft: '10px' }}>{name}</h4>
          <img
            style={{
              width: '60px',
              position: 'absolute',
              right: '0',
              top: '-30px'
            }}
            src={profileImg}
            alt="얼굴 이미지"
          />
        </div>
        <p style={{ marginBottom: '0', marginTop: '10px', marginLeft: '10px' }}>인기투어</p>
        <p style={{ marginLeft: '10px' }}>{tour}</p>
        <img src={{ imageLink } ? { imageLink } : ''} alt="" />
      </div>
    </>
  );
};

export default GuideCard;
