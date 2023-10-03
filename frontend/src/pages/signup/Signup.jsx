import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';
import borabora from '../../images/bora-bora-island.jpg';
import googleicon from '../../images/google.png';
import beach from '../../images/beach.jpeg'
import { Link } from 'react-router-dom';
const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      console.log('username',username)
      console.log('email',email)
      console.log('password',password)
      console.log('confirmpassword',confirmpassword)
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmpassword', confirmpassword);
      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
         
      });

      console.log(' the Response stored in the database :', response.data);

      if (response.status === 201) {
        alert('You have successfully connected to the database');
        console.log('The response stored in the database is', response);
        navigate('../login'); // Navigate to the login page (remove .js)
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        alert('Password and Confirm Password do not match');
      } else {
        alert('Error connecting to the server. Please try again later.' + error.message);
      }
  }
  };



  return (
    <div className={styles['signup-container']}>
      <div className={styles['signup-image']}>
        <img className={styles['signup-image-content']} src={beach} alt="Bora Bora" />
      </div>
      <div className={styles['signup-form']}>
  
      <div className={styles['signup-content']}>
        <div>
          <h1 className={styles['signup-Heading']}>Hi, Get Started Now 👋</h1>
          <p>Enter details to create your Travel Pulse account</p>
        </div><br></br><br></br>
        <form>
        <div className={styles['signup-google-main']}>
          <button type="submit" className={styles['signup-google']} value="Submit">
            <img className={styles['signup-google-icon']} src={googleicon} height="25vw" />&nbsp;&nbsp;
            <span className={styles['google-text']}>Continue With Google</span>
          </button>
        </div>
        </form>
        <p>---------------------------------------or------------------------------------------------</p>
        <div>
          <br />
        </div>
        
        {/* Move the form element here */}
        <form className={styles['signup-form']} onSubmit={handleSubmit} action='Post'>
          <div>
            <label htmlFor="Name" className={styles['signup-label']}>
              FullName:
            </label><br></br>
            <input
              className={styles['signup-input']}
              type="name"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <br />
            <label htmlFor="email" className={styles['signup-label']}>
              Email:
            </label><br></br>
            <input
              className={styles['signup-input']}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <br />
            <label htmlFor="password" className={styles['signup-label']}>
              Password:
            </label><br></br>
            <input
              className={styles['signup-input']}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <br />
            <label htmlFor="confirmpassword" className={styles['signup-label']}>
              Confirm Password:
            </label><br></br>
            <input
              className={styles['signup-input']}
              type="password"
              id="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div><br></br><br></br><br></br>
          
          <button type="submit" className={styles['signup-button']}>
            Sign Up
          </button><br></br><br></br>
        </form>
        <Link to ='/login'  style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>Already have an account?&nbsp;&nbsp;&nbsp;<span className={styles['signup-font']}>Sign in to account</span></h3>
        </Link>
      </div>
    </div>
    </div>
  );
};
  export default SignupForm;