import React from 'react';

function FormatDay({ startDate }) {
  const year = startDate.slice(0, 4);
  const month = startDate.slice(4, 6);
  const day = startDate.slice(6, 8);

  const formattedDateString = `${year}년 ${month}월 ${day}일`;

  return <div>{formattedDateString}</div>;
}

export default FormatDay;
