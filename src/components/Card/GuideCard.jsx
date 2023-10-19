import React from 'react';
import noProfile from 'asset/icons/noProfile.svg';
import styles from './GuideCard.module.css';

function GuideCard({ guide }) {
  console.log(guide, 'guideCard에서 확인');

  return (
    <div className={styles.container}>
      <div className={styles.guideTop}>
        <div className={styles.Name}>{guide.guideName}</div>
        {guide.profilePicture ? (
          <img src={guide.profilePicture} alt="guideImg" className={styles.profileImg}></img>
        ) : (
          <img src={noProfile} alt="guideImg" className={styles.profileImg}></img>
        )}
      </div>
      {guide.hasGuideCertification ? <span className={styles.guideCertificate}>가이드자격증</span> : null}
      <div>{guide.guideEmail}</div>
    </div>
  );
}

export default GuideCard;
