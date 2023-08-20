// module imports
const express = require("express");
const cors = require("cors");

//router imports


//util imports


//app config
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req,res) => {
    res.send("Main page");
});

require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));


