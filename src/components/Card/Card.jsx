import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LanguageIcon from '@mui/icons-material/Language';
import test from 'asset/images/test.png';
import { TourLike } from 'api/tour/Tour';


function Card({ tour }) {
  const navigate = useNavigate();
  const onClickHandler = (id) => {
    navigate(`/tour/tourdetail/${id}`);
  };
  const onLikeHandler = (tourId) => {
    TourLike(tourId);
  };

  return (
    <div className={styles.card}>
      <div style={{ padding: "10px" }}>
        <div className={styles.content}>
          <div>
            {/* <img src={tour.bestImage} alt="img" className={styles.mainImg} /> */}
            <img src={test} alt="img" className={styles.mainImg} />
          </div>
          <div>
            <FavoriteRoundedIcon
              className={styles.like}
              style={{ fill: tour.likeExist ? "#FF6073" : "#FFFFFF" }}
            />
          </div>
        </div>
        <div className={styles.title}>{tour.title}</div>
        <div style={{ fontSize: '15px' }}>
          {tour.themes ? (
            <div>
              {tour.themes.map((theme, index) => (
                <div key={index} className={styles.theme}>
                  #{theme}&nbsp;
                </div>
              ))}
            </div>
          ) : null}
          <div style={{ color: '#8D8D8D' }}>
            <LanguageIcon style={{ fill: '#8D8D8D', marginRight: '3px' }} />
            {tour.languages.length > 2 ? (
              <>
                {tour.languages.slice(0, 2).join(', ')} (+{tour.languages.length - 2})
              </>
            ) : (
              tour.languages.join(', ')
            )}
          </div>
          <div>
            <FavoriteRoundedIcon style={{ fill: '#FF6073', marginRight: '3px' }} />
            {tour.likes}
          </div>
          <div></div>
          <div style={{ textAlign: 'end' }}>￦&nbsp;{tour.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
