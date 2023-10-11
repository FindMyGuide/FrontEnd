import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import Card from "../../components/Card/Card";
import "./MypageCalendar.css";
import Pimg from "./img.png";
import { ReactComponent as heartIcon } from "../../asset/Icon/heart.svg";

// Slice
import { setUserInformation } from "../../slices/UserInformationSlice";
import { setLastTour } from "../../slices/LastTourSlice";

// API
import { UserInfo, CompletedTours } from "../../api/Mypage/MyUser";

// 전체
const MyPage = styled.div`
  display: flex;
  height: 60rem;
`;

// 왼쪽
const MyPageLeft = styled.div`
  flex: 2.5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
`;

const BoldP = styled.p`
  font-weight: bold;
`;

const BasicButton = styled.button`
  border-radius: 2rem;
`;

const EditButton = styled(BasicButton)`
  width: 10rem;
  height: 3rem;
  background: #fff;
`;

const MyTour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10rem;
  height: 6rem;
  border: 2px solid #000000;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const ChatList = styled.button`
  width: 10rem;
  height: 3rem;
  background-color: skyblue;
  color: #fff;
  border-radius: 1rem;
  margin-top: 1rem;
  border: 0px solid #fff;
  font-weight: bold;
`;

// 왼쪽 개인정보 변경 모달창
const EditModalContainer = styled.div`
  width: 600px;
  height: 480px;
  z-index: 999;
  border: 2px solid #000;
  border-radius: 10px;
  position: absolute;
  background: #fff;
  left: 35%;
  display: flex;
  flex-direction: column;
`;

const EditCloseButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #686868;
  border: none;
  margin-left: 95%;
  margin-top: 1%;
`;

const EditModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditModalBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const EditCompleteButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: #12aaff;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const IntroductionP = styled.p`
  width: 120px;
  word-wrap: break-word;
`;

// 개인정보
const PrivacyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const PrivacyBox = styled.div`
  display: flex;
  width: 260px;
  justify-content: space-around;
`;

const PrivacyContent = styled.input`
  width: 200px;
  height: 30px;
  background-color: #ececec;
  border-radius: 5px;
  border: none;
`;

// 오른쪽
const MypageRight = styled.div`
  flex: 7.5;
`;

const ModeButton = styled.button`
  width: 8rem;
  height: 3rem;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-radius: 1rem 1rem 0px 0px;

  /* 배경색이 props에 따라 변경되도록 설정 */
  background-color: ${(props) => (props.selected ? "white" : "#c9c9c9")};
`;

const ButtonBox = styled.div`
  display: flex;
`;

const PageRightBody = styled.div``;

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

// 오른쪽 - 가이드 전용

// 왼쪽 - 개인정보 수정
// 개인 정보
function Privacy() {
  const userInformation = useSelector((state) => state.user);

  console.log(userInformation);

  return (
    <PrivacyContainer>
      <PrivacyBox>
        <b>이름</b>
        <PrivacyContent placeholder={userInformation.name} />
      </PrivacyBox>
      <PrivacyBox>
        <b>닉네임</b>
        <PrivacyContent placeholder={userInformation.nickname} />
      </PrivacyBox>
      <PrivacyBox>
        <b>성별</b>
        <PrivacyContent placeholder={userInformation.gender} />
      </PrivacyBox>
      <PrivacyBox>
        <b>핸드폰</b>
        <PrivacyContent placeholder={userInformation.phoneNumber} />
      </PrivacyBox>
      <PrivacyBox>
        <b>e-mail</b>
        <PrivacyContent placeholder={userInformation.email} />
      </PrivacyBox>
      <PrivacyBox>
        <b>자격증 </b>
        <PrivacyContent
          placeholder={userInformation.nationalCertificationOfGuideYn}
        />
      </PrivacyBox>
      {userInformation.languages.length > 0 && (
        <PrivacyBox>
          <b>언어</b>
          <PrivacyContent placeholder={userInformation.languages} />
        </PrivacyBox>
      )}

      {userInformation.guideExperience && (
        <PrivacyBox>
          <b>경력</b>
          <PrivacyContent placeholder={userInformation.guideExperience} />
        </PrivacyBox>
      )}
    </PrivacyContainer>
  );
}

// 개인정보 수정 모달창
function EditModal({ setEditModal }) {
  const closeModal = () => {
    setEditModal(false);
  };

  const userInformation = useSelector((state) => state.user);

  return (
    <EditModalContainer>
      <EditCloseButton onClick={closeModal}>X</EditCloseButton>
      <EditModalTop>
        <ProfileImg src={Pimg} />
        {userInformation.guideIntroduction && (
          <IntroductionP> {userInformation.guideIntroduction} </IntroductionP>
        )}
      </EditModalTop>

      <Privacy />

      <EditModalBottom>
        <EditCompleteButton>수정 완료</EditCompleteButton>
      </EditModalBottom>
    </EditModalContainer>
  );
}

// 개인정보 수정
function EditProfile() {
  // 모달창 여부
  const [editModal, setEditModal] = useState(false);

  // 모달창 오픈
  const openModal = () => {
    setEditModal(true);
  };

  return (
    <div>
      <EditButton onClick={openModal}>개인 정보 수정</EditButton>
      {editModal && <EditModal setEditModal={setEditModal} />}
    </div>
  );
}

// 왼쪽
function Left() {
  // 개인정보 조회
  // sessionStorage.setItem(
  //   "token",
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4b2RuanM4Mjg3QG5hdmVyLmNvbSIsImV4cCI6MTcwMDYyMTI3MywiaXNzIjoiZmluZG15Z3VpZGUuY29tIn0.nndOrq19RvWzKZz-loEPzvXFeCpaVLc0VUpTNjt4NZo"
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInformatioin = async () => {
      try {
        const res = await UserInfo();
        dispatch(setUserInformation(res.data));
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserInformatioin();
  }, [dispatch]);

  // redux를 이용한 회원정보
  const userInformation = useSelector((state) => state.user);

  // redux를 이용한 완료된 여행 정보
  const lastTour = useSelector((state) => state.lastTour);

  return (
    <MyPageLeft>
      <ProfileImg src={Pimg} />
      {/* <ProfileImg src={userInformation.guideProfilePicture} /> */}
      <BoldP>{userInformation.nickname}</BoldP>
      <EditProfile />
      <MyTour>
        <BoldP>예정된 투어 : </BoldP>
        <BoldP>지난 투어 : {lastTour.length}</BoldP>
      </MyTour>
      <ChatList>대화목록</ChatList>
    </MyPageLeft>
  );
}

// 오른쪽
// 회원 전용
function MemberBookedTour() {
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
        <heartIcon />
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

// 가이드 전용

// 등록한 투어
function RegisteredTour() {
  return <></>;
}

// 예약된 투어
function GuideBookedTour() {
  return <></>;
}

// 원해요 매칭
function GuideWantList() {
  return <></>;
}

// 가이드 전체
function GuideMenu() {
  return (
    <>
      <RegisteredTour />
      <GuideBookedTour />
      <GuideWantList />
    </>
  );
}

function Right() {
  const [mode, setMode] = useState("member");

  return (
    <MypageRight>
      <ButtonBox>
        <ModeButton
          selected={mode === "member"}
          onClick={() => setMode("member")}
        >
          회원
        </ModeButton>
        <ModeButton
          selected={mode === "guide"}
          onClick={() => setMode("guide")}
        >
          가이드
        </ModeButton>
      </ButtonBox>
      <PageRightBody>
        {mode === "member" ? <MemberMenu /> : <GuideMenu />}
      </PageRightBody>
    </MypageRight>
  );
}

function Mypage() {
  return (
    <>
      <MyPage>
        <Left />
        <Right />
      </MyPage>
    </>
  );
}

export default Mypage;
