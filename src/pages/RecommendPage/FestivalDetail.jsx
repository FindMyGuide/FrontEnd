import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FestivalInfo } from 'api/recommend/Recommend';

function FestivalDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    async function fetchFestivalDetail(id) {
      const response = await FestivalInfo(id);
      setInfo(response.data);
    }

    // 지도 초기화 및 표시
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(info.mapY, info.mapX),
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
    const markerPosition = new window.kakao.maps.LatLng(info.mapY, info.mapX);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    fetchFestivalDetail(id);
  }, [id, info.mapX, info.mapY]);

  return (
    <div className="container">
      <img src={info.image} alt="img" />
      장소: {info.place}
      설명: {info.content}
      축제 시작일: {info.startDate}
      유료/무료: {info.expense}
      운영시간: {info.playtime}
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
}

export default FestivalDetail;
