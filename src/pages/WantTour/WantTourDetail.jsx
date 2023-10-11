import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DetailArticle, DeleteArticle } from '../../api/want/Want';

function WantTourDetail() {
  const [post, setPost] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 상세조회 axios
    // 확인 필요
    const res = DetailArticle();
    setPost(res.data);
  }, []);

  const onPageHandle = () => {
    navigate(-1);
  };

  const onDeleteHandler = () => {
    const res = DeleteArticle();
    if (res) {
      alert('게시글이 삭제되었습니다');
      navigate('/wanttour');
    }
  };

  const onUpdateHandler = () => {
    navigate(`/update/${post.id}`, { state: post });
  };

  return (
    <div>
      <button onClick={onPageHandle}>글 목록보기</button>
      <button onClick={onDeleteHandler}>글 삭제하기</button>
      <button onClick={onUpdateHandler}>글 수정하기</button>
      {/* title */}
      {/* user */}
      {/* status */}
      {/* date */}
      {/* persons */}
      {/* wish */}
      {/* content */}
      {/* chatting button */}
      {/* {status ? <button>글쓴이와 채팅하기</button> : <button>매칭완료</button>} */}
    </div>
  );
}

export default WantTourDetail;
