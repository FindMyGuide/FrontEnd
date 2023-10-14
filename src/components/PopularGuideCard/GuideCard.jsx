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
        <div style={{ display: 'flex', position: 'relative', width: '200px' }}>
          <h1>{name}</h1>
          <img
            style={{
              width: '60px',
              textAlign: 'center',
              position: 'absolute',
              right: '0',
              top: '-30px'
            }}
            src={profileImg}
            alt="얼굴 이미지"
          />
        </div>

        <p>{tour}</p>
        <img src={{ imageLink } ? { imageLink } : ''} alt="" />
      </div>
    </>
  );
};

export default GuideCard;
