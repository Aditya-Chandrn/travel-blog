import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SignupForm from './components/signup/Signup';
import LoginForm from './components/login/Login';
import ForgotpasswordForm from 'components/forgotpassword/forgotpassword';
import ResetpasswordForm from 'components/forgotpassword/resetpassword';
import Destination from 'components/Destination/destination';
import Profile from 'components/profile/profile';
import MyBlogs from 'components/my-blogs/my-blogs';
import Create from 'components/create-blog/create-blog';
import Stories from 'components/stories/stories';
import Profileimg from 'components/profileimg/profileimg';
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



