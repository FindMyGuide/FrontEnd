import styles from '../AreaPage/AreaPage.module.css';
import TourAll from 'api/tour/Tour';

import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { SearchArea } from 'api/searcharea/SearchArea';

const AreaPage = () => {
  const [position, setPosition] = useState([35.121059, 129.043993]);
  // 지도의 중심좌표

  const [tourList, setTourList] = useState([]);
  const [info, setInfo] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState('');
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

  useEffect(() => {}, [position]);

  return (
    <>
      <div className={styles.areapage}>
        <div className={styles.mapsearch}>
          <OutlinedInput
            sx={{ width: '100%' }}
            placeholder="검색어를 입력해주세요"
            id="outlined-with-icon-adornment"
            size="small"
            endAdornment={
              <InputAdornment sx={{ margin: '0' }} position="end">
                <SearchOutlined
                  sx={{ margin: '0' }}
                  onClick={(e) => {
                    if (keyword === '') {
                      alert('검색어를 입력해주세요');
                    } else {
                      SearchArea(keyword)
                        .then((getSearch) => {
                          const searchResultList = getSearch;
                          console.log(searchResultList);
                          setInfo(searchResultList);
                          setPosition([
                            searchResultList.tourProductResponses[0]?.locations?.mapX,
                            searchResultList.tourProductResponses[0]?.locations?.mapY
                          ]);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }
                  }}
                />
              </InputAdornment>
            }
            className={styles.searcharea}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.target.value === '') {
                  alert('검색어를 입력해주세요');
                } else {
                  SearchArea(e.target.value)
                    .then((getSearch) => {
                      const searchResultList = getSearch;
                      console.log(searchResultList);
                      setInfo(searchResultList);
                      setPosition([
                        searchResultList.tourProductResponses[0]?.locations[0]?.mapX,
                        searchResultList.tourProductResponses[0]?.locations[0]?.mapY
                      ]);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              }
            }}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <div>검색 리스트</div>
          {info?.tourProductResponses?.map((tourList) => (
            <div>{tourList.title}</div>
          ))}
        </div>

        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: position[0],
            lng: position[1]
          }}
          className={styles.map}
          level={7} // 지도의 확대 레벨
        >
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
          {info?.tourProductResponses?.map((tourlocation) => (
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
