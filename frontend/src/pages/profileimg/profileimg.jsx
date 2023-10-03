import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './profileimg.module.css';
import sunset from '../../images/sunsetimage.jpg';

function Profileimg() {
  const [profile, setProfile] = useState({});
  const [profileimg, setProfileimg] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(storedIsLoggedIn)
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      const storedEmail = localStorage.getItem('loggedInUserEmail');
      console.log(storedEmail)
      if (storedEmail) {
        setLoggedInUserEmail(storedEmail);
        fetchUserProfile(storedEmail);
        fetchUserProfileimg(storedEmail);
      }
    }
  }, []);

  const fetchUserProfile = async (storedEmail) => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`http://localhost:3001/getprofile/${storedEmail}`);
      

      if (response.status === 200) {
        setProfile(response.data.user);
      } else {
        console.log('Error fetching user profile');
      }
     
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };
  const fetchUserProfileimg = async (storedEmail) => {
    setIsLoading(true);
    try {
      const responseimg = await axios.get(`http://localhost:3001/getprofileimg/${storedEmail}`);
console.log('API Response Data:', responseimg.data);
  
      if (responseimg.status === 200) {
        setProfileimg(responseimg.data.userimg);
        console.log('v jvfnbrjb gjh bhjervfehv evr', setProfileimg)
      } else {
        console.log('Error fetching user profile image');
      }
    } catch (error) {
      console.error('Error fetching user profile image:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('selectedFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      console.log(response.data);

      // If the upload was successful, set a success message and navigate to the profile
      if (response.status === 200) {
        setSuccessMessage('Profile image uploaded successfully.');
        navigate('/profile'); // Replace '/profile' with the actual URL of the profile page
      } else {
        setError('Error uploading profile image.');
      }
    } catch (error) {
      setError('Error uploading profile image: ' + error.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className={styles['profile-Heading']}> Welcome Back {profile.username} 😊</h1>
        <h6>Here you can see and Update your profile image</h6>
      </div>
      <h2>Your Profile</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <img src={`http://localhost:3001/profileimg/${profileimg.image}`} alt="Profileimg" />
          <br></br><br></br>
          <input type="file" accept="image/*" onChange={handleFileSelect} />
          <button onClick={handleImageUpload}>Upload Profile Image</button>
        </>
      )}
    </div>
  );
}

export default Profileimg;
