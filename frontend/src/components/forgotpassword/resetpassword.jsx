import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './forgotpassword.module.css';
import borabora from '../../images/bora-bora-island.jpg';
import googleicon from '../../images/google.png';
import sunset from '../../images/sunsetimage.jpg';
const ResetpasswordForm = () => {
    // const [email, setEmail] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmnewpassword, setConfirmNewpassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    // Retrieve the email from localStorage
    const username = localStorage.getItem('loggedInUserEmail');
    console.log('email who has logged in is',username)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = {};
  
      if (!username) {
        validationErrors.username = 'Email is required';
      }
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        try {
          const response = await axios.post('http://localhost:3001/resetpassword', {
            username,newpassword,confirmnewpassword
          });
          console.log('forgotpassword Response:', response);
  
          if (response.status === 200) {
            // Set the email in local storage
            alert('Password reset successfully');
            navigate('/login');
          } else {
            alert('Authentication failed');
            console.log('Authentication failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error during authentication. Please try again later.');
        }
      }
    };
  return (
    <div className={styles['forgotpassword-container']}>
      <div className={styles['forgotpassword-image']}>
        <img className={styles['forgotpassword-image-content']} src={sunset} alt="Bora Bora" />
      </div>
      <div className={styles['forgotpassword-form']}>
  
      <div className={styles['forgotpassword-content']}>
        <div>
          <h1 className={styles['forgotpassword-Heading']}>Reset Password? 😊</h1>
          <h6>Enter your New Password to access your account</h6>
        </div><br></br><br></br>
       
        <div>
          <br />
        </div>
        
        {/* Move the form element here */}
        <form className={styles['forgotpassword-form']} onSubmit={handleSubmit} action='Post'>
          
          <div>
            <br />
            <label htmlFor="newpassword" className={styles['forgotpassword-label']}>
              New Password:
            </label><br></br>
            <input
              className={styles['forgotpassword-input']}
              type="password"
              id="newpassword"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </div><br></br>
          <div>
            <br />
            <label htmlFor="confirmnewpassword" className={styles['forgotpassword-label']}>
               Confirm New Password:
            </label><br></br>
            <input
              className={styles['forgotpassword-input']}
              type="password"
              id="confirmnewpassword"
              value={confirmnewpassword}
              onChange={(e) => setConfirmNewpassword(e.target.value)}
              required
            />
          </div><br></br><br></br>
         
          <button type="submit" className={styles['forgotpassword-button']}>
            Reset Password
          </button><br></br>
        </form>
        
      </div>
    </div>
    </div>
  );
};
  export default ResetpasswordForm;