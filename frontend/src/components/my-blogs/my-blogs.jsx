import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myblogStyles from './my-blogs.module.css';
import matheran from '../../images/Matheran.jpeg';
import contentImage from '../../images/stock-photo-141823007-1500x1000.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyBlogs() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userBlogs, setUserBlogs] = useState([]); // Initialize as an empty array
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [blogsPerPage] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem('loggedInUserEmail');
            if (storedEmail) {
                setLoggedInUserEmail(storedEmail);
                fetchUserProfile(storedEmail);
            }
        }
    }, []);

    const paginate = (pageNumber) => {
        // Ensure the new page number is within bounds
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const fetchUserProfile = async (storedEmail) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/getuserblog/${storedEmail}`);
    
            if (response.status === 200) {
                setProfile(response.data.user);
                
                // Check if user blogs data is present and not empty
                if (Array.isArray(response.data.blogs) && response.data.blogs.length > 0) {
                    setUserBlogs(response.data.blogs);
                    setTotalPages(Math.ceil(response.data.blogs.length / 5));
                } else {
                    setUserBlogs([]);
                    setTotalPages(1); // Set to 1 page if there are no user blogs
                }
            } else {
                console.log('Error fetching user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
    
            // Handle the error here (e.g., display an error message)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1></h1>
            <br></br>
            <br></br>
            <br></br>
            <li className={myblogStyles.Login}>
                <button className={myblogStyles['Login-button']} onClick={() => navigate('/profile')}>profile</button>
            </li>
            <br></br>
            <br></br>
            {isLoggedIn ? (
                <div className={myblogStyles['my-blog-body']}>
                    <div className={myblogStyles['my-blog-row']}>
                        <div className={myblogStyles['my-blog-content']}>
                            <Link className={myblogStyles['my-blog-content-link']} to="/details">
                                <img className={myblogStyles['my-blog-image']} src={contentImage} alt="Travel" />
                                <h1>This is a very beautiful place in North-East India that will make you feel calm and happy.</h1>
                            </Link>
                        </div>
                        <div className={myblogStyles['my-blog-content']}>
                            <Link className={myblogStyles['my-blog-content-link']} to="/details">
                                <img className={myblogStyles['my-blog-image']} src={contentImage} alt="Travel" />
                                <h1>This is a nice place in London.</h1>
                            </Link>
                        </div>
                        <div className={myblogStyles['my-blog-content']}>
                            <Link className={myblogStyles['my-blog-content-link']} to="/details">
                                <img className={myblogStyles['my-blog-image']} src={matheran} alt="Travel" />
                                <h1>This is a nice place in Brazil.</h1>
                            </Link>
                        </div>
                        <br></br>
                        {userBlogs.length === 0 ? (
                            <h1> Hi {profile.username}! You have not created any blogs yet.</h1>
                        ) : (
                            userBlogs.slice((currentPage - 1) * 5, currentPage * 5).map((blog) => (
                                <div className={myblogStyles['my-blog-content']} key={blog._id}>
                                    <Link className={myblogStyles['my-blog-content-link']} to={`/details/${blog._id}`}>
                                        <img className={myblogStyles['my-blog-image']} src={blog.img_fileUrl || contentImage} alt="Travel" />
                                        <h1>{blog.title}</h1>
                                    </Link>
                                </div>
                            ))
                        )}
                        <div className={myblogStyles['pagination']}>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                &lt;
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Please log in to see my-blogs.</h1>
                </div>
            )}
        </div>
    );
}
