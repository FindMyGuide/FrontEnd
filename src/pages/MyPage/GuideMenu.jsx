import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "components/Card/Card";

// API
import {
  MyTour,
  MytourDelete,
  MytourReservation,
  WantTourGuide,
} from "api/Mypage/MyGuide";

// Icon
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

// 오른쪽 - 가이드 전용
const GuideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-radius: 0px 10px 10px 10px;
  gap: 100px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ShowButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: #4281ff;
  color: white;
  border: 1px solid white;
  font-weight: bold;
`;

const GuideTitle = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 1000px;
`;

// 등록한 투어
const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

// 예약한 투어
const BookedTourContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const BookedImg = styled.img`
  width: 200px;
  height: 200px;
`;

const BookedMemberContainer = styled.div``;

const BookedTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const MemberBox = styled.div`
  display: flex;
  gap: 30px;
`;

const MemberName = styled.div``;

const BasicButton = styled.button`
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: 0px;
  color: white;
`;

const ChatButton = styled(BasicButton)`
  background-color: #48bcea;
`;

const CancelButton = styled(BasicButton)`
  background-color: red;
  width: 80px;
`;

// 원해요 매칭
const WantListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const WantListBox = styled.div`
  display: flex;
  gap: 30px;
`;

const WantTitle = styled.div`
  width: 300px;
`;

// 등록한 투어
function RegisteredTour() {
  const [tour, setTour] = useState([]);

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchWantTour();
  }, []);

  const fetchWantTour = async () => {
    try {
      const res = await MyTour();
      setTour(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // 취소하기 버튼을 눌렀을 때 실행될 함수입니다.
  const handleCancel = async (id) => {
    try {
      await MytourDelete(id); // 해당 tour 삭제
      fetchWantTour(); // tour 상태 업데이트
    } catch (e) {
      console.error(e);
    }
  };

  console.log(tour);

  const toursToShow = showMore ? tour : tour.slice(0, 3);

  return (
    <div>
      <GuideTitle style={{ marginTop: "80px" }}>
        <AirplanemodeActiveIcon style={{ color: "#0073ff99" }} />
        <h4 style={{ fontWeight: "bold" }}> 등록한 투어 </h4>
      </GuideTitle>
      {tour.length > 0 ? (
        <RegisterContainer>
          <CardContainer>
            {toursToShow.length > 0 &&
              toursToShow.map((tour) => (
                <div
                  key={tour.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                  }}
                >
                  <Card tour={tour} />
                  <CancelButton onClick={() => handleCancel(tour.id)}>
                    투어 삭제
                  </CancelButton>
                </div>
              ))}
          </CardContainer>
          {tour.length > 3 &&
            (showMore ? (
              <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
            ) : (
              <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
            ))}
        </RegisterContainer>
      ) : (
        <p> 등록된 투어가 없습니다.</p>
      )}
    </div>
  );
}

// 예약한 투어
function GuideBookedTour() {
  const [bookedTour, setBookedTour] = useState([]);

  useEffect(() => {
    const fetchBookedTour = async () => {
      try {
        const res = await MytourReservation();
        setBookedTour(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookedTour();
  }, []);

  // console.log(bookedTour);

  // 취소하기 버튼 클릭 이벤트 핸들러
  const handleCancelClick = async (tourHistoryManagerId) => {
    try {
      await MytourDelete(tourHistoryManagerId);
      // 예약 정보를 다시 가져옵니다.
      const res = await MytourReservation();
      setBookedTour(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <GuideTitle>
        <BusinessCenterIcon style={{ color: "#8e4000" }} />
        <h4 style={{ fontWeight: "bold" }}> 예약 현황 </h4>
      </GuideTitle>
      {bookedTour.length > 0
        ? bookedTour.map((tour) => (
            <BookedTourContainer key={tour.tourHistoryManagerId}>
              <BookedImg style={{ marginLeft: "60px" }} src={tour.images} />
              <BookedMemberContainer>
                <BookedTitle>{tour.title}</BookedTitle>
                <MemberBox>
                  <div>{tour.touristEmail}</div>
                  <div>
                    {new Date(tour.tourStartDate).toLocaleDateString()} ~{" "}
                    {new Date(tour.tourEndDate).toLocaleDateString()}
                  </div>
                  <ChatButton>채팅</ChatButton>
                  <CancelButton
                    onClick={() => handleCancelClick(tour.tourHistoryManagerId)}
                  >
                    취소
                  </CancelButton>
                </MemberBox>
              </BookedMemberContainer>
            </BookedTourContainer>
          ))
        : // bookedTour 배열이 비어있는 경우, 아래 메시지를 출력합니다.
          "예약한 투어가 없습니다"}
    </div>
  );
}

// 원해요 매칭
function GuideWantList() {
  const [wantList, setWantList] = useState([]);

  // 3개씩 보여주기
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchBookedTour = async () => {
      try {
        const res = await WantTourGuide();
        setWantList(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookedTour();
  }, []);

  // console.log(wantList);

  const toursToShow = showMore ? wantList : wantList.slice(0, 3);

  // 취소하기 버튼 클릭 이벤트 핸들러
  const handleCancelClick = async (tourHistoryManagerId) => {
    try {
      await MytourDelete(tourHistoryManagerId);
      // 예약 정보를 다시 가져옵니다.
      const res = await MytourReservation();
      setWantList(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <GuideTitle>
        <ContentPasteIcon />
        <h4 style={{ fontWeight: "bold" }}> 원해요 매칭 </h4>
      </GuideTitle>

      {wantList.length > 0 ? (
        <WantListContainer style={{ marginBottom: "60px" }}>
          {toursToShow.map((tour) => (
            <WantListBox style={{ marginBottom: "30px" }}>
              <WantTitle> {tour.wantTourTitle} </WantTitle>
              <div>
                {new Date(tour.tourStartDate).toLocaleDateString()} ~{" "}
                {new Date(tour.tourEndDate).toLocaleDateString()}
              </div>
              <ChatButton>채팅</ChatButton>
              <CancelButton
                onClick={() => handleCancelClick(tour.tourHistoryManagerId)}
              >
                취소
              </CancelButton>
            </WantListBox>
          ))}

          {wantList.length > 3 &&
            (showMore ? (
              <ShowButton onClick={() => setShowMore(false)}>접기</ShowButton>
            ) : (
              <ShowButton onClick={() => setShowMore(true)}>더 보기</ShowButton>
            ))}
        </WantListContainer>
      ) : (
        <p style={{ marginBottom: "30px" }}>매칭된 원해요 리스트가 없습니다.</p>
      )}
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
