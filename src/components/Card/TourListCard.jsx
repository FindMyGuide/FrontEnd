import React from 'react';
import styles from './TourListCard.module.css';
import Img from 'asset/images/wanttourImage.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function TourListCard({ title, likes, price, img }) {
  // const like = likes;
  console.log(typeof likes);

  return (
    <div className={styles.card}>
      <div style={{ padding: '10px', position: 'relative' }}>
        <div className={styles.content}>
          <img src={Img} alt="img" className={styles.mainImg} />
        </div>
        <span className={styles.title}>{title}</span>
        <div className={styles.likeDiv}>
          <FavoriteRoundedIcon className={styles.like} style={{ fill: '#FF6073' }} />
          <span className={styles.likecount}>{likes > 999 ? '(999+)' : likes === '' ? 0 : likes}</span>
        </div>
      </div>
    </div>
  );
}

export default TourListCard;
