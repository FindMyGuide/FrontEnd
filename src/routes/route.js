import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage.jsx';
import GuidePage from '../pages/GuidePage/GuidePage.jsx';
import GuideDetailPage from '../pages/GuideDetailPage/GuideDetailPage.jsx';
import AreaPage from '../pages/AreaPage/AreaPage.jsx';
import Mypage from '../pages/MyPage/Mypage.jsx';
import Login from '../pages/LoginPage/Login.jsx';
import Signup from '../pages/LoginPage/Signup.jsx';
// WantTour
import WantTourList from '../pages/WantTour/WantTourList.jsx';
import WantTourDetail from '../pages/WantTour/WantTourDetail.jsx';
import WantTourRegist from '../pages/WantTour/WantTourRegist.jsx';
import WantTourUpdate from '../pages/WantTour/WantTourUpdate.jsx';

function RouteLink() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/products" element={<Themeproduct />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/create" element={<Createproduct />} /> */}
        <Route path="/area" element={<AreaPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/guide/detail/:id" element={<GuideDetailPage />} />
        {/* <Route path="/allproduct" element={<Allproduct />} /> */}
        {/* <Route path="/Maptest" element={<Map />} /> */}
        <Route path="/wanttour" element={<WantTourList />} />
        <Route path="/wanttour/regist" element={<WantTourRegist />} />
        <Route path="/wanttour/detail/:id" element={<WantTourDetail />} />
        <Route path="/wanttour/update/:id" element={<WantTourUpdate />} />
        {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
        {/* <Route path="/tour/:id" element={<ProductDetail />} /> */}
        <Route path="/mypage/:id" element={<Mypage />} />
      </Routes>
    </>
  );
}

export default RouteLink;
