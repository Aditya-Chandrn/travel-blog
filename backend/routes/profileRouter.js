import { Router } from "express";
import multer, { diskStorage } from 'multer';
import { extname } from 'path';

import ProfileImgModel from "../models/ProfileImgModel.js";

const router = Router();

router.post('/profile', async (req, res) => {
    try {
      const { username,     newemail,
        newpassword,
        confirmnewpassword, } = req.body;
  
      // Check if the user exists
      const user = await ProfileImgModel.findOne({ username });
      console.log("thruy",user)
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Replace this with your actual password verification logic (e.g., bcrypt)
      if (newpassword !== confirmnewpassword) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }
  
      // Update the user's password
      user.password = newpassword;
      await user.save();
      user.confirmpassword = newpassword;
      await user.save();
      user.email = newemail;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
 // Modify your API route to accept a username parameter
 router.get('/getprofile/:storedEmail', async (req, res) => {
  try {
    const { storedEmail } = req.params;
    console.log(storedEmail)

    // Check if the user exists
    const user = await findOne({ username: storedEmail }); // Assuming you want to find the user by email
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return only the necessary user profile data, not the entire user object
    const userProfile = {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmpassword: user.confirmpassword,
      // Add other profile data as needed
    };

    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 router.get('/getuserblog/:storedEmail', async (req, res) => {
  try {
    const { storedEmail } = req.params;
    console.log(storedEmail)

    // Check if the user exists
    const user = await findOne({ username: storedEmail }); // Assuming you want to find the user by email
    console.log('user from get userblog',user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return only the necessary user profile data, not the entire user object
    const userProfile = {
      username: user.username,
      // Add other profile data as needed
    };

    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profileimg');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + extname(file.originalname));
  },
});

const upload =multer({
   storage:storage
})
router.post('/upload', upload.single('selectedFile'), async (req, res) => {
  const { username } = req.body; // Access the username
  console.log('Username:', username);
  console.log(req.file);

  try {
    // Check if the user exists
    let userimg = await profileimgmodel.findOne({ username });

    if (!userimg) {
      // If the user does not have a profile image, create a new profileimg object
      userimg = new profileimgmodel({
        username,
        image: req.file.filename,
        origimg: req.file.originalname
      });
    } else {
      // If the user already has a profile image, update it
      userimg.image = req.file.filename;
      userimg.origimg = req.file.originalname;
    }

    // Save the profileimg object to the database
    await userimg.save();

    // Return a success response
    res.json({ message: 'Profile image updated successfully' });
  } catch (error) {
    // Handle error, send an error response, or log the error
    console.error('Error updating profile image:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile image' });
  }
});

router.get('/getprofileimg/:storedEmail', async (req, res) => {
  try {
    const { storedEmail } = req.params;
    console.log("the storedemail is",storedEmail)

    // Check if the user exists
    const userimg = await profileimgmodel.findOne({ username: storedEmail });
    console.log('the userimg is',userimg)
    if (!userimg) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return only the necessary user profile data, not the entire user object
    const userProfileimg = {
      username: userimg.username,
      image:userimg.image
     // Add other profile data as needed
    };

    res.status(200).json({ userimg: userProfileimg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;