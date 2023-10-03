import { json, Router } from "express";
import createBlog from "../controllers/blogControllers/createBlog.js";
import multer from "multer";

const router = Router();

const upload  = multer();

router.post("/create", upload.none(), async (req,res) => {
    res.header("Content-Type","multipart/form-data");
    const {location, title, content} = req.body;
    console.log(location, title, content);
    createBlog(location, title, content);
    res.send("hello");
});


router.get("/read/:id", async (req,res) => {
    
});

router.get("/search", async (req,res) => {

});

export default router;