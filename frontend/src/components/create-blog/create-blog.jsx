import React, { useState, useEffect } from 'react';
import createStyles from './create-blog.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Create() {
    const [placename, setPlacename] = useState('');
    const [location, setLocation] = useState('');
    const [review, setReview] = useState('');
    const [select, setSelect] = useState('');
    const [title, settitle] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        console.log(storedIsLoggedIn)
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem('loggedInUserEmail');
            console.log(storedEmail)
            if (storedEmail) {
                setLoggedInUserEmail(storedEmail);

            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
           
            const profileImageUrl = localStorage.getItem('profileImageUrl');
            formData.append('profileImageUrl', profileImageUrl);

            const response = await axios.post('http://localhost:3001/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);

            if (response.status === 201) {
                alert('You have successfully created a blog.');
                navigate('/'); // Navigate to the desired page after successful submission
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to the server. Please try again later.');
        }
    };

    const handleContinentChange = (e) => {
        setSelect(e.target.value);
        setSelectedDate(''); // Reset selected date when the continent selection changes
      };
    const handleImageFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    return (
        <div className={createStyles['create-body']}>
            <h1 className={createStyles['create-title']}>Share your Travel Experience in form of a story</h1>

            {isLoggedIn ?
                (
                    <div>
                        <h1></h1>
                        <form className={createStyles['create-form']} onSubmit={handleSubmit} action='Post'>
                            <div className={createStyles['create-box']}>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="name">Place Name</label><br></br>
                                    <input
                                        type="text"
                                        id="placenamename"
                                        value={placename}
                                        onChange={(e) => setPlacename(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="title">Title of your Blog</label><br></br>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="description">Your Review</label><br></br>
                                    <textarea
                                        id="review"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="subtitle">Location</label><br></br>
                                    <input
                                        type="text"
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="continent">When did you travel?</label><br />
                                    <select
                                        id="date"
                                        value={select}
                                        onChange={handleContinentChange}
                                        required
                                    >
                                        <option value="">Select One</option>
                                        <option value="date">Date</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                                {select === 'date' && (
                                    <div className={createStyles['create-form-group']}>
                                        <label htmlFor="travelDate">Travel Date:</label><br />
                                        <input
                                            type="date"
                                            id="travelDate"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                        />
                                    </div>
                                )}

                                {/* Display the selected date */}
                                {selectedDate && (
                                    <p className={createStyles['create-form-group']}>You selected the date: {selectedDate}</p>
                                )}

                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="imgFile">Upload the image of your Blog</label>
                                    <input
                                        type="file"
                                        id="imgFile"
                                        name="imgFile"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageFileChange}
                                        multiple
                                    />
                                </div>

                                <button className={createStyles['create-button']} type="submit">Upload</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <center><b>
                        <h1>Please log in to create a blog.</h1></b></center>
                )}
        </div>
    );
}