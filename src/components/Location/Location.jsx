import React from 'react';
import styled from 'styled-components';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const Background = styled.span`
  background-color: #d9d9d9;
  border-radius: 5px;
  padding: 5px;
`;

function Location(props) {
  const location = props.location;
  const removeLocation = props.removeLocation;

  const onLocationHandler = (location) => {
    removeLocation(location);
  };
  return (
    <span style={{ marginRight: '15px' }}>
      <Background>{location}</Background>
      <IndeterminateCheckBoxIcon style={{ fill: '#979797' }} onClick={() => onLocationHandler(location)} />
    </span>
  );
}

export default Location;
