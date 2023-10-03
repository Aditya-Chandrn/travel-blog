import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './profile.module.css';
import sunset from '../../images/sunsetimage.jpg';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [newpassword, setNewpassword] = useState('');
  const [newemail, setNewemail] = useState('');
  const [confirmnewpassword, setConfirmNewpassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [confirmpasswordDisabled, setConfirmpasswordDisabled] = useState(true);
  
  const [profileimg, setProfileimg] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleEditEmail = () => {
    // When the pencil button is clicked, enable the email input
    setEmailDisabled(false);
  };
  const handlepassword = () => {
    // When the pencil button is clicked, enable the email input
    setPasswordDisabled(false);
  };
  const handleconfirmpassword = () => {
    // When the pencil button is clicked, enable the email input
    setConfirmpasswordDisabled(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!emailDisabled && newemail.trim() === '') {
      validationErrors.email = 'Email cannot be blank.';
    }

    if (!passwordDisabled && newpassword.trim() === '') {
      validationErrors.password = 'Password cannot be blank.';
    }

    if (!confirmpasswordDisabled && confirmnewpassword.trim() === '') {
      validationErrors.confirmnewpassword = 'Confirm Password cannot be blank.';
    }

    // Validate your form fields here (e.g., password, confirmation)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:3001/profile', {
          username: profile.username,
          newemail: emailDisabled ? profile.email : newemail,
          newpassword: passwordDisabled ? profile.password : newpassword,
          confirmnewpassword: confirmpasswordDisabled ? profile.confirmpassword : confirmnewpassword,
        });

        if (response.status === 200) {
          // Set the email in local storage
          alert('You have successfully reset your values');
          navigate('/');
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
    <div className={styles['profile-container']}>
      <div className={styles['profile-image']}> 
      <Link to="/profileimg" style={{ textDecoration: 'none', color: 'blue' }}>

        <img className={styles['profile-image-content']} src={`http://localhost:3001/profileimg/${profileimg.image}`} alt="Profileimg" /><br></br> <br></br>
        </Link>
        <div className={styles['profile-links-container']}>
          <div className={styles['profile-links-container-create']}>
            <Link to="/create" style={{ textDecoration: 'none', color: 'blue' }}>
              <span className={styles['profile-link']}>
                <label htmlFor="newpassword" className={styles['profile-create-blog']}>
                  Create blogs:
                </label>
              </span>
            </Link>
          </div>
          <div className={styles['profile-links-container-my-blog']}>
            <Link to="/my-blogs/" style={{ textDecoration: 'none', color: 'blue' }}>
              <span className={styles['profile-link']}>
                <label htmlFor="newpassword" className={styles['profile-create-blog']}>
                  MY blogs:
                </label>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles['profile-form']}>
        <div className={styles['profile-content']}>
          <div>
            <h1 className={styles['profile-Heading']}> Welcome  Back {profile.username}  😊</h1>
            <h6>Here you can see and Update your profile</h6>
          </div>
          <br />
          <form className={styles['profile-form']} onSubmit={handleSubmit} action="post">
            <div>
              <br />
              <label htmlFor="newpassword" className={styles['profile-label']}>
                User Name:
              </label>
              <br />
              <input
                className={styles['profile-input']}
                type="text"
                id="username"
                placeholder={profile.username}

                readOnly
              />
            </div>
            <br />
            <div>
              <br />
              <label htmlFor="newemail" className={styles['profile-label']}>
                Email:
              </label>
              <br />
              <input
                className={styles['profile-input']}
                type="email"
                id="newemail"
                value={newemail}
                placeholder={profile.email}
                onChange={(e) => setNewemail(e.target.value)}
                disabled={emailDisabled}
                reqiured
              />
              <Link
                onClick={handleEditEmail}
                className={styles['profile-edit-button']}
              >
                ✏️
              </Link>
            </div>
            <br />
            <div>
              <br />
              <label htmlFor="newpassword" className={styles['profile-label']}>
                New Password:
              </label>
              <br />
              <input
                className={styles['profile-input']}
                type="password"
                id="newpassword"
                value={newpassword}
                defaultValue={profile.password}
                placeholder={profile.password}
                onChange={(e) => setNewpassword(e.target.value)}
                disabled={passwordDisabled}
                reqiured
              />
              <Link
                onClick={handlepassword} // Clicking this button will enable the input field
                className={styles['profile-edit-button']}
              >
                ✏️
              </Link>
            </div>
            <br />
            <div>
              <br />
              <label htmlFor="confirmnewpassword" className={styles['profile-label']}>
                Confirm New Password:
              </label>
              <br />
              <input
                className={styles['profile-input']}
                type="password"
                id="confirmnewpassword"
                value={confirmnewpassword}
                defaultValue={profile.confirmpassword}
                placeholder={profile.confirmpassword}
                onChange={(e) => setConfirmNewpassword(e.target.value)}
                disabled={confirmpasswordDisabled}
                reqiured
              />
              <Link
                onClick={handleconfirmpassword} // Clicking this button will enable the input field
                className={styles['profile-edit-button']}
              >
                ✏️
              </Link>
            </div>
            <br />
            <br />
            <button type="submit" className={styles['profile-button']}>
              Reset values
            </button>
            <br />
            <button className={styles['profile-loginbutton']} onClick={() => navigate('/')}> ← Back to home</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
