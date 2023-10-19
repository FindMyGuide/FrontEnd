import React from 'react';
import styles from './Card.module.css';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import test from 'asset/images/test.png';
import { useNavigate } from 'react-router';

function Card({ tour }) {
  const movetour = useNavigate();

  function gotour(id) {
    movetour(`/tour/tourdetail/${id}`);
  }

  return (
    <div
      onClick={() => {
        gotour(tour.id);
      }}
      className={styles.card}
    >
      <div style={{ padding: '10px' }}>
        <div className={styles.content}>
          <div>
            {/* <img src={tour.bestImage} alt="img" className={styles.mainImg} /> */}
            <img src={test} alt="img" className={styles.mainImg} />
          </div>
          <div>
            <FavoriteRoundedIcon className={styles.like} style={{ fill: tour.likeExist ? '#FF6073' : '#FFFFFF' }} />
          </div>
        </div>
        <div className={styles.title}>{tour.title}</div>
        <div>￦&nbsp;{tour.price.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default Card;
