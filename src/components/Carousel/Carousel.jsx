import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

function Carousel(props) {
  const list = props;

  return (
    <div style={{ width: '1000px' }}>
      {/* <Slider
        infinite
        slidesToShow={3}
        slidesToScroll={1}
        speed={400}
        arrows
        autoplay
        autoplaySpeed={3000}
        prevArrow={
          <button type="button" className="slick-prev">
            Previous
          </button>
        }
        nextArrow={
          <button type="button" className="slick-next">
            Next
          </button>
        }
      >
        {list?.map((api) => (
          <div>
            <Card apiId={api.apiId} title={api.title} category={api.category} />
          </div>
        ))}
      </Slider> */}
    </div>
  );
}

export default Carousel;
