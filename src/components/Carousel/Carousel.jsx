import React from 'react';
import Slider from 'react-slick';
import Card from 'components/Card/Card';
import './slick-theme.css';
import './slick.css';

function Carousel({ list }) {
  const tourlist = list;

  return (
    <div style={{ width: '1000px' }}>
      <Slider
        infinite
        slidesToShow={3}
        slidesToScroll={1}
        speed={400}
        arrows
        autoplay
        autoplaySpeed={3000}
        // pauseOnHover
      >
        {tourlist?.map((tour, index) => (
          <div key={index}>
            <Card tour={tour} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
