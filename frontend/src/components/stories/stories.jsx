
import { useState, useEffect } from 'react';
import storiesStyles from './stories.module.css'; // Import the CSS module
// Import the background image using a relative path
// import contentImage from '../pictures/stock-photo-141823007-1500x1000.jpg'; // Import the content image using a relative path
import { Link } from 'react-router-dom';
// import aivideo from '../pictures/ai.mp4'
// import dhoodsagar from '../pictures/Train-Crossing-Waterfalls-Dudhsagar-Falls.jpg'
// import victoria from '../pictures/Victoria-falls (2).jpg'
// import matheran from '../pictures/Matheran.jpeg'
// import bilkat from '../pictures/bilkat.mp4'
// import borabora from '../pictures/bora-bora-island.jpg'
import borabora from '../../images/bora-bora-island.jpg'
import sunset from '../../images/sunsetimage.jpg'
import matheran from '../../images/Matheran.jpeg'
import victoria from '../../images/Victoria-falls (2).jpg'
import dhoodsagar from '../../images/Train-Crossing-Waterfalls-Dudhsagar-Falls.jpg'
import travel from '../../images/travel.jpg'
import contentImage from '../../images/stock-photo-141823007-1500x1000.jpg'
import Navbar from 'components/navbar/Navbar';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
export default function Stories() {

    const [popularBlogs, setPopularBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(2);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectplace, setSelectplace] = useState('');
    const [selectsort, setSelectsort] = useState('');
    const [select, setSelect] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/popularblogs')
        .then((response) => {
            setPopularBlogs(response.data);
            setError(null);
    
            // Calculate total pages
            const total = Math.ceil(response.data.length / blogsPerPage);
            setTotalPages(total);
          })
          .catch((err) => {
            setError(err);
            console.log(err);
          });
      }, []);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Function to change the current page
    const paginate = (pageNumber) => {
        // Ensure the new page number is within bounds
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleContinentChange = (e) => {
        setSelect(e.target.value);
        setSelectedDate(''); // Reset selected date when the continent selection changes
    };


    return (
        <div>
            <div className={storiesStyles['stories-body']}>
                <div className={storiesStyles['stories-upperbody']}>
                    <Navbar />
                    <center>
                        <h1 className={storiesStyles['stories-cote']}>Travel Stories from different people globally</h1>
                    </center>
                    
                    <h1></h1><br></br><br></br><br></br>
                </div>
                <h1 className={storiesStyles['stories-storyheading']} >Top Travel Sories </h1>
                <p className={storiesStyles['stories-storysubheading']}>Explore our latest stories from our active users</p>
                <div className={storiesStyles['stories-row']}>
                    <div className={storiesStyles['stories-content']}>
                        <Link className={storiesStyles['stories-content-link']} to="/details">
                        <img className={storiesStyles['stories-image']} src={travel} alt="Travel" />
                            <div className={storiesStyles['stories-details']}>
                                <h5>
                                    <span className={storiesStyles['stories-place']}>Dhoodsagar,&nbsp;&nbsp;India</span>
                                    <span className={storiesStyles['stories-date']}>Feb&nbsp;&nbsp;27,&nbsp;&nbsp;2023</span>
                                </h5>
                            </div>
                            <h1>Best place to visit Goa</h1>
                            <h6>I had always been interested in spirituality, so I  decided to take a year-long journey to India to explore various religious practices and traditions. </h6>
                        </Link>
                    </div>


                    <div className={storiesStyles['stories-content']}>
                        <Link className={storiesStyles['stories-content-link']} to="/details">
                            <img className={storiesStyles['stories-image']} src={dhoodsagar} alt="Travel" />
                            <div className={storiesStyles['stories-details']}>
                                <h5>
                                    <span className={storiesStyles['stories-place']}>Dhoodsagar,&nbsp;&nbsp;India</span>
                                    <span className={storiesStyles['stories-date']}>Feb&nbsp;&nbsp;27,&nbsp;&nbsp;2023</span>
                                </h5>
                            </div>
                            <h1>Best place to visit Goa</h1>
                            <h6>I had always been interested in spirituality, so I  decided to take a year-long journey to India to explore various religious practices and traditions. </h6>
                        </Link>
                    </div>

                    <div className={storiesStyles['stories-content']}>
                        <Link className={storiesStyles['stories-content-link']} to="/details">
                            <img className={storiesStyles['stories-image']} src={victoria} alt="Travel" />
                            <div className={storiesStyles['stories-details']}>
                                <h5>
                                    <span className={storiesStyles['stories-place']}>Dhoodsagar,&nbsp;&nbsp;India</span>
                                    <span className={storiesStyles['stories-date']}>Feb&nbsp;&nbsp;27,&nbsp;&nbsp;2023</span>
                                </h5>
                            </div>
                            <h1>Best place to visit Goa</h1>
                            <h6>I had always been interested in spirituality, so I  decided to take a year-long journey to India to explore various religious practices and traditions. </h6>
                        </Link>
                    </div>


                    <div className={storiesStyles['stories-content']}>
                        <Link className={storiesStyles['stories-content-link']} to="/details">
                            <img className={storiesStyles['stories-image']} src={contentImage} alt="Travel" />
                            <div className={storiesStyles['stories-details']}>
                                <h5>
                                    <span className={storiesStyles['stories-place']}>Dhoodsagar,&nbsp;&nbsp;India</span>
                                    <span className={storiesStyles['stories-date']}>Feb&nbsp;&nbsp;27,&nbsp;&nbsp;2023</span>
                                </h5>
                            </div>
                            <h1>Best place to visit Goa</h1>
                            <h6>I had always been interested in spirituality, so I  decided to take a year-long journey to India to explore various religious practices and traditions. </h6>
                            </Link>
                    </div>

                    <div className={storiesStyles['stories-content']}>
                        <Link className={storiesStyles['stories-content-link']} to="/details">
                            <img className={storiesStyles['stories-image']} src={matheran} alt="Travel" />
                            <div className={storiesStyles['stories-details']}>
                                <h5>
                                    <span className={storiesStyles['stories-place']}>Dhoodsagar,&nbsp;&nbsp;India</span>
                                    <span className={storiesStyles['stories-date']}>Feb&nbsp;&nbsp;27,&nbsp;&nbsp;2023</span>
                                </h5>
                            </div>
                            <h1>Best place to visit Goa</h1>
                            <h6>I had always been interested in spirituality, so I  decided to take a year-long journey to India to explore various religious practices and traditions. </h6>
                        </Link>
                    </div>
                </div>
                <div>

                    <div className={storiesStyles['pagination']}>
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            Previous Page
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>Page {currentPage} of {totalPages}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next Page
                        </button>
                    </div>
                </div>

                {/* <div> */}
                {/* <h1> Blogs from the database</h1> */}
                {/* {error ? ( */}
                {/* <p>Error fetching popular blogs. Please try again later.</p> */}
                {/* ) : ( */}

                {/* <div className={storiesStyles['stories-row']}> */}
                {/* Your other content here */}
                {/* {currentBlogs.map((blog) => ( */}
                {/* <div className={storiesStyles['stories-content']} key={blog._id}> */}
                {/* <Link className={storiesStyles['stories-content-link']} to={`/details/${blog._id}`}> */}
                {/* <img className={storiesStyles['stories-image']} src={`http://localhost:3001/popularblogs/${blog.img_fileUrl}`} alt="blogs" /> */}

                {/* <h1>{blog.title}</h1> */}
                {/* <p>Place: {blog.Name}</p> */}
                {/* <p>Country: {blog.Country}</p> */}
                {/* </Link> */}
                {/* </div> */}
                {/* ))} */}
                {/* </div> */}
                {/* )} */}


                {/* </div> */}

            </div>
        </div>

    );
}
