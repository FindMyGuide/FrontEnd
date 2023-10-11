import React, { useEffect, useState } from 'react';

import styles from '../AreaPage/AreaPage.module.css';

const AreaPage = () => {
  const { kakao } = window;

  //마커를 담을 배열
  const [keySearchList, setKeySearchList] = useState([]);

  useEffect(() => {
    console.log(1);
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(35.137922, 129.055627), //지도의 중심좌표.
      level: 2 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  });

  return (
    <>
      <div className={styles.areapage}>
        <div className={styles.mapsearch}>
          <p>텍스트</p>
          <p>텍스트</p>
          <p>텍스트</p>
          <p>텍스트</p>
          <p>텍스트</p>
          <input type="text" name="search" id="" className={styles.searcharea} />
        </div>
        <div className={styles.map}>
          <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
        </div>
      </div>
    </>
  );
};

export default AreaPage;
