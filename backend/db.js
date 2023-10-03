import {config} from "dotenv";
import mongoose from "mongoose";

config();

const MONGODB_URI = process.env.MONGODB_URI;
const ConnectDB =  () => {
    try{
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB');
    } catch(error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export default ConnectDB;