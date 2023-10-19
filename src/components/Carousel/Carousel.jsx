import React from 'react';
import Slider from 'react-slick';
import './slick-theme.css';
import './slick.css';

import Card from '../Card/Card';
// import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

// const PrevArrow = ({ onClick }) => {
//   return (
//     <span onClick={onClick}>
//       <ArrowBackIosNewRoundedIcon color="#9e9e9e" />
//     </span>
//   );
// };

// const NextArrow = ({ onClick }) => {
//   return (
//     <span onClick={onClick}>
//       <ArrowForwardIosRoundedIcon color="#9e9e9e" />
//     </span>
//   );
// };

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
        pauseOnHover
        // nextArrow: <NextArrow />
        // prevArrow: <PrevArrow />
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
