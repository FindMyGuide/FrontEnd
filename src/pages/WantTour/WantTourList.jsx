import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyArticle from '../../api/want/Want';

function WantTour() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 조회 axios
    // setList(res.data)
  }, []);

  const handleMyArticle = () => {
    const isLoggedIn = sessionStorage.getItem('token');
    console.log('1');
    if (isLoggedIn === null) {
      navigate('/login')
    }
  };

  return (
    <div>
      <button onClick={handleMyArticle}>내가 쓴 글 보기</button>
      {/* <ul>
        {list.map((post) => (
          <li key={post.idx}>
            <Link to={`/wanttour/${post.idx}`}>{post.title}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default WantTour;
