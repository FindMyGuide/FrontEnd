import React from 'react';
import NoImage from 'asset/images/NoImage.png';
import styles from './Recommend.module.css';

function FestivalCard({ festival }) {
  return (
    <div className={styles.festCard}>
      {festival.image ? (
        <img src={festival.image} alt="festivalImg" className={styles.festImg} />
      ) : (
        <img src={NoImage} alt="festivalImg" className={styles.festImg} />
      )}

      <div>{festival.title}</div>
      <div>
        {festival.progress ? (
          <button className={styles.nowBtn}>현재 진행중</button>
        ) : (
          <button className={styles.futureBtn}>진행 예정</button>
        )}
      </div>
    </div>
  );
}

export default FestivalCard;
