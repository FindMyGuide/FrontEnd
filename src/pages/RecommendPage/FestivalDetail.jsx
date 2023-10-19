import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FestivalInfo } from 'api/recommend/Recommend';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import NoImage from 'asset/images/NoImage2.png';
import FormatDay from 'components/Format/FormatDay';
import styles from './RecommendDetail.module.css';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';

function FestivalDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFestivalDetail(id) {
      const festivalDetail = await FestivalInfo(id);
      setInfo(festivalDetail);
      console.log(festivalDetail);

      // 지도 초기화 및 표시
      if (festivalDetail.mapX && festivalDetail.mapY) {
        const container = document.getElementById('map');

        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(festivalDetail.mapY, festivalDetail.mapX),
            level: 3
          };
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(festivalDetail.mapY, festivalDetail.mapX);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);
        }
      }

      setLoading(false);
    }

    fetchFestivalDetail(id);
  }, [id, info.mapX, info.mapY]);

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className={styles.parentContainer}>
                <Link to="/recommend/festival">
                  <Prev />
                </Link>
                <div className={styles.title}>{info.title}</div>
              </div>
              <hr />
              <div style={{ padding: '50px' }}>
                <div className="center">
                  {info.image !== undefined ? (
                    <img
                      src={info.image}
                      alt="img"
                      className={`${
                        info.image.naturalWidth > info.image.naturalHeight ? styles.festImg : styles.festPoster
                      }`}
                    />
                  ) : info.image === '' ? (
                    <img src={NoImage} alt="img" className={styles.festPoster} />
                  ) : null}
                </div>
                <div style={{ marginTop: '50px' }}>
                  {info.content ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>축제 설명</div>
                      <div dangerouslySetInnerHTML={{ __html: info.content }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.expense ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>유료/무료</div>
                      <div dangerouslySetInnerHTML={{ __html: info.expense }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.startDate ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>축제 시작일</div>
                      <div className={styles.festivalContent}>
                        {info.startDate !== undefined ? <FormatDay startDate={info.startDate} /> : null}
                      </div>
                    </div>
                  ) : null}
                  {info.playtime ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>운영시간</div>
                      <div dangerouslySetInnerHTML={{ __html: info.playtime }} className={styles.festivalContent} />
                    </div>
                  ) : null}
                  {info.mapX && info.mapY ? (
                    <div className={styles.flex}>
                      <div className={styles.subtitle}>장소</div>
                      <div className={styles.festivalContent}>
                        {info.place ? (
                          <div dangerouslySetInnerHTML={{ __html: info.place }} style={{ marginBottom: '10px' }} />
                        ) : null}
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

export default FestivalDetail;
