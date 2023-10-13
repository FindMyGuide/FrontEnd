import { baseAxios } from "../Axios";

//채팅목록 조회-회원
export async function Chatuser(props) {
  try {
    const res = await baseAxios.get(`v1/chat/member/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//채팅목록 조회-가이드
export async function ChatGuide(props) {
  try {
    const res = await baseAxios.get(`v1/chat/guide/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//채팅 내용 상세 조회
export async function ChatDetail(props) {
  try {
    const res = await baseAxios.get(`v1/chat/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//채팅 입력
export async function ChatInput(props) {
  try {
    const res = await baseAxios.post(
      `v1/chat/create`,
      {
        chat_id: props.chat_id,
        create_at: props.create_at,
        content: props.content,
      },
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}
