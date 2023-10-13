import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import Card from "../../components/Card/Card";
// import { ReactComponent as heartIcon } from "../../asset/Icon/heart.svg";

// Slice
import { setLastTour } from "../../slices/LastTourSlice";
import { setUpComingTour } from "slices/UpcomingTourSlice";

// API
import { UpcomingTours, CompletedTours } from "../../api/Mypage/MyUser";

// 오른쪽 - 회원전용
const MemberMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  gap: 100px;
`;

const CardContainer = styled.div`
  display: flex;
`;

// 오른쪽 - MemberBookedTour
const MemberBookedTourTitle = styled.div`
  margin-top: 50px;
`;

const MemberBookedTourContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const BookedTourBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TourDetailButton = styled.button`
  width: 50%;
  height: 5vh;
  color: grey;
  background-color: white;
  border: 1px solid #808080;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
`;

// 회원 전용
function MemberBookedTour() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUpcomingToursInformation = async () => {
      try {
        const res = await UpcomingTours();
        console.log(res.data);
        dispatch(setUpComingTour(res.data));
      } catch (e) {
        console.error(e);
      }
    };

    fetchUpcomingToursInformation();
  }, [dispatch]);

  const upComingTour = useSelector((state) => state.upComingTour);
  console.log(upComingTour);

  const [value, onChange] = useState(new Date());

  const marks = [
    "2023-09-15",
    "2023-09-03",
    "2023-09-07",
    "2023-09-12",
    "2023-09-13",
    "2023-09-15",
  ];

  return (
    <div>
      <MemberBookedTourTitle>
        {/* <heartIcon /> */}
        <h4>예정된 투어</h4>
      </MemberBookedTourTitle>
      <MemberBookedTourContainer>
        <Calendar
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileClassName={({ date, view }) => {
            if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return "highlight";
            }
          }}
        />
        <BookedTourBody>
          <h4> 5일 뒤 예정된 투어가 있습니다</h4>
          <Card />
          <TourDetailButton>투어 자세히 보기</TourDetailButton>
        </BookedTourBody>
      </MemberBookedTourContainer>
    </div>
  );
}

function LastTour() {
  // 완료된 여행 조회
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLastTourtInformatioin = async () => {
      try {
        const res = await CompletedTours();
        dispatch(setLastTour(res.data));
      } catch (e) {
        console.error(e);
      }
    };

    fetchLastTourtInformatioin();
  }, [dispatch]);

  // redux를 이용한 완료된 여행 정보
  const lastTour = useSelector((state) => state.lastTour);
  console.log(lastTour);

  return (
    <div>
      <h4>지난 투어</h4>
      <CardContainer>
        <Card />
        <Card />
      </CardContainer>
    </div>
  );
}

function LikeTour() {
  return (
    <div>
      <h4>좋아요한 투어</h4>
      <CardContainer>
        <Card />
        <Card />
      </CardContainer>
    </div>
  );
}

function LikeGuide() {
  return (
    <div>
      <h4>좋아요한 가이드</h4>
    </div>
  );
}

function MemberWantList() {
  return (
    <div>
      <h4>원해요 글 목록</h4>
    </div>
  );
}

function MemberMenu() {
  return (
    <MemberMenuContainer>
      <MemberBookedTour />
      <LastTour />
      <LikeTour />
      <LikeGuide />
      <MemberWantList />
    </MemberMenuContainer>
  );
}

export default MemberMenu;
