import React from 'react';
import Slider from 'react-slick';
import './slick-theme.css';
import './slick.css';
import Card from 'components/Card/Card';

function Carousel({ list }) {
  console.log(list, '리스트 확인');
  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <Slider
        infinite
        slidesToShow={Math.min(3, list.length)}
        slidesToScroll={1}
        speed={400}
        arrows
        autoplay
        autoplaySpeed={3000}
      >
        {list?.map((tour, index) => (
          <div key={index}>
            <Card tour={tour} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
