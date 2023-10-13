import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Pimg from "./img.png";
import "./MypageCalendar.css";

// API
import {
  UserInfo,
  UserInfoChange,
  PassWordChange,
} from "../../api/Mypage/MyUser";

// Slice
import { setUserInformation } from "../../slices/UserInformationSlice";

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
const ModalContainer = styled.div`
  border: 2px solid #000;
  border-radius: 10px;
  position: absolute;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const EditModalContainer = styled(ModalContainer)`
  width: 600px;
  height: 480px;
  z-index: 2;
  left: 35%;
`;

const EditCloseButton = styled.button`
  width: 20px;
  border-radius: 50%;
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
  gap: 30px;
`;

const EditBasicButton = styled.button`
  width: 100px;
  height: 35px;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const EditCompleteButton = styled(EditBasicButton)`
  background-color: #12aaff;
`;

const ChangePasswordButton = styled(EditBasicButton)`
  background-color: #ff1212;
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

const PrivacyDiv = styled.div`
  width: 200px;
  height: 30px;
  background-color: #ececec;
  border-radius: 5px;
  border: none;
`;

const Selector = styled.select`
  width: 200px;
  height: 30px;
  background-color: #ececec;
  border-radius: 5px;
  border: none;
`;

const PhoneInput = styled(PrivacyContent).attrs({ type: "text" })``;

// 왼쪽 비밀번호 변경 모달창
const PasswordModalContainer = styled(ModalContainer)`
  width: 400px;
  height: 300px;
  z-index: 3;
  top: 100px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PasswordInput = styled.input`
  width: 200px;
  height: 30px;
  background-color: #ececec;
  border-radius: 5px;
  border: none;
`;

const PasswordBox = styled.div`
  display: flex;
  gap: 30px;
`;

const PasswordButton = styled(EditBasicButton)`
  background-color: green;
`;

const PasswordCloseButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #686868;
  border: none;
  margin-left: 86%;
`;

// 왼쪽 - 개인정보 수정

// 비밀번호 변경 Modal
function PasswordChangeModal({ setPasswordChangeModal }) {
  const closeModal = () => {
    setPasswordChangeModal(false);
  };

  // 비밀번호 입력 필드에 대한 상태
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  async function handleChangePassword() {
    try {
      await PassWordChange({
        password: password,
        newPassword: newPassword,
        newPasswordAgain: newPasswordAgain,
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PasswordModalContainer>
      <PasswordCloseButton onClick={closeModal}>X</PasswordCloseButton>
      <PasswordBox>
        <BoldP>현재 비밀번호 </BoldP>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </PasswordBox>

      <PasswordBox>
        <BoldP>새 비밀번호 </BoldP>
        <PasswordInput
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </PasswordBox>

      <PasswordBox>
        <BoldP>새 비밀번호 확인 </BoldP>
        <PasswordInput
          value={newPasswordAgain}
          onChange={(e) => setNewPasswordAgain(e.target.value)}
        />
      </PasswordBox>

      {/* '변경 완료' 버튼 */}
      <PasswordButton onClick={handleChangePassword}>변겅 완료</PasswordButton>
    </PasswordModalContainer>
  );
}

// 개인 정보
function Privacy({
  nickname,
  setNickname,
  languages,
  setLanguages,
  guideExperience,
  setGuideExperience,
  phoneNumber,
  setPhoneNumber,
  certification,
  setCertification,
}) {
  const userInformation = useSelector((state) => state.user);

  console.log(userInformation);

  return (
    <PrivacyContainer>
      <PrivacyBox>
        <b>이름</b>
        <PrivacyDiv>{userInformation.name}</PrivacyDiv>
      </PrivacyBox>
      <PrivacyBox>
        <b>닉네임</b>
        <PrivacyContent
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </PrivacyBox>
      <PrivacyBox>
        <b>성별</b>
        <PrivacyDiv>{userInformation.gender}</PrivacyDiv>
      </PrivacyBox>
      <PrivacyBox>
        <b>핸드폰</b>

        <PhoneInput
          value={phoneNumber}
          onChange={(e) => {
            // 숫자와 '-'만 허용되는 정규식 패턴입니다.
            const regex = /^[0-9-]*$/;
            if (regex.test(e.target.value)) {
              let input = e.target.value;
              input = input.replace(/-/g, "");

              if (input.length > 3 && input.length <= 7)
                input = `${input.slice(0, 3)}-${input.slice(3)}`;
              else if (input.length > 7)
                input = `${input.slice(0, 3)}-${input.slice(
                  3,
                  7
                )}-${input.slice(7)}`;

              // 입력값의 길이가 최대 문자 수를 초과하는 경우 상태 업데이트 막기
              if (input.length <= 13) {
                setPhoneNumber(input);
              }
            }
          }}
          placeholder={userInformation.phoneNumber}
        />
      </PrivacyBox>

      <PrivacyBox>
        <b>e-mail</b>
        <PrivacyDiv>{userInformation.email}</PrivacyDiv>
      </PrivacyBox>
      <PrivacyBox>
        <b>자격증 </b>
        <Selector
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
        >
          <option value="true">보유</option>
          <option value="false">미보유</option>
        </Selector>
      </PrivacyBox>
      {userInformation.languages.length > 0 && (
        <PrivacyBox>
          <b>언어</b>
          <PrivacyContent
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </PrivacyBox>
      )}

      {userInformation.guideExperience && (
        <PrivacyBox>
          <b>경력</b>
          <PrivacyContent
            value={guideExperience}
            onChange={(e) => setGuideExperience(e.target.value)}
          />
        </PrivacyBox>
      )}
    </PrivacyContainer>
  );
}

// 개인정보 수정 모달창
function EditModal({ setEditModal }) {
  // 비밀번호 변경 모달 상태
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);

  // 개인정보 수정 모달 닫기
  const closeModal = () => {
    setEditModal(false);
  };

  const userInformation = useSelector((state) => state.user);

  // 수정할 목록
  const [profilePicture, setProfilePicture] = useState(
    userInformation.guideProfilePicture
  );
  const [guideIntro, setGuideIntro] = useState(
    userInformation.guideIntroduction
  );

  const [nickname, setNickname] = useState(userInformation.nickname);
  const [languages, setLanguages] = useState(userInformation.languages);
  const [guideExperience, setGuideExperience] = useState(
    userInformation.guideExperience
  );
  const [phoneNumber, setPhoneNumber] = useState(userInformation.phoneNumber);
  const [certification, setCertification] = useState(
    userInformation.nationalCertificationOfGuideYn
  );

  async function handleSubmit() {
    try {
      await UserInfoChange({
        nickname: nickname,
        languages: languages,
        guideExperience: guideExperience,
        national_certification_of_quide_yn: certification,
        phoneNumber: phoneNumber,
        profilePicture: profilePicture,
        guideIntro: guideIntro,
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <EditModalContainer>
      <EditCloseButton onClick={closeModal}>X</EditCloseButton>
      <EditModalTop>
        {/* 프로필 이미지 수정 */}
        {/* <ProfileImg src={profilePicture} /> */}
        {/* <input type="file" onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))} /> */}
        <ProfileImg src={Pimg} />

        {/* 가이드 소개 수정 */}
        {userInformation.guideIntroduction && (
          <>
            <textarea
              value={guideIntro}
              onChange={(e) => setGuideIntro(e.target.value)}
            />
            <IntroductionP> {guideIntro} </IntroductionP>
          </>
        )}
      </EditModalTop>

      <Privacy
        nickname={nickname}
        setNickname={setNickname}
        languages={languages}
        setLanguages={setLanguages}
        guideExperience={guideExperience}
        setGuideExperience={setGuideExperience}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        certification={certification}
        setCertification={setCertification}
      />

      <EditModalBottom>
        <EditCompleteButton onClick={handleSubmit}>
          수정 완료
        </EditCompleteButton>
        <ChangePasswordButton onClick={() => setPasswordChangeModal(true)}>
          비밀번호 변경
        </ChangePasswordButton>

        {passwordChangeModal && (
          <PasswordChangeModal
            setPasswordChangeModal={setPasswordChangeModal}
          />
        )}
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

  // redux를 이용한 예정된 여행 정보
  const upComingTour = useSelector((state) => state.upComingTour);

  return (
    <MyPageLeft>
      <ProfileImg src={Pimg} />
      {/* <ProfileImg src={userInformation.guideProfilePicture} /> */}
      <BoldP>{userInformation.nickname}</BoldP>
      <EditProfile />
      <MyTour>
        <BoldP>예정된 투어 : {upComingTour.length} </BoldP>
        <BoldP>지난 투어 : {lastTour.length}</BoldP>
      </MyTour>
      <ChatList>대화목록</ChatList>
    </MyPageLeft>
  );
}

export default Left;
