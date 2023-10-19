import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
import styles from './GuideSearchResult.module.css';
import ResultGuideCard from 'components/PopularGuideCard/ResultGuideCard';
const GuideSearchResult = ({ list }) => {
  console.log(list);
  const guideList = list;
  const slickarrowleft = ({ currentslide, slidecount, ...props }) => (
    <button
      {...props}
      classname={'slick-prev slick-arrow' + (currentslide === 0 ? ' slick-disabled' : '')}
      aria-hidden="true"
      aria-disabled={currentslide === 0 ? true : false}
      type="button"
    >
      previous
    </button>
  );
  const slickarrowright = ({ currentslide, slidecount, ...props }) => (
    <button
      {...props}
      classname={'slick-next slick-arrow' + (currentslide === slidecount - 1 ? ' slick-disabled' : '')}
      aria-hidden="true"
      aria-disabled={currentslide === slidecount - 1 ? true : false}
      type="button"
    >
      next
    </button>
  );
  return (
    <div className={styles.resultbox}>
      <Slider
        dots
        slidesToShow={3}
        slidesToScroll={3}
        speed={400}
        arrows
        rows={2}
        className={styles.lll}

        // prevArrow={() => slickarrowleft}
        // nextArrow={() => slickarrowright}
      >
        {guideList?.map((guide) => (
          <ResultGuideCard
            key={parseInt(guide.guideId)}
            guideId={guide?.guideId}
            name={guide?.guideName}
            tour={guide?.tourProductTitles[0]?.title}
          ></ResultGuideCard>
        ))}
      </Slider>
    </div>
  );
};

export default GuideSearchResult;
