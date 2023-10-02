import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';
import borabora from '../../images/bora-bora-island.jpg';
import googleicon from '../../images/google.png';
import sunset from '../../images/sunsetimage.jpg';
const LoginForm = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
 
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
  
    if (!username) {
      validationErrors.username = 'Username is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        try {
            const response = await axios.post('http://localhost:3001/login', {
              username,
              password,
            });
            console.log('Login Response:', response);
          
            if (response.status === 200) {
              const responseData = response.data;
              console.log('Response Data:', responseData); // Log the response data
          
              if (responseData.message === 'Authentication successful') {
          
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUserEmail', username); // Set the email in local storage
                console.log('the value stored in the localstorage is',localStorage)
                alert('You Have successfully logged in')
                navigate('/');
              } else {
                alert('Authentication failed');
                console.log('Authentication failed');
              }
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
    <div className={styles['login-container']}>
      <div className={styles['login-image']}>
        <img className={styles['login-image-content']} src={sunset} alt="Bora Bora" />
      </div>
      <div className={styles['login-form']}>
  
      <div className={styles['login-content']}>
        <div>
          <h1 className={styles['login-Heading']}>Welcome Back  👋</h1>
          <h6>Continue with Google or Enter Login Details</h6>
        </div><br></br><br></br>
        <form>
        <div className={styles['login-google-main']}>
          <button type="submit" className={styles['login-google']} value="Submit">
            <img className={styles['login-google-icon']} src={googleicon} height="25vw" />&nbsp;&nbsp;
            <span className={styles['google-text']}>Continue With Google</span>
          </button>
        </div>
        </form>
        <p>---------------------------------------or------------------------------------------------</p>
        <div>
          <br />
        </div>
        
        {/* Move the form element here */}
        <form className={styles['login-form']} onSubmit={handleSubmit} action='Post'>
          
          <div>
            <br />
            <label htmlFor="email" className={styles['login-label']}>
              User Name:
            </label><br></br>
            <input
              className={styles['login-input']}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <br />
            <label htmlFor="password" className={styles['login-label']}>
              Password:
            </label><br></br>
            <input
              className={styles['login-input']}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to ="/Forgotpassword">
            <h5>Forgot Password</h5>
            </Link>
          </div>

          <br></br><br></br><br></br>
          
          <button type="submit" className={styles['login-button']}>
             LogIn
          </button><br></br><br></br>
        </form>
        <Link to="/signup"  style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>Don't have an account yet?&nbsp;&nbsp;&nbsp;<span className={styles['login-font']}>Create account</span></h3>
        </Link>
      </div>
    </div>
    </div>
  );
};
  export default LoginForm;