const express = require("express")
const {getDogs, createDog} = require("../controllers/dogController")
const router = express.Router();

router.post("/createDog", createDog)

router.get("/getDogs", getDogs)

module.exports = router