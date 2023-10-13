import { React, useState } from "react";
import styled from "styled-components";
import Left from "./MyPageLeft";
import MemberMenu from "./MemberMenu";
import GuideMenu from "./GuideMenu";

// 전체
const MyPage = styled.div`
  display: flex;
  height: 60rem;
  padding-top: 50px;
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

// 오른쪽
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
    <MyPage>
      <Left />
      <Right />
    </MyPage>
  );
}

export default Mypage;
