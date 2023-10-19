import React from 'react';
import { useNavigate } from 'react-router-dom';
import noProfile from 'asset/icons/noProfile.svg';
import styles from './GuideCard.module.css';

function GuideCard({ guide }) {
  const navigate = useNavigate();
  console.log(guide, 'guideCard에서 확인');
  
  const onClickHandler = (id) => {
    navigate(`/guide/detail/${id}`);
  };

  return (
    <div className={styles.container} onClick={() => onClickHandler(guide.guideId)}>
      <div className={styles.guideTop}>
        <div className={styles.Name}>{guide.guideName}</div>
        {guide.profilePicture ? (
          <img src={guide.profilePicture} alt="guideImg" className={styles.profileImg}></img>
        ) : (
          <img src={noProfile} alt="guideImg" className={styles.profileImg}></img>
        )}
      </div>
      <div>
        {guide.hasGuideCertification ? (
          <span className={styles.guideCertificate}>가이드 자격증</span>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
      <div className={styles.explain}>{guide.guideEmail}</div>
    </div>
  );
}

export default GuideCard;
