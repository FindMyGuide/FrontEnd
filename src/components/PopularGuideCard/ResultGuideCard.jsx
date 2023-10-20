import React from 'react';
import styles from './ResultGuideCard.module.css';
import { useNavigate } from 'react-router-dom';

import profileImg from 'asset/images/emptyprofile.png';

const ResultGuideCard = ({ guide }) => {
  const movePage = useNavigate();

  const id = guide.guideId;

  function goToDetailPage() {
    movePage(`/guide/detail/${id}`);
  }
  return (
    <>
      <div className={styles.guideBox} onClick={goToDetailPage}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <h4 style={{ marginTop: '10px', marginLeft: '10px' }}>{guide.guideName}</h4>
          <img
            style={{
              width: '120px',
              position: 'absolute',
              right: '-8px',
              top: '-60px'
            }}
            src={guide.profilePicture !== '' ? guide.profilePicture : profileImg}
            alt=""
          />
        </div>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>언어 </p>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>{guide.tourProductInformation[0]?.title}</p>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>￦{guide.tourProductInformation[0]?.price}</p>
      </div>
    </>
  );
};

export default ResultGuideCard;
