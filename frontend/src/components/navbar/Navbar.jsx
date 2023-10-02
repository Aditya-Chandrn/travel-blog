import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [profileimg, setProfileimg] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state for login status

  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
  };
  // You would set isLoggedIn based on your authentication logic
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
  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
    // Perform any logout-related logic here
    localStorage.removeItem('isLoggedIn');

  };

  return (
    <div>
      <div className={styles.header}>
        <nav>
          <ul className={`${styles['nav-container-previous']} ${styles['centered']}`}>
            {/* Navigation links */}
            <li className={styles.home}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Destination</Link>
            </li>
            <li className={styles['create-blogs']}>
              <Link to="/stories" style={{ textDecoration: 'none', color: 'inherit' }}><span>Stories</span></Link>
            </li>
            <li className={styles['my-blogs']}>
              <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}><span>Reviews</span></Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className={`${styles['nav-container-next']} ${styles['right-aligned']}`}>
            <div className={`${styles['search-bar']} ${isExpanded ? styles.expanded : ''}`}>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleIconClick}
              />
              <AiOutlineSearch className={styles['search-icon']} onClick={handleIconClick} />
            </div>

            {isLoggedIn ? ( // Render Logout and Profile when logged in
              <>
                <li className={styles.Logout}>
                  <button className={styles['Login-button']} onClick={handleLogout}>Logout</button>
                </li>
                <li className={styles.profile}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles['profile-content']}>
                      <span className={styles['profile-content-name']}>Profile</span>
                      <img className={styles['profile-image']} src={`http://localhost:3001/profileimg/${profileimg.image}`} alt="Profileimg" />
                    </div>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={styles.Signup}>
                  <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Signup</Link>
                </li>
                <li className={styles.Login}>
                  <button className={styles['Login-button']} onClick={() => navigate('/login')}>Login</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
