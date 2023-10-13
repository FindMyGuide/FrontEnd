import React from 'react';
import GuideCard from './GuideCard';
import styles from './GuideCard.module.css';

function GuideCards({ guideList }) {
  return (
    <div>
      {guideList?.map((guide, index) => (
        <div key={index} className={styles.guideCardWrapper}>
          <GuideCard guide={guide} />
        </div>
      ))}
    </div>
  );
}

export default GuideCards;
