// module import
import express, {json, static as staticImgPath, urlencoded} from "express";
import cors from "cors";
import { config } from "dotenv";

//connect database
import ConnectDB from "./db.js";
ConnectDB();

//app config
const app = express();

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());
app.use(staticImgPath('public'));


//routing
import AuthRouter from "./routes/authRouter.js";
import ProfileRouter from "./routes/profileRouter.js";
import BlogRouter from "./routes/blogRouter.js";

app.use("/api/account",AuthRouter);
app.use("/api/profile",ProfileRouter);
app.use("/api/blog", BlogRouter);

config();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));


