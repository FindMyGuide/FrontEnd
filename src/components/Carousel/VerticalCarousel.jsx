import React from 'react';
import Slider from 'react-slick';
import './slick-theme.css';
import './slick.css';
import styles from './VerticalCarousel.module.css';
import ReviewCard from 'components/Card/ReviewMain';

function Carousel({ list }) {
  const reviewList = list;

  return (
    <div className={styles.carouselContainer}>
      <Slider
        infinite
        slidesToShow={3}
        slidesToScroll={1}
        speed={500}
        arrows
        autoplay
        autoplaySpeed={3000}
        vertical={true}
      >
        {reviewList?.map((review, index) => (
          <div key={index} className={styles.carouselSlide}>
            <ReviewCard review={review} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
