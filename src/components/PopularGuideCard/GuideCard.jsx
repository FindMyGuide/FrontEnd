import React from 'react';
import styles from './GuideCard.module.css';
import { Link, useNavigate } from 'react-router-dom';

const GuideCard = ({ guideId, name, tour, imageLink }) => {
  const movePage = useNavigate();

  const id = guideId;
  function goToDetailPage() {
    movePage(`/guide/detail/${id}`);
  }
  return (
    <>
      <div className={styles.guideBox} onClick={goToDetailPage}>
        <div></div>
        <h1>{name}</h1>
        <p>{tour}</p>
        <img src={{ imageLink } ? { imageLink } : ''} alt="" />
      </div>
    </>
  );
};

export default GuideCard;
