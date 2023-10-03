import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    blogId: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        // required: true
    },
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Blog = new model("Blog", blogSchema);

export default Blog