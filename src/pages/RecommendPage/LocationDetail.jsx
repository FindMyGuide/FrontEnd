import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TravelInfo } from 'api/recommend/Recommend';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Copy } from 'asset/icons/copy.svg';
import NoImage from 'asset/images/NoImage2.png';
import styles from './RecommendDetail.module.css';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';

function LocationDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTravelDetail(id) {
      const locationDetail = await TravelInfo(id);
      console.log(locationDetail);
      setInfo(locationDetail);

      // 지도 초기화 및 표시
      if (locationDetail.mapX && locationDetail.mapY) {
        const container = document.getElementById('map');

        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(locationDetail.mapY, locationDetail.mapX),
            level: 3
          };
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(locationDetail.mapY, locationDetail.mapX);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);
        }
      }

      setLoading(false);
    }

    fetchTravelDetail(id);
  }, [id]);

  const handleCopyClipBoard = async (text) => {
    if (text !== null) {
      try {
        await navigator.clipboard.writeText(text);
        alert('클립보드에 복사되었습니다.');
      } catch (error) {
        alert('복사에 실패하였습니다.');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className={styles.parentContainer}>
                <Link to="/recommend/location">
                  <Prev />
                </Link>
                <div className={styles.title}>{info.title}</div>
              </div>
              <hr />
              <div style={{ padding: '50px' }}>
                <div className="center">
                  {info.image !== undefined ? (
                    <img src={info.image} alt="img" className={styles.festImg} />
                  ) : info.image === '' ? (
                    <img src={NoImage} alt="img" className={styles.festImg} />
                  ) : null}
                </div>
                <div style={{ marginTop: '50px' }}>
                  {info.infoText ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>설명</div>
                      <div dangerouslySetInnerHTML={{ __html: info.infoText }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.parking ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>주차</div>
                      <div dangerouslySetInnerHTML={{ __html: info.parking }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.restDate ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>휴무일</div>
                      <div dangerouslySetInnerHTML={{ __html: info.restDate }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.useTime ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>개방시간</div>
                      <div dangerouslySetInnerHTML={{ __html: info.useTime }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.infoCenter ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>안내센터</div>
                      <div className={styles.festivalContent} onClick={() => handleCopyClipBoard(info.infoCenter)}>
                        {info.infoCenter} <Copy className={styles.copy} />
                      </div>
                    </div>
                  ) : null}
                  {info.mapX && info.mapY ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>위치 보기</div>
                      <div className={styles.festivalContent}>
                        <div id="map" style={{ width: '100%', height: '400px', borderRadius: '5px' }}></div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;
