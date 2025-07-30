import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
// import { useEffect } from 'react';
import Home from './pages/Home.jsx';
// import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Courses from './pages/Courses.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import KitDetails from './pages/KitDetails.jsx';
import MakerPanel from './pages/MakerPanel.jsx';
import UploadProof from './pages/UploadProof.jsx';
// import Shop from './pages/Shop.jsx';
import RewardStore from './pages/RewardStore.jsx';
import Profile from './pages/profile.jsx';  
import { useEffect } from 'react';




const App = () => {
  useEffect(() => {
  localStorage.removeItem('cartItems'); // run once on mount
}, []);
  return (
    <>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
       <Route path="/kit/:title" element={<KitDetails />} />
       <Route path="/maker-panel" element={<MakerPanel />} />
       <Route path="/upload-proof" element={<UploadProof />} />
       {/* <Route path="/shop" element={<Shop />} /> */}
       <Route path="/rewards" element={<RewardStore />} />
       <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
};

export default App;
