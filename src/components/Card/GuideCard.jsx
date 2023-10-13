import React from 'react';
import styles from './GuideCard.module.css';

function GuideCard({ guide }) {
  return (
    <div className={styles.container}>
      <div>{guide.guideName}</div>
      <img src={guide.profiePicture} alt="guideImg"></img>
    </div>
  );
}

export default GuideCard;
