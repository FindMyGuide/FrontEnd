/* global kakao */
import { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Grid } from '@mui/material';
import styles from './TourRegistLocation.module.css';

function TourRegistLocation({ onLocationSelect, searchWord, day }) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  if (searchWord === '') {
    searchWord = '부산시청';
  }

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, searchWord]);

  const onLocation = () => {
    onLocationSelect({
      title: info.content,
      coordinates: [info.position.lat, info.position.lng],
      date: `${day}`
    });
    setInfo({});
  };
  // 커스텀 오버레이가 표시될 위치입니다
  var position = info && info.position ? new kakao.maps.LatLng(info.position.lat, info.position.lng) : null;

  // position이 유효한 경우에만 커스텀 오버레이를 생성합니다
  var customOverlay = position
    ? new kakao.maps.CustomOverlay({
        position: position,
        content: info.content
      })
    : null;

  return (
    <div>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: '100%',
          height: '350px'
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
              setInfo(marker);
            }}
          >
            {info && info.position && info.content === marker.content && (
              <div
                style={{
                  border: '3px solid #90d2f0',
                  // borderRadius: '3px',
                  backgroundColor: '#90d2f0',
                  width: '220px',
                  maxWidth: '220px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {info.content}
                <button className={styles.addButton} onClick={onLocation}>
                  추가
                </button>
                {/* <AddCircleOutlineIcon onClick={onLocation} /> */}
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
export default TourRegistLocation;
