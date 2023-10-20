import React from 'react';
import styles from './RowResultGuide.module.css';
import { useNavigate } from 'react-router-dom';

import profileImg from 'asset/images/emptyprofile.png';

const RowResultGuideCard = ({ guide }) => {
  const movePage = useNavigate();

  const id = guide.guideId;
  function goToDetailPage() {
    movePage(`/guide/detail/${id}`);
  }
  return (
    <>
      <div className={styles.guideBox} onClick={goToDetailPage}>
        <div style={{ position: 'relative', display: 'flex' }}>
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
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>
          언어{' '}
          <img width="100" height="100" src="https://img.icons8.com/plasticine/100/south-korea.png" alt="south-korea" />
        </p>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>{guide.tourProductInformation[0]?.title}</p>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>￦{guide.tourProductInformation[0]?.price}</p>
      </div>
    </>
  );
};

export default RowResultGuideCard;
