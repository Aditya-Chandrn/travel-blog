// module imports
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const router = express.Router();
const multer =require('multer');
const path =require('path');
//router imports


//util imports


//app config
const app = express();
const signupModel = require('./models/signup.js');
const profileimgmodel =require('./models/profileimg.js')
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.get("/api", (req,res) => {
    res.send("Main page");
});

require("dotenv").config();
const PORT1 = 3001;
const PORT = process.env.PORT;
mongoose.connect('mongodb://127.0.0.1:27017/travel-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.post('/register', async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    console.log(req.body)
    // Check if password and confirmpassword match
    if (password !== confirmpassword) {
      return res.status(400).send('Password and Confirm-Password do not match.');
    }
  
    try {
      // Check if the username is already taken
      const existingUser = await signupModel.findOne({ username });
  
      if (existingUser) {
        return res.status(400).send('Username is already taken.');
      }
  
      const newUser = new signupModel({
        username,
        email,
        password,
        confirmpassword,
       
      });
  
      console.log("the new user stored in the database is", newUser);
  
      await newUser.save();
      res.status(201).send('User registered successfully.');
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(500).send('Error saving user: ' + err.message);
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('username:', username);
    console.log('Password:', password);
  
    try {
      const user = await signupModel.findOne({ username, password });
      console.log('User:', user);
      if (user) {
       res.status(200).json({ message: 'Authentication successful' });
      } 
      else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/forgotpassword', async (req, res) => {
    const { username  } = req.body;
    console.log('Email:', username);
  
    try {
      const user = await signupModel.findOne({ username  });
      console.log('User:', user);
      if (user) {
       res.status(200).json({ message: 'Authentication successful' });
      } 
      else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/resetpassword', async (req, res) => {
    try {
      const { username, confirmnewpassword, newpassword } = req.body;
  
      // Check if the user exists
      const user = await signupModel.findOne({ username });
      console.log(user)
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
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/profile', async (req, res) => {
    try {
      const { username,     newemail,
        newpassword,
        confirmnewpassword, } = req.body;
  
      // Check if the user exists
      const user = await signupModel.findOne({ username });
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
 app.get('/getprofile/:storedEmail', async (req, res) => {
  try {
    const { storedEmail } = req.params;
    console.log(storedEmail)

    // Check if the user exists
    const user = await signupModel.findOne({ username: storedEmail }); // Assuming you want to find the user by email
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
 app.get('/getuserblog/:storedEmail', async (req, res) => {
  try {
    const { storedEmail } = req.params;
    console.log(storedEmail)

    // Check if the user exists
    const user = await signupModel.findOne({ username: storedEmail }); // Assuming you want to find the user by email
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profileimg');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload =multer({
   storage:storage
})
app.post('/upload', upload.single('selectedFile'), async (req, res) => {
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

app.get('/getprofileimg/:storedEmail', async (req, res) => {
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


app.listen(PORT1, () => console.log(`Server listening to port ${PORT1}`));


