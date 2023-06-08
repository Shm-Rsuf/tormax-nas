const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

//static method for signup
userSchema.statics.signup = async function (
  name,
  username,
  email,
  password,
  ipAddress
) {
  //validation
  if (!name || !username || !email || !password || !ipAddress) {
    throw new Error("all fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "please select a stronger password that incorporates a mix of uppercase and lowercase letters, numbers, and special characters."
    );
  }
  const existedEmail = await this.findOne({ email });
  if (existedEmail) {
    throw new Error("email already used");
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //creating user
  const user = await this.create({
    name,
    username,
    email,
    password: hashPassword,
    ipAddress,
  });

  return user;
};

//static method for login
userSchema.statics.login = async function (email, password, ipAddress) {
  //validation
  if (!email || !password || !ipAddress) {
    throw Error("all fields must be filled");
  }
  const user = await this.findOne({ email, password });
  if (!user) {
    throw Error("incorrect email or resticted ip-address");
  }

  //comparing password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
