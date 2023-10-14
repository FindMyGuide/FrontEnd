import React from 'react';

function FormatTime({ dateTimeString }) {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';
    const formattedDate = `${year}년 ${month}월 ${day}일`;
    const formattedTime = `${period} ${hours % 12 || 12}시 ${minutes}분`;

    return `${formattedDate} ${formattedTime}`;
  };

  const formattedDateTime = formatDateTime(dateTimeString);

  return <span>{formattedDateTime}</span>;
}

export default FormatTime;
