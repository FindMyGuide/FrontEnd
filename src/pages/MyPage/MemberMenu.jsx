import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Calendar from "react-calendar";
import Modal from "react-modal";
import StarRatings from "react-star-ratings";
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
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// API
import {
  UpcomingTours,
  CompletedTours,
  LikeGuide,
  LikeTour,
  MemberWantTour,
  PostReview,
  GetReview,
} from "../../api/Mypage/MyUser";
import GuideCard from "components/Card/GuideCard";

// 오른쪽 - 회원전용
const MemberMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: grey;
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

// 오른쪽 - MemberBookedTour
const MemberTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  width: 1000px;
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

  // console.log(upComingTour);

  // Carousel의 현재 슬라이드 인덱스 상태
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <MemberTitle style={{ marginTop: "80px" }}>
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

// 지난 투어
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

  console.log(lastTour);

  // 모달
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewImage, setReviewImage] = useState(null);

  // 리뷰 작성 모달 열기
  const openModal = (tourId) => {
    setSelectedTourId(tourId);
    setModalIsOpen(true);
  };

  // 리뷰 작성 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTourId(null);
    setReviewContent("");
    setReviewRating(0);
  };

  // 리뷰 등록 함수
  const handleReviewSubmit = async () => {
    try {
      await PostReview({
        tour_id: selectedTourId,
        content: reviewContent,
        rating: reviewRating,
        image: reviewImage, // 이미지 추가
      });
      closeModal();
      // 여기서 상태 업데이트 로직 추가 가능...
    } catch (e) {
      console.error(e);
    }
  };

  // 모달에 적용할 스타일
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "800px", // 원하는 크기로 조정하세요.
    },
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReviewImage(file);

    // 이미지 미리보기
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  Modal.setAppElement("#root");

  return (
    <div>
      <MemberTitle>
        <BusinessCenterIcon style={{ color: "#8e4000" }} />
        <h4 style={{ fontWeight: "bold" }}>지난 투어</h4>
      </MemberTitle>

      {lastTour.length > 0 ? (
        <LastTourContainer>
          <CardContainer>
            {toursToShow.map((tour) => (
              <div
                key={tour.tourProductId}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Card tour={tour} />
                <ChatButton onClick={() => openModal(tour.tourProductId)}>
                  리뷰 작성
                </ChatButton>
              </div>
            ))}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <h2 style={{ fontWeight: "bold" }}>솔직한 후기를 들려주세요</h2>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>투어는 어떠셨나요 ?</div>
                  <StarRatings
                    rating={reviewRating}
                    changeRating={(newRating) => setReviewRating(newRating)}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="5px"
                    starRatedColor="gold"
                    starHoverColor="gold"
                    starEmptyColor="gray"
                    starResolution="half" // 별점 반개 단위로 줄 수 있게 설정
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="리뷰 내용을 입력하세요."
                    style={{ height: "100px", width: "400px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="선택한 사진"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                  <ChatButton onClick={handleReviewSubmit}>
                    등록 완료
                  </ChatButton>
                </div>
              </div>
            </Modal>
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

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

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

  const toursToShow = showMore ? likeGuides : likeGuides.slice(0, 3);

  // console.log(likeGuides);
  return (
    <div>
      <MemberTitle>
        <FavoriteIcon style={{ color: "red" }} />
        <h4 style={{ fontWeight: "bold" }}>좋아요한 가이드</h4>
      </MemberTitle>
      {likeGuides.length > 0 ? (
        <LastTourContainer>
          <CardContainer>
            {toursToShow.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </CardContainer>
          {likeGuides.length > 3 &&
            (showMore ? (
              <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
            ) : (
              <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
            ))}
        </LastTourContainer>
      ) : (
        <p>좋아요한 가이드가 없습니다.</p>
      )}
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

// 자신이 쓴 리뷰
function ReviewList() {
  const [review, setReview] = useState([]);

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await GetReview();
        setReview(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchReview();
  }, []);

  const reviewsToShow = showMore ? review : review.slice(0, 3);

  console.log(review);

  return (
    <div>
      <MemberTitle>
        <DriveFileRenameOutlineIcon />
        <h4 style={{ fontWeight: "bold" }}>자신이 쓴 리뷰</h4>
      </MemberTitle>
      {review.length > 0 ? (
        <MemberWantContainer>
          <div>
            {reviewsToShow.length > 0 &&
              reviewsToShow.map((review) => (
                <WantList key={review.id}>
                  <WantTitle>{review.title}</WantTitle>
                </WantList>
              ))}
          </div>
          {review.length > 3 && showMore ? (
            <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
          ) : review.length > 3 && !showMore ? (
            <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
          ) : null}
        </MemberWantContainer>
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
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
      <ReviewList />
    </MemberMenuContainer>
  );
}

export default MemberMenu;
