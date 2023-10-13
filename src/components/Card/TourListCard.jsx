import React from 'react';
import styles from './TourListCard.module.css';
import Img from 'asset/images/wanttourImage.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function TourListCard({ title, likes, price, img }) {
  // const like = likes;

  return (
    <div className={styles.card}>
      <div style={{ padding: '10px' }}>
        <div className={styles.content}>
          <img src={Img} alt="img" className={styles.mainImg} />
        </div>
        <span className={styles.title}>{title}</span>
        <FavoriteRoundedIcon className={styles.like} style={{ fill: '#FF6073' }} />
        <span className={styles.likecount}>({likes < 999 ? '999+' : likes})</span>
      </div>
    </div>
  );
}

export default TourListCard;
