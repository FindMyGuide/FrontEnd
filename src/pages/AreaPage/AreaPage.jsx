import styles from '../AreaPage/AreaPage.module.css';
import TourAll from 'api/tour/Tour';

import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { cleanString } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

const AreaPage = () => {
  const [position, setPosition] = useState();
  const [tourList, setTourList] = useState([]);
  const [info, setInfo] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  useEffect(() => {
    TourAll()
      .then((getTour) => {
        const getTourList = getTour;
        console.log(getTourList);
        setTourList(getTourList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(`${info}`, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();
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
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);
  return (
    <>
      <div className={styles.areapage}>
        <div className={styles.mapsearch}>
          <input
            type="text"
            name="search"
            id=""
            className={styles.searcharea}
            onChange={(e) => {
              setInfo(e.target.value);
              console.log(info);
            }}
          />
        </div>

        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667
          }}
          className={styles.map}
          level={3} // 지도의 확대 레벨
        >
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
          {tourList?.map((tourlocation) => (
            <MapMarker
              key={tourlocation.id}
              position={{ lat: tourlocation.locations[0]?.mapX, lng: tourlocation.locations[0]?.mapY }} // 마커를 표시할 위치
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35
                } // 마커이미지의 크기입니다
              }}
              title={tourlocation.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
          ))}
        </Map>
      </div>
    </>
  );
};

export default AreaPage;
