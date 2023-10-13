import { React } from "react";
import styled from "styled-components";

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
    <GuideMenuContainer>
      <RegisteredTour />
      <GuideBookedTour />
      <GuideWantList />
    </GuideMenuContainer>
  );
}

export default GuideMenu;
