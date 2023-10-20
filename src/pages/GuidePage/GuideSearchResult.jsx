import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';

import ResultGuideCard from 'components/PopularGuideCard/ResultGuideCard';
import RowResultGuideCard from 'components/PopularGuideCard/RowResultGuide';
const GuideSearchResult = ({ list }) => {
  const guideList = list;

  return (
    <>
      {guideList?.length <= 6 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {guideList?.map((guide) => (
            <RowResultGuideCard
              key={parseInt(guide.guideId)}
              guideId={guide?.guideId}
              name={guide?.guideName}
              tour={guide?.tourProductInformation[0]?.price}
              imageLink={guide?.profilePicture}
              price={guide?.tourProductInformation[0]?.price}
            ></RowResultGuideCard>
          ))}
        </div>
      ) : (
        <Slider dots slidesToShow={3} slidesToScroll={3} speed={400} arrows rows={2}>
          {guideList?.map((guide) => (
            <ResultGuideCard
              key={parseInt(guide.guideId)}
              guideId={guide?.guideId}
              name={guide?.guideName}
              tour={guide?.tourProductInformation[0]?.title}
              imageLink={guide?.profilePicture}
              price={guide?.tourProductInformation[0]?.price}
            ></ResultGuideCard>
          ))}
        </Slider>
      )}
    </>
  );
};

export default GuideSearchResult;
