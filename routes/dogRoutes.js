const express = require("express")
const {getDogs, createDog} = require("../controllers/dogController")
const router = express.Router();

router.post("/api/dog", createDog)

router.get("/api/dogs", getDogs)

module.exports = router