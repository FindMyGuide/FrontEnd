import React from 'react';
import styled from 'styled-components';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const Background = styled.span`
  border: 1px solid #c9c9c9;
  border-radius: 50px;
  padding: 6px 7px 6px 10px;
  display: flex;
  alignitems: center;
`;

function Location(props) {
  const location = props.location;
  const removeLocation = props.removeLocation;

  const onLocationHandler = (location) => {
    removeLocation(location);
  };
  return (
    <Background>
      {location}
      <CancelRoundedIcon style={{ fill: '#C5C5C5', marginLeft: '5px' }} onClick={() => onLocationHandler(location)} />
    </Background>
  );
}

export default Location;
