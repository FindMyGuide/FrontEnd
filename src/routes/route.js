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

// Recommend
import FestivalList from '../pages/RecommendPage/FestivalList.jsx';
import FestivalDetail from '../pages/RecommendPage/FestivalDetail.jsx';
import LocationList from 'pages/RecommendPage/LocationList.jsx';
import LocationDetail from 'pages/RecommendPage/LocationDetail.jsx';
import TastyList from 'pages/RecommendPage/TastyList.jsx';
import TastyDetail from 'pages/RecommendPage/TastyDetail.jsx';

// Tour
import TourList from '../pages/Tour/TourList.jsx';
import TourRegist from '../pages/Tour/TourRegist.jsx';
import TourDetailPage from '../pages/Tour/TourDetail.jsx';

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
        <Route path="/recommend/festival" element={<FestivalList />} />
        <Route path="/recommend/festival/:id" element={<FestivalDetail />} />
        <Route path="/recommend/tasty" element={<TastyList />} />
        <Route path="/recommend/tasty/:id" element={<TastyDetail />} />
        <Route path="/recommend/location" element={<LocationList />} />
        <Route path="/recommend/location/:id" element={<LocationDetail />} />
        <Route path="/tour/tourlist" element={<TourList />} />
        <Route path="/tour/tourregist" element={<TourRegist />} />
        <Route path="/tour/tourdetail/:id" element={<TourDetailPage />} />
        {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
        {/* <Route path="/tour/:id" element={<ProductDetail />} /> */}
        <Route path="/mypage/:id" element={<Mypage />} />
      </Routes>
    </>
  );
}

export default RouteLink;
