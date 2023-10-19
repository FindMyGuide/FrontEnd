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
  const col = props.col;
  const row = props.row;
  const removeLocation = props.removeLocation;

  const onLocationHandler = (col, row) => {
    removeLocation(col, row);
  };
  return (
    <span style={{ marginRight: '15px' }}>
      <Background>{location}</Background>
      <IndeterminateCheckBoxIcon style={{ fill: '#979797' }} onClick={() => onLocationHandler(col, row)} />
    </span>
  );
}

export default Location;
