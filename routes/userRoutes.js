const express = require("express");
const { registerUser, loginUser, logout, getUser, loginStatus, addDog } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/logout", logout)
router.get("/getuser", protect, getUser)
router.get("/loggedin", loginStatus)

router.put("/addDog", protect, addDog)



module.exports = router