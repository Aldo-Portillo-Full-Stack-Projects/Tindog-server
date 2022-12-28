const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //From stack overflow regex email for JS
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be more than 6 characters"],
    },
}, {
    timestamps: true,
})

//Encrypt pass before saving to DB using .pre()
userSchema.pre("save", async function (next) {
    //If password is not modified hash password
    if(!this.isModified("password")) {
        return next()
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt) //Password is this. because it is refernencing schema
    this.password = hashedPassword
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User