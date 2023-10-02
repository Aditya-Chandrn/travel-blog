import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './forgotpassword.module.css';
import borabora from '../../images/bora-bora-island.jpg';
import googleicon from '../../images/google.png';
import sunset from '../../images/sunsetimage.jpg';
const ForgotpasswordForm = () => {
  const [username, setUsername] = useState('');
 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!username) {
      validationErrors.email = 'Email is required';
    }
   

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:3001/forgotpassword', {
          username,
          
        });
        console.log('forgotpassword Response:', response);
      
        if (response.status === 200) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loggedInUserEmail', username); // Set the email in local storage
          
          navigate('/Resetpassword');
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
          <h1 className={styles['forgotpassword-Heading']}>Forgot Password? 🤔</h1>
          <h6>No worries, we will send you reset Instructions</h6>
        </div><br></br><br></br>
       
        <div>
          <br />
        </div>
        
        {/* Move the form element here */}
        <form className={styles['forgotpassword-form']} onSubmit={handleSubmit} action='Post'>
          
          <div>
            <br />
            <label htmlFor="email" className={styles['forgotpassword-label']}>
              User Name:
            </label><br></br>
            <input
              className={styles['forgotpassword-input']}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
         
          <button type="submit" className={styles['forgotpassword-button']}>
            LogIn
          </button><br></br>
        </form>
        <button className={styles['forgotpassword-loginbutton']} onClick={() => navigate('/login')}> ← Back to login</button>
      </div>
    </div>
    </div>
  );
};
  export default ForgotpasswordForm;