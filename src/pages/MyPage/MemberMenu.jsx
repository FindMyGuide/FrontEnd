import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import Card from "../../components/Card/Card";
// import { ReactComponent as heartIcon } from "../../asset/Icon/heart.svg";

// 캐러셀
import "./MyPageCarousel.css";
import { Carousel } from "react-responsive-carousel";

// Slice
import { setLastTour } from "../../slices/LastTourSlice";
import { setUpComingTour } from "slices/UpcomingTourSlice";

// API
import {
  UpcomingTours,
  CompletedTours,
  LikeGuide,
  LikeTour,
} from "../../api/Mypage/MyUser";

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

const SlideContainer = styled.div`
  display: flex;
  /* width: 300px; */
`;

// 회원 전용
// 에정된 투어
function MemberBookedTour() {
  // 예정투어 정보 받기
  const dispatch = useDispatch();
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchUpcomingToursInformation = async () => {
      try {
        const res = await UpcomingTours();
        dispatch(setUpComingTour(res.data));

        let allReservedDates = [];
        res.data.forEach((tour) => {
          if (tour.reservedDates) {
            allReservedDates.push(...tour.reservedDates);
          }
        });
        setMarks(allReservedDates); // useState로 선언한 setMarks 사용
      } catch (e) {
        console.error(e);
      }
    };

    fetchUpcomingToursInformation();
  }, [dispatch]);

  const upComingTour = useSelector((state) => state.upComingTour);
  console.log(upComingTour);

  const [value, onChange] = useState(new Date());

  // 캐러셀

  return (
    <div>
      <MemberBookedTourTitle>
        {/* <heartIcon /> */}
        <h4>예정된 투어</h4>
      </MemberBookedTourTitle>

      <Carousel
        swipeable={true}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        emulateTouch={true}
        width={"800px"}
      >
        {upComingTour.length > 0 &&
          upComingTour.map((tour) => (
            <SlideContainer>
              <MemberBookedTourContainer key={tour.id}>
                <Calendar
                  onChange={onChange}
                  value={value}
                  formatDay={(locale, date) => moment(date).format("DD")}
                  tileClassName={({ date, view }) => {
                    if (
                      tour.reservedDates.find(
                        (x) => x === moment(date).format("YYYY-MM-DD")
                      )
                    ) {
                      return "highlight";
                    }
                  }}
                />
                <BookedTourBody>
                  {tour.reservedDates && tour.reservedDates[0] && (
                    <h4 style={{ color: "blue" }}>
                      {moment(tour.reservedDates[0]).diff(moment(), "days")}일
                      뒤 예정된 투어가 있습니다
                    </h4>
                  )}

                  {!tour.reservedDates ||
                    (!tour.reservedDates[0] && (
                      <h4>예정된 투어 정보가 없습니다.</h4>
                    ))}
                  <Card tour={tour} />
                </BookedTourBody>
              </MemberBookedTourContainer>
            </SlideContainer>
          ))}
      </Carousel>
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
  // console.log(lastTour);

  return (
    <div>
      <h4>지난 투어</h4>
      <CardContainer>
        {/* <Card />
        <Card /> */}
      </CardContainer>
    </div>
  );
}

// 좋아요한 투어
function MemberLikeTour() {
  const [likeTours, setLikeTours] = useState([]);

  useEffect(() => {
    const fetchLikeTours = async () => {
      try {
        const res = await LikeGuide();
        setLikeTours(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLikeTours();
  }, []);

  // console.log(likeTours);

  return (
    <div>
      <h4>좋아요한 투어</h4>
      <CardContainer>
        {/* <Card />
        <Card /> */}
      </CardContainer>
    </div>
  );
}

// 좋아요한 가이드
function MemberLikeGuide() {
  const [likeGuides, setLikeGuides] = useState([]);

  useEffect(() => {
    const fetchLikeGuides = async () => {
      try {
        const res = await LikeGuide();
        setLikeGuides(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchLikeGuides();
  }, []);

  // console.log(likeGuides);
  return (
    <div>
      <h4>좋아요한 가이드</h4>
    </div>
  );
}

// 원해요 글 목록
function MemberWantList() {
  return (
    <div>
      <h4>원해요 글 목록</h4>
    </div>
  );
}

// 회원메뉴
function MemberMenu() {
  return (
    <MemberMenuContainer>
      <MemberBookedTour />
      <LastTour />
      <MemberLikeTour />
      <MemberLikeGuide />
      <MemberWantList />
    </MemberMenuContainer>
  );
}

export default MemberMenu;
