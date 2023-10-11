import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TourDetail } from '../../api/tour/Tour';

function TourDetailPage() {
  const tourId = useParams().id;
  const [tourDetail, setTourDetail] = useState([]);

  console.log('check', tourId);
  useEffect(() => {
    (async () => {
      const data = await TourDetail(tourId);
      if (data) {
        setTourDetail(data);
      }
    })();
  }, [tourId]);
  return <div>hi</div>;
}

export default TourDetailPage;
