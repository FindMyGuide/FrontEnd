import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import Card from "../../components/Card/Card";

// 캐러셀
import "./MyPageCarousel.css";
import { Carousel } from "react-responsive-carousel";

// Slice
import { setLastTour } from "../../slices/LastTourSlice";
import { setUpComingTour } from "slices/UpcomingTourSlice";

// Icon
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

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
  border-radius: 0px 10px 10px 10px;
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 오른쪽 - MemberBookedTour
const MemberTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
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

  // Carousel의 현재 슬라이드 인덱스 상태
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <MemberTitle>
        <AirplanemodeActiveIcon style={{ color: "#0073ff99" }} />
        <h4 style={{ fontWeight: "bold" }}>예정된 투어</h4>
      </MemberTitle>

      {upComingTour.length > 0 ? (
        <Carousel
          swipeable={true}
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          emulateTouch={true}
          width={"800px"}
          // onChange event handler 추가
          onChange={(index) => setCurrentSlide(index)}
        >
          {upComingTour.length > 0 &&
            upComingTour.map((tour, index) => (
              <SlideContainer key={tour.index}>
                <MemberBookedTourContainer>
                  <Calendar
                    onChange={onChange}
                    // 현재 슬라이드와 맵핑되는 투어의 첫 번째 예약 날짜로 설정
                    value={
                      currentSlide === index &&
                      tour.reservedDates &&
                      tour.reservedDates[0]
                        ? new Date(tour.reservedDates[0])
                        : value
                    }
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
                      <h4 style={{ fontWeight: "bold" }}>
                        {moment(tour.reservedDates[0]).diff(moment(), "days") <=
                        0
                          ? "현재 여행 중입니다."
                          : `${moment(tour.reservedDates[0]).diff(
                              moment(),
                              "days"
                            )}일 뒤 예정된 투어가 있습니다`}
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
      ) : (
        <p>예정된 투어가 없습니다.</p>
      )}
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
    <SectionContainer>
      <MemberTitle>
        <BusinessCenterIcon style={{ color: "#8e4000" }} />
        <h4 style={{ fontWeight: "bold" }}>지난 투어</h4>
      </MemberTitle>

      {lastTour.length > 0 ? (
        <LastTourContainer>
          <CardContainer>
            {toursToShow.map((tour) => (
              <Card key={tour.id} tour={tour} />
            ))}
          </CardContainer>
          {lastTour.length > 3 &&
            (showMore ? (
              <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
            ) : (
              <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
            ))}
        </LastTourContainer>
      ) : (
        <p>지난 투어가 없습니다.</p>
      )}
    </SectionContainer>
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
      <MemberTitle>
        <FavoriteIcon style={{ color: "red" }} />
        <h4 style={{ fontWeight: "bold" }}>좋아요한 투어</h4>
      </MemberTitle>
      {likeTours.length > 0 ? (
        <LastTourContainer>
          <CardContainer>
            {toursToShow.map((tour) => (
              <Card key={tour.id} tour={tour} />
            ))}
          </CardContainer>
          {likeTours.length > 3 &&
            (showMore ? (
              <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
            ) : (
              <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
            ))}
        </LastTourContainer>
      ) : (
        <p>좋아요한 투어가 없습니다.</p>
      )}
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
      <MemberTitle>
        <FavoriteIcon style={{ color: "red" }} />
        <h4 style={{ fontWeight: "bold" }}>좋아요한 가이드</h4>
      </MemberTitle>
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
      <MemberTitle>
        <ContentPasteIcon />
        <h4 style={{ fontWeight: "bold" }}>원해요 글 목록</h4>
      </MemberTitle>
      {wantTour.length > 0 ? (
        <MemberWantContainer>
          <div>
            {toursToShow.length > 0 &&
              toursToShow.map((tour) => (
                <WantList key={tour.id}>
                  <WantTitle>{tour.title}</WantTitle>
                  <div>{moment(tour.createAt).format("YYYY.MM.DD")}</div>
                  <ChatButton>채팅하기 </ChatButton>
                  {tour.isReserved ? (
                    <StatusButton>예약 완료</StatusButton>
                  ) : (
                    <StatusButton>대기</StatusButton>
                  )}
                </WantList>
              ))}
          </div>
          {wantTour.length > 3 && showMore ? (
            <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
          ) : wantTour.length > 3 && !showMore ? (
            <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
          ) : null}
        </MemberWantContainer>
      ) : (
        <p>원해요 글이 없습니다.</p>
      )}
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
