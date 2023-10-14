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
  MemberWantTour,
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

const LastTourContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const CardContainer = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 20px;
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

const SlideContainer = styled.div`
  display: flex;
`;

// 지난 투어
const ShowButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: #4281ff;
  color: white;
  border: 1px solid white;
  font-weight: bold;
`;

// 원해요 목록
const MemberWantContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 30px;
`;

const WantList = styled.div`
  display: flex;
  margin: 15px 0px;
  font-weight: bold;
  gap: 30px;
`;

const WantTitle = styled.div`
  width: 300px;
`;

const WantBasicButton = styled.button`
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: 0px;
  color: white;
`;

const ChatButton = styled(WantBasicButton)`
  background-color: #48bcea;
`;

const StatusButton = styled(WantBasicButton)`
  background-color: #e2e201;
  width: 80px;
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

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

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

  const toursToShow = showMore ? lastTour : lastTour.slice(0, 3);

  return (
    <div>
      <h4>지난 투어</h4>

      <LastTourContainer>
        <CardContainer>
          {toursToShow.map((tour) => (
            <Card key={tour.id} tour={tour} />
          ))}
        </CardContainer>
        {showMore ? (
          <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
        ) : (
          <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
        )}
      </LastTourContainer>
    </div>
  );
}

// 좋아요한 투어
function MemberLikeTour() {
  const [likeTours, setLikeTours] = useState([]);

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchLikeTours = async () => {
      try {
        const res = await LikeTour();
        setLikeTours(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLikeTours();
  }, []);

  const toursToShow = showMore ? likeTours : likeTours.slice(0, 3);

  // console.log(likeTours);

  return (
    <div>
      <h4>좋아요한 투어</h4>

      <LastTourContainer>
        <CardContainer>
          {toursToShow.map((tour) => (
            <Card key={tour.id} tour={tour} />
          ))}
        </CardContainer>
        {showMore ? (
          <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
        ) : (
          <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
        )}
      </LastTourContainer>
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
  const [wantTour, setWantTour] = useState([]);

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchWantTour = async () => {
      try {
        const res = await MemberWantTour();
        setWantTour(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWantTour();
  }, []);

  const toursToShow = showMore ? wantTour : wantTour.slice(0, 3);

  // console.log(wantTour);

  return (
    <div>
      <h4>원해요 글 목록</h4>
      <MemberWantContainer>
        <div>
          {toursToShow.length > 0 &&
            toursToShow.map((tour) => (
              <WantList key={tour.id}>
                <WantTitle>{tour.title}</WantTitle>
                <div>{moment(tour.createAt).format("YYYY.MM.DD")}</div>
                <ChatButton>채팅하기 </ChatButton>
                <StatusButton>상태</StatusButton>
              </WantList>
            ))}
        </div>
        {showMore ? (
          <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
        ) : (
          <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
        )}
      </MemberWantContainer>
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
