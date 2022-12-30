const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const dogRoutes = require("./routes/dogRoutes")
const cookieParser = require("cookie-parser");
const path = require("path")

const app = express()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://pinvent-portillo-app.vercel.app"], //Make sure to add url to active site here
    credentials: true
}))


app.use("/uploads", express.static(path.join(__dirname, "uploads")))
//Routes Middleware
app.use("/api/user", userRoutes)
app.use("/api/dogs", dogRoutes)

//Routes
app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>")
})
//Connect to DB and Start Server
const PORT = process.env.PORT || 5000;

mongoose 
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err));