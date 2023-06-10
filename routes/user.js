const express = require("express");
const {
  signupUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/user");
const authMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

//router
const router = express.Router();

//signup user
router.post("/signup", signupUser);

//login user
router.post("/login", loginUser);

//get all users
router.get("/all", authMiddleware, isAdmin, getAllUsers);

//get an user
router.get("/:userId", authMiddleware, getUser);

//update user
router.patch("/:userId", authMiddleware, updateUser);

//delete user
router.delete("/:userId", authMiddleware, deleteUser);

module.exports = router;
