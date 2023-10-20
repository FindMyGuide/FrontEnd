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
          {guideList?.map((guideinfo) => (
            <RowResultGuideCard key={parseInt(guideinfo.guideId)} guide={guideinfo}></RowResultGuideCard>
          ))}
        </div>
      ) : (
        <Slider dots slidesToShow={3} slidesToScroll={3} speed={400} arrows rows={2}>
          {guideList?.map((guideinfo) => (
            <ResultGuideCard key={parseInt(guideinfo.guideId)} guide={guideinfo}></ResultGuideCard>
          ))}
        </Slider>
      )}
    </>
  );
};

export default GuideSearchResult;
