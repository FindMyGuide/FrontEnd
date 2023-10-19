import styles from '../AreaPage/AreaPage.module.css';
import { CustomOverlayMap, Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { SearchArea } from 'api/searcharea/SearchArea';
import AreaSearchList from './AreaSearchList';

const AreaPage = () => {
  const [position, setPosition] = useState([35.121059, 129.043993]);
  // 지도의 중심좌표

  const [tourList, setTourList] = useState([]);
  const [info, setInfo] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const alphabetlist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const CustomContainer = ({ position, content }) => {
    const lat = position.lat;
    const lng = position.lng;
    const information = content;
    return (
      <>
        <MapMarker
          position={position} // 마커를 표시할 위치
          // @ts-ignore
          onClick={() => {
            setIsOpen(true);
          }}
        ></MapMarker>

        {isOpen && (
          <CustomOverlayMap information={information} position={{ lat: lat, lng: lng }} yAnchor={1.3}>
            <div className={styles.areawrap}>
              <div className={styles.areainfo}>
                <div className={styles.areatitlebox}>
                  <b>{information.title}</b>
                  <div className={styles.areaclose} onClick={() => setIsOpen(false)} title="닫기">
                    닫기
                  </div>
                </div>
                <div className={styles.areabody}>
                  {information.content}
                  <div className="desc">
                    <div className="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                    <div className="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </>
    );
  };
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
                      SearchArea(e.target.value)
                        .then((getSearch) => {
                          if (getSearch?.tourProductResponses?.length !== 0) {
                            console.log(getSearch);
                            console.log('성공');
                            setInfo([]);
                            const searchResultList = getSearch;
                            setInfo(searchResultList);
                            setPosition([
                              searchResultList.tourProductResponses[0]?.locations[0]?.mapX,
                              searchResultList.tourProductResponses[0]?.locations[0]?.mapY
                            ]);
                          } else {
                            console.log('실패');
                            setInfo([]);
                            setPosition([35.121059, 129.043993]);
                          }
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
                      if (getSearch?.tourProductResponses?.length !== 0) {
                        console.log(getSearch);
                        console.log('성공');
                        setInfo([]);
                        const searchResultList = getSearch;
                        setInfo(searchResultList);
                        setPosition([
                          searchResultList.tourProductResponses[0]?.locations[0]?.mapX,
                          searchResultList.tourProductResponses[0]?.locations[0]?.mapY
                        ]);
                      } else {
                        console.log('실패');
                        setInfo([]);
                        setPosition([35.121059, 129.043993]);
                      }
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
          <div className={styles.tourlisttext}>
            <span>투어 리스트 </span>
            {info.length !== 0 ? (
              <span style={{ fontSize: '12px' }}>{info?.tourProductResponses?.length}건</span>
            ) : null}
          </div>
          {info?.tourProductResponses?.slice(0, 10).map((tourList, idx) => (
            <AreaSearchList key={tourList.id} tourList={tourList} alpha={alphabetlist[idx]}></AreaSearchList>
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
            <CustomContainer
              key={tourlocation.id}
              position={{ lat: tourlocation.locations[0]?.mapX, lng: tourlocation.locations[0]?.mapY }} // 마커를 표시할 위치
              content={tourlocation}
            />
          ))}
        </Map>
      </div>
    </>
  );
};

export default AreaPage;
