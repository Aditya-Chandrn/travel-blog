import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SignupForm from './pages/signup/Signup';
import LoginForm from './pages/login/Login';
import ForgotpasswordForm from 'pages/forgotpassword/forgotpassword';
import ResetpasswordForm from 'pages/forgotpassword/resetpassword';
import Destination from 'pages/destination/destination';
import Profile from 'pages/profile/profile';
import MyBlogs from 'pages/my-blogs/my-blogs';
import Create from 'pages/create-blog/create-blog';
import Stories from 'components/stories/stories';
import Profileimg from 'pages/profileimg/profileimg';
import Navbar from 'components/navbar/Navbar';

const App = () => {


  return (
    <BrowserRouter>
     <div>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Destination />} />
            {/* ... (other routes) ... */}
          </Routes>
        </div>
      <div>
        <Routes>
          <Route path="/signup/*" element={<SignupForm />} />
          <Route path="/login/*" element={<LoginForm />} />
          <Route path="/Forgotpassword/*" element={<ForgotpasswordForm />} />
          <Route path="/Resetpassword/*" element={<ResetpasswordForm />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/stories/*" element={<Stories />} />
          <Route path="/my-blogs/" element={<MyBlogs />} />
          <Route path="/create/*" element={<Create />} />
          <Route path="/profileimg/*" element={<Profileimg />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
};

export default App;



