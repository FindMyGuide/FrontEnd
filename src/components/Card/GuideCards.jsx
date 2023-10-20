import React from 'react';
import GuideCard from './GuideCard';
import styles from './GuideCard.module.css';

function GuideCards({ list }) {
  console.log(list);

  return (
    <div className={styles.guideCardContainer}>
      {list.slice(0, list.length === 6 ? 6 : 3).map((guide, index) => (
        <div key={index} className={styles.guideCardWrapper}>
          <GuideCard guide={guide} />
        </div>
      ))}
    </div>
  );
}

export default GuideCards;
