import React from 'react';
import styles from './Recommend.module.css';

function LocationCard({ location }) {
  return (
    <div className={styles.festCard}>
      <img src={location.image} alt="locationImg" className={styles.locationImg} />
      <div className={styles.locationTitle}>{location.title}</div>
    </div>
  );
}

export default LocationCard;
