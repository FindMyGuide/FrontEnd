import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
import fest1 from 'asset/festival/fest1.png';
import fest2 from 'asset/festival/fest2.png';
import fest3 from 'asset/festival/fest3.png';

function FestCarousel() {
  return (
    <div style={{ width: '980px' }}>
      <Slider infinite slidesToScroll={1} speed={800} arrows autoplay autoplaySpeed={3000}>
        <div>
          <img src={fest1} alt="festival_img" style={{ width: '100%' }} />
        </div>
        <div>
          <img src={fest2} alt="festival_img" style={{ width: '100%' }} />
        </div>
        <div>
          <img src={fest3} alt="festival_img" style={{ width: '100%' }} />
        </div>
      </Slider>
    </div>
  );
}

export default FestCarousel;
