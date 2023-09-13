import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage.jsx';
import GuidePage from '../pages/GuidePage/GuidePage.jsx';
import GuideDetailPage from '../pages/GuideDetailPage/GuideDetailPage.jsx';
import AreaPage from '../pages/AreaPage/AreaPage.jsx';
import Mypage from '../pages/MyPage/Mypage.jsx';
import WantTour from '../pages/WantTour/WantTourList.jsx';

function RouteLink() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/products" element={<Themeproduct />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/create" element={<Createproduct />} /> */}
        <Route path="/area" element={<AreaPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/guidedetail" element={<GuideDetailPage />} />
        {/* <Route path="/allproduct" element={<Allproduct />} /> */}
        {/* <Route path="/Maptest" element={<Map />} /> */}
        <Route path="/wanttour" element={<WantTour />} />
        {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
        {/* <Route path="/tour/:id" element={<ProductDetail />} /> */}
        <Route path="/mypage/:id" element={<Mypage />} />
      </Routes>
    </>
  );
}

export default RouteLink;
