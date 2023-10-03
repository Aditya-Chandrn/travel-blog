// module import
import express, {json, static as staticImgPath} from "express";
import cors from "cors";
import { config } from "dotenv";

//connect database
import ConnectDB from "./db.js";
ConnectDB();

//app config
const app = express();

app.use(json());
app.use(cors());
app.use(staticImgPath('public'));

//imports

import AuthRouter from "./routes/authRouter.js";
import ProfileRouter from "./routes/profileRouter.js";

app.use("/api",AuthRouter);
app.use("/api",ProfileRouter);

config();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));


