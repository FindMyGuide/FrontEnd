import React from 'react';
import Rating from 'components/Rating/Rating';
import { ReactComponent as NoProfile } from 'asset/icons/noProfile.svg';
import styles from './ReviewCard.module.css';

function ReviewCard({ review }) {
  const content = review.content;
  const rating = review.rating;
  const img = review.imageUrl;

  return (
    <div className={styles.container}>
      {img ? <img src={img} alt="useImg" className={styles.image} /> : <NoProfile className={styles.image} />}
      <div className={styles.content}>
        <Rating value={rating} />
        <div>{content}</div>
      </div>
    </div>
  );
}

export default ReviewCard;
