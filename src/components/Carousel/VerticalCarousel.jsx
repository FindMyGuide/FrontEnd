import React from 'react';
import Slider from 'react-slick';
import './slick-theme.css';
import './slick.css';
import styles from './VerticalCarousel.module.css';
import ReviewCard from 'components/Card/ReviewMain';

function VerticalCarousel({ list }) {
  return (
    <div className={styles.carouselContainer} style={{ height: '150px' }}>
      <Slider
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        speed={500}
        arrows
        autoplay
        autoplaySpeed={3000}
        vertical={true}
        pauseOnHover
        dots
      >
        {list?.map((review, index) => (
          <div key={index} className={styles.carouselSlide}>
            <ReviewCard review={review} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default VerticalCarousel;
