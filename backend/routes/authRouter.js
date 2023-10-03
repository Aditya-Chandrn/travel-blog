import { Router } from "express";
import ProfileModel from "../models/ProfileModel.js";

const router = Router();

router.post('/register', async (req, res) => {
    console.log("here");   
    const { username, email, password, confirmPassword } = req.body;
    console.log(password, confirmPassword);
    console.log(req.body)
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).send('Password and Confirm-Password do not match.');
    }
  
    try {
      // Check if the username is already taken
        const existingUser = await ProfileModel.findOne({ username });
    
        if (existingUser) {
            return res.status(400).send('Username is already taken.');
        }
    
        const newUser = new ProfileModel({
            username,
            email,
            password,
            confirmPassword,
        });
    
        console.log("the new user stored in the database is", newUser);
    
        await newUser.save();
        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error saving user: ' + err.message);
    }
});
  
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('username:', username);
    console.log('Password:', password);
  
    try {
        const user = await ProfileModel.findOne({ username, password });
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


router.post('/forgotpassword', async (req, res) => {
    const { username  } = req.body;
    console.log('Email:', username);
  
    try {
        const user = await ProfileModel.findOne({ username  });
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


router.post('/resetpassword', async (req, res) => {
    try {
        const { username, confirmnewpassword, newpassword } = req.body;
    
        // Check if the user exists
        const user = await ProfileModel.findOne({ username });
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
        user.confirmPassword = newpassword;
        await user.save();
    
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;