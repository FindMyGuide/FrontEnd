import { React, useEffect, useState } from "react";
import styled from "styled-components";

// API
import { MyTour, MytourReservation } from "api/Mypage/MyGuide";

// 오른쪽 - 가이드 전용
const GuideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  gap: 100px;
`;

// 등록한 투어
function RegisteredTour() {
  const [Tour, setTour] = useState([]);

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchWantTour = async () => {
      try {
        const res = await MyTour();
        setTour(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWantTour();
  }, []);

  console.log(Tour);

  const toursToShow = showMore ? Tour : Tour.slice(0, 3);

  return (
    <div>
      <h4> 등록한 투어 </h4>
      <hr />
    </div>
  );
}

// 예약된 투어
function GuideBookedTour() {
  return (
    <div>
      <h4> 예약된 투어 </h4>
    </div>
  );
}

// 원해요 매칭
function GuideWantList() {
  return (
    <div>
      <h4> 원해요 매칭 </h4>
    </div>
  );
}

// 가이드 전체
function GuideMenu() {
  return (
    <GuideMenuContainer>
      <RegisteredTour />
      <GuideBookedTour />
      <GuideWantList />
    </GuideMenuContainer>
  );
}

export default GuideMenu;
