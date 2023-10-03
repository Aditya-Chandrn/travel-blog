import Blog from "../../models/blogModel.js";

const createTime = () => {
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    if(date<10) date = "0"+date;
    if(month<10) month = "0"+month;
    if(hour<10) hour = "0"+hour;
    if(min<10) min = "0"+min;
    if(sec<10) sec = "0"+sec;

    const full_date = year+month+date;
    const full_time = `${hour}${min}${sec}`;
    return [full_date, full_time];
}

const createBlog = async (location, title, content) => {
    console.log(location, title, content);
    const [full_date, full_time] = createTime();

    const username = "myUser";

    try{
    const blogId = `${username}.${full_date}.${full_time}`.toLowerCase();
    const newBlog = new Blog({
        blogId: blogId,
        username : username,
        title: title,
        content: content,
        location: location
    });

        const response = await newBlog.save();
        console.log("BLOG CREATED\n", response.data);
    } catch (error) {
        console.log("ERROR CREATING BLOG : ", error.message);
    }    
} 

export default createBlog;