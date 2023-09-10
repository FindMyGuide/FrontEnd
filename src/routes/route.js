import { Route, Routes } from 'react-router-dom';

import MainPage from '../components/pages/MainPage/MainPage.jsx';
import GuidePage from '../components/pages/GuidePage/GuidePage.jsx';

function RouteLink() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/products" element={<Themeproduct />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/create" element={<Createproduct />} /> */}
        {/* <Route path="/areaproduct" element={<Areaproduct />} /> */}
        <Route path="/guide" element={<GuidePage />} />
        {/* <Route path="/allproduct" element={<Allproduct />} /> */}
        {/* <Route path="/Maptest" element={<Map />} /> */}
        {/* <Route path="/wantproduct" element={<Wantproduct />} /> */}
        {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
        {/* <Route path="/tour/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/mypage/:id" element={<Mypage />} /> */}
      </Routes>
    </>
  );
}

export default RouteLink;
