import React from 'react';
import styles from './Card.module.css';
import Img from '../../asset/images/wanttourImage.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function Card(props) {
  const title = props.title;
  const like = props.like;
  const imgSrc = props.image;

  return (
    <div className={styles.card}>
      <div style={{ padding: '10px' }}>
        <div className={styles.content}>
          <img src={Img} alt="img" className={styles.mainImg} />
          <div className={styles.likebg}>
            <FavoriteRoundedIcon className={styles.like} style={{ fill: like ? '#FF6073' : '#767676' }} />
          </div>
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
}

export default Card;
