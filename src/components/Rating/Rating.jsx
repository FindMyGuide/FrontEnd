import React from 'react';
import StarIcon from '@mui/icons-material/StarRateRounded';
import StarHalfIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineIcon from '@mui/icons-material/StarOutlineRounded';

function Rating({ value }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(value)) {
      stars.push(<StarIcon key={i} style={{ fill: '#FFDD2A' }} />);
    } else if (i === Math.floor(value) && value % 1 !== 0) {
      stars.push(<StarHalfIcon key={i} style={{ fill: '#FFDD2A' }} />);
    } else {
      stars.push(<StarOutlineIcon key={i} style={{ fill: '#FFDD2A' }} />);
    }
  }

  return <div style={{ marginBottom: '5px' }}>{stars}</div>;
}

export default Rating;
