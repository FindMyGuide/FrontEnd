import React from 'react';
import styles from './Card.module.css';
import Img from 'asset/images/wanttourImage.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function Card({ title, likes, price, img }) {
  // const title = props.title;
  const like = likes;
  // const imgSrc = props.img;

  return (
    <div className={styles.card}>
      <div style={{ padding: '10px' }}>
        <div className={styles.content}>
          <div>
            <img src={Img} alt="img" className={styles.mainImg} />
          </div>
          <div>
            <FavoriteRoundedIcon className={styles.like} style={{ fill: like ? '#FF6073' : '#FFFFFF' }} />
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <div>￦&nbsp;{price}</div>
      </div>
    </div>
  );
}

export default Card;
