import React from 'react';
import styles from './AreaSearchList.module.css';

const AreaSearchList = (props) => {
  console.log(props);
  const alphabet = props.alpha;
  const tour = props.tourList;

  return (
    <div style={{ position: 'relative' }}>
      <hr style={{ marginBottom: '5px' }} />
      <img style={{ position: 'absolute', top: '10px', right: '5px', width: '60px' }} src={tour.guidePicture} alt="" />
      <div className={styles.toursearchlist}>
        <div>
          <b>
            {alphabet}. {tour.title}
          </b>
          <p style={{ paddingLeft: '3px' }}>{tour.guideName}</p>
          <p style={{ paddingLeft: '3px' }}>{tour.content}</p>
        </div>
      </div>
    </div>
  );
};

export default AreaSearchList;
