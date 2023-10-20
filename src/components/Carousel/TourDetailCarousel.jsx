// TourDetailCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';

function TourDetailCarousel({ images = [] }) {
  console.log(images);
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Slider infinite slidesToScroll={1} speed={800} arrows autoplay autoplaySpeed={3000}>
        {images.map((imageSrc, index) => (
          <div key={imageSrc} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imageSrc} alt="festival_img" style={{ width: '460px', height: '460px' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TourDetailCarousel;
