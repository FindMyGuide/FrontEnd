import React from 'react';
import styles from './Recommend.module.css';

function TastyCard({ tasty }) {
  return (
    <div className={styles.tastyCard}>
      <div className={styles.tastyTitle}>{tasty.title}</div>
      {tasty.restaurantLcnc ? <div>{tasty.restaurantLcnc}</div> : <div>&nbsp;</div>}
      {tasty.restaurantCode ? <div>{tasty.restaurantCode}</div> : <div>&nbsp;</div>}
      {tasty.address ? <div>{tasty.address}</div> : <div>&nbsp;</div>}
    </div>
  );
}

export default TastyCard;
