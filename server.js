const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dogRoutes = require("./routes/dogRoutes")
const userRoutes = require("./routes/userRoutes")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express()

const PORT = process.env.PORT || 5000;

mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on Port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(dogRoutes)
app.use(userRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Tindog Server -- Please Leave</h1>")
})