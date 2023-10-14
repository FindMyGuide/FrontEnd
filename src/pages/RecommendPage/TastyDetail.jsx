import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TastyInfo } from 'api/recommend/Recommend';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Copy } from 'asset/icons/copy.svg';
import styles from './RecommendDetail.module.css';

function TastyDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function fetchTastyDetail(id) {
      const tastyDetail = await TastyInfo(id);
      console.log(tastyDetail);
      setInfo(tastyDetail);

      // 지도 초기화 및 표시
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(info.mapx, info.mapy),
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(info.mapx, info.mapy);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    }

    fetchTastyDetail(id);
  }, [id, info.mapx, info.mapy]);

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
          <div className={styles.parentContainer}>
            <Link to="/recommend/tasty">
              <Prev />
            </Link>
            <div className={styles.title}>{info.title}</div>
          </div>
          <hr />
          <div style={{ padding: '50px', display: 'flex' }}>
            <div
              id="map"
              style={{ width: '55%', height: '400px', borderRadius: '5px', marginRight: '20px' }}
              className="center"
            ></div>
            <div style={{ width: '45%' }}>
              {info.restaurantLcnc || info.restaurantCode ? (
                <div className={styles.flex}>
                  <div className={styles.tastySub}>가게 분류</div>
                  <div className={styles.festivalContent}>
                    {info.restaurantLcnc} {info.restaurantCode}
                  </div>
                </div>
              ) : null}
              {info.introduce ? (
                <div className={styles.flex}>
                  <div className={styles.tastySub}>가게 소개</div>
                  <div dangerouslySetInnerHTML={{ __html: info.introduce }} className={styles.festivalContent} />
                </div>
              ) : null}
              {info.address ? (
                <div className={styles.flex}>
                  <div className={styles.tastySub}>가게 주소</div>
                  <div className={styles.festivalContent}>{info.address}</div>
                </div>
              ) : null}
              {info.telNo ? (
                <div className={styles.flex}>
                  <div className={styles.tastySub}>전화번호</div>
                  <div className={styles.festivalContent} onClick={() => handleCopyClipBoard(info.telNo)}>
                    {info.telNo} <Copy className={styles.copy} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TastyDetail;
