import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../Card/Card';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const PrevArrow = ({ onClick }) => {
  return (
    <span onClick={onClick}>
      <ArrowBackIosNewRoundedIcon color="#9e9e9e" />
    </span>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <span onClick={onClick}>
      <ArrowForwardIosRoundedIcon color="#9e9e9e" />
    </span>
  );
};

function Carousel(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div style={{ width: '1000px' }}>
      <Slider {...settings}>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
