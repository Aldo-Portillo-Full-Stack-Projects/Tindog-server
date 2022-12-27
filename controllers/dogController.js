const asyncHandler = require('express-async-handler')
const Dog = require('../models/dogModel')

const getDogs = asyncHandler(async(req, res) => {
    const dogs = await Dog.find({})
    res.status(200).json(dogs)
})


const createDog = asyncHandler(async (req,res) => {
    const {name, avatar, age, bio } = req.body;

    if(!name || !avatar || !age || !bio) {
        res.status(400)
        throw new Error("Please fill in all fields")
    }

    const dog = await Dog.create({
        name,
        avatar,
        age, 
        bio,
    })

    res.status(201).json(dog)
})
