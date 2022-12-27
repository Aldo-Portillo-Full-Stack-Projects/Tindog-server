
const mongoose = require("mongoose");

const dogSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    avatar: {
        type: Object,
        default: {},
    },
    age: {
        type: Number,
        required: [true, "Please add an age"]
    },
    bio: {
        type: String,
        required: [true, "Please enter description"]
    },
    hasBeenSwiped: {
        type: Boolean,
        default: false
    },
    hasBeenLiked: {
        type: Boolean,
        default: false
    }
})

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog