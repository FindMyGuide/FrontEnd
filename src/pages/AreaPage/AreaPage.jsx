import styles from '../AreaPage/AreaPage.module.css';
import { CustomOverlayMap, Map, MapMarker, MapTypeControl, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { SearchArea } from 'api/searcharea/SearchArea';

const AreaPage = () => {
  const [position, setPosition] = useState([{ lat: 35.121059, lng: 129.043993 }]);
  // 지도의 중심좌표

  const [info, setInfo] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sumLocation, setSumLocation] = useState([]);

  const alphabetlist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  useEffect(() => {
    const sumX = position.map((posi) => parseFloat(posi.lat)).reduce((acc, cur) => acc + cur, 0);
    const sumY = position.map((posi) => parseFloat(posi.lng)).reduce((acc, cur) => acc + cur, 0);
    setSumLocation([Number(sumX / position.length).toFixed(6), Number(sumY / position.length).toFixed(6)]);
    console.log(sumX);
    console.log(sumX / position.length);
    console.log(sumY);
    console.log(sumY / position.length);
    console.log(`여기가 섬${sumLocation}`);
  }, [position]);

  const CustomContainer = ({ position, content, idx }) => {
    const index = idx;
    const lat = position.lat;
    const lng = position.lng;
    const information = content;
    return (
      <>
        {
          <CustomOverlayMap information={information} position={{ lat: lat, lng: lng }} yAnchor={2}>
            <div className={styles.areawrap}>
              <div className={styles.areainfo}>
                <div className={styles.areatitlebox}>
                  <b>
                    {index + 1}. {information}
                  </b>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        }
      </>
    );
  };
  const handlePostion = (tourList) => {
    const tourMarker = tourList;
    console.log(tourMarker);
    const newPositions = tourMarker?.locations.map((tourmarker) => {
      return { lat: tourmarker.mapX, lng: tourmarker.mapY, title: tourmarker.title };
    });
    setPosition(newPositions);
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
                        setInfo([]);
                        const searchResultList = getSearch;
                        setInfo(searchResultList);
                        const newPositions = searchResultList.tourProductResponses[0]?.locations.map((tourmarker) => {
                          return { lat: tourmarker.mapX, lng: tourmarker.mapY, title: tourmarker.title };
                        });
                        console.log(`투어마커${newPositions}`);
                        console.log(`투어마커${newPositions[0]?.lat}`);
                        console.log(`투어마커${newPositions[0]?.lng}`);
                        console.log(`투어마커${newPositions[0]?.title}`);
                        setPosition(newPositions);
                        console.log(searchResultList);
                        setIsOpen(true);
                      } else {
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
            <span className={styles.tourlisttext2}>투어 리스트</span>
            <div>{position[0].lat}</div>
            <div>{position[0].lng}</div>
            {info?.length !== 0 ? (
              <span style={{ marginLeft: '5px', fontSize: '12px' }}>{info?.tourProductResponses?.length}건</span>
            ) : null}
          </div>
          {info?.tourProductResponses?.slice(5, 15).map((tourList, idx) => (
            <div
              key={tourList.id}
              style={{ position: 'relative' }}
              onClick={() => {
                handlePostion(tourList);
              }}
            >
              <hr style={{ marginBottom: '5px' }} />
              <img
                style={{ position: 'absolute', top: '10px', right: '5px', width: '60px' }}
                src={tourList.guidePicture}
                alt=""
              />
              <div className={styles.toursearchlist}>
                <div>
                  <b>
                    {alphabetlist[idx]}. {tourList.title}
                  </b>
                  <p style={{ margin: 0, paddingLeft: '3px' }}>{tourList.guideName}</p>
                  <p style={{ margin: 0, paddingLeft: '3px' }}>{tourList.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Map // 지도를 표시할 Container
          id="map"
          center={
            position.length === 1
              ? {
                  // 지도의 중심좌표
                  lat: position[0].lat,
                  lng: position[0].lng
                }
              : { lat: sumLocation[0], lng: sumLocation[1] }
          }
          className={styles.map}
          level={7} // 지도의 확대 레벨
        >
          <MapTypeControl position={'TOPRIGHT'}></MapTypeControl>
          <ZoomControl position={'RIGHT'}></ZoomControl>

          {isOpen &&
            position?.map((position, index) => (
              <>
                <MapMarker
                  key={`${position.title}-${position.lat}`}
                  position={{ lat: position?.lat, lng: position?.lng }} // 마커를 표시할 위치
                  image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                    size: {
                      width: 24,
                      height: 35
                    } // 마커이미지의 크기입니다
                  }}
                  onMouseOver={() => setIsVisible(true)}
                  onMouseOut={() => setIsVisible(false)}
                ></MapMarker>
                {isVisible && (
                  <CustomContainer
                    idx={index}
                    position={{ lat: position.lat, lng: position.lng }} // 마커를 표시할 위치
                    content={position.title}
                  />
                )}
              </>
            ))}
        </Map>
      </div>
    </>
  );
};

export default AreaPage;
