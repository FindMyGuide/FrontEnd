import Rating from 'components/Rating/Rating';
import { ReactComponent as NoProfile } from 'asset/icons/noProfile.svg';
import styles from './ReviewMain.module.css';

function ReviewMain({ review }) {
  const displayContent = review.content.length > 115 ? `${review.content.slice(0, 114)}...` : review.content;

  return (
    <div className={styles.container}>
      <div style={{ width: '15%', display: 'flex' }}>
        {review.imageUrl ? (
          <img src={review.imageUrl} alt="useImg" className={styles.image} />
        ) : (
          <NoProfile className={styles.image} />
        )}
      </div>
      <div className={styles.content}>
        <Rating value={review.rating} />
        <div>{displayContent}</div>
      </div>
    </div>
  );
}

export default ReviewMain;
