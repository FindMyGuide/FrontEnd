import styles from '../AreaPage/AreaPage.module.css';
import TourAll from 'api/tour/Tour';

import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { cleanString } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import { Input, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { AccountCircle, SearchOff, SearchOutlined } from '@mui/icons-material';

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

  return (
    <>
      <div className={styles.areapage}>
        <div className={styles.mapsearch}>
          <OutlinedInput
            placeholder="검색어를 입력해주세요"
            id="outlined-with-icon-adornment"
            size="small"
            endAdornment={
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            }
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
            lat: 35.121059,
            lng: 129.043993
          }}
          className={styles.map}
          level={7} // 지도의 확대 레벨
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
