import React, { useState, useEffect } from "react";
import styles from "./create.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Create() {
  const [placeName, setPlaceName] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");


//   const [location, setLocation] = useState("");
//   const [select, setSelect] = useState("");
//   const [imgFile, setImgFile] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(storedIsLoggedIn);
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      const storedEmail = localStorage.getItem("loggedInUserEmail");
      console.log(storedEmail);
      if (storedEmail) {
        setLoggedInUserEmail(storedEmail);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

    //   const profileImageUrl = localStorage.getItem("profileImageUrl");
    //   formData.append("profileImageUrl", profileImageUrl);

      const response = await axios.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      if (response.status === 201) {
        alert("You have successfully created a blog.");
        navigate("/"); // Navigate to the desired page after successful submission
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server. Please try again later.");
    }
  };

//   const handleContinentChange = (e) => {
//     setSelect(e.target.value);
//     setSelectedDate(""); // Reset selected date when the continent selection changes
//   };
//   const handleImageFileChange = (e) => {
//     setImgFile(e.target.files[0]);
//   };

  return (
    isLoggedIn?(
      <div className={styles.scaffold}>
          {/* <img src={bgImg} alt="" /> */}
      <center>
        <h1>Share your experience with others!!</h1>
      </center>
      <div className={styles.formBox}>
        <form action="Post" onSubmit={handleSubmit}>
          Title: <br />
          <input 
            type="text"
            name="title" 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
            className={styles.box1} />
          <br />
          Name of the Location: <br />
          <input
            type="text"
            name="placeName"
            id="placeName"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            required
            className={styles.box1}
            />
          <br />
          Share your experience here: <br />
          <textarea
            name="desc"
            id="desc"
            cols="51"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className={styles.box2}
          ></textarea>
          <br />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
    ):
    (
        <center><b><h1>Please log in to create a blog.</h1></b></center>
    )
  );
}
