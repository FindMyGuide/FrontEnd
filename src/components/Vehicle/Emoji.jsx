import React from 'react';

function Emoji({ vehicle }) {
  if (vehicle === '자동차') {
    return '🚗 자동차';
  }
  if (vehicle === '대중교통') {
    return '🚌 대중교통';
  }
  if (vehicle === '자전거') {
    return '🚲 자전거';
  }
  if (vehicle === '오토바이') {
    return '🛵 오토바이';
  }
  return '🚶‍♂️ 도보';
}

export default Emoji;
