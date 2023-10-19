import React from 'react';
import GuideCard from './GuideCard';
import styles from './GuideCard.module.css';

function GuideCards({ list }) {
  console.log(list);
  return (
    <div className={styles.guideCardContainer}>
      {list?.map((guide, index) => (
        <div key={index} className={styles.guideCardWrapper}>
          <GuideCard guide={guide} />
        </div>
      ))}
    </div>
  );
}

export default GuideCards;
