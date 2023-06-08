const express = require("express");
const { signupUser, loginUser } = require("../controllers/user");

//router
const router = express.Router();

//signup user
router.post("/signup", signupUser);

//login user
router.post("/login", loginUser);

module.exports = router;
