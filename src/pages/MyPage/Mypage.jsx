import React, { useState } from "react";
import styled from "styled-components";
import Pimg from "./img.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

// 왼쪽
function Left() {
  return (
    <MyPageLeft>
      <ProfileImg src={Pimg} />
      <BoldP>닉네임</BoldP>
      <EditButton>개인 정보 수정</EditButton>
      <MyTour>
        <BoldP>예정된 투어</BoldP>
        <BoldP>지난 투어</BoldP>
      </MyTour>
      <ChatList>대화목록</ChatList>
    </MyPageLeft>
  );
}

// 오른쪽
// 회원 전용
function MemberBookedTour() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}

function LastTour() {
  return <></>;
}

function LikeTour() {
  return <></>;
}

function LikeGuide() {
  return <></>;
}

function MemberWantList() {
  return <></>;
}

function MemberMenu() {
  return (
    <>
      <MemberBookedTour />
      <LastTour />
      <LikeTour />
      <LikeGuide />
      <MemberWantList />
    </>
  );
}

// 가이드 전용
function RegisteredTour() {
  return <></>;
}

function GuideBookedTour() {
  return <></>;
}

function GuideWantList() {
  return <></>;
}

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
