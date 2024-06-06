const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { SALT_ROUND } = require("../config/constant");

// validate signup credential
userRouter.post("/signup", async (req, res, next) => {

  try {
    const { username, password, name } = req.body;
    if (!username || username.length < 3) {
      res
        .send({
          sucess: false,
          message: "username must be more than 3 character",
        })
        .statusCode(400);
    }
    if (password) {
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
      if (!password.match(passw)) {
        res
          .send({
            sucess: false,
            message: `Password:${password} must be atleast one Uppercase and lowercase letter, one number and between 8 to 15 characters`,
          })
          .statusCode(400);
      }
    }

    const userExist = await User.exists({ username: username });
    if (userExist) {
      res
        .send({
          sucess: false,
          message: `Username ${username} already present`,
        })
        .statusCode(400);
    }

    next();
  } catch (error) { }
});

//signup data insert
userRouter.post("/signup", async (req, res) => {
  const payload = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, SALT_ROUND),
    name: req.body.name
  }
  const user = User(payload);
  await user.save();

  res.status(201).send({
    sucess: true,
  })
});

let time = 1000000 * 10000000;
const createToken = (id) => {
  return jwt.sign({ id }, "rupesh_secrete_key", {
    expiresIn: time,
  });
};

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }, { username: 1, password: 1 });
  if (!user || !username) {
    return res
      .status(400)
      .send({
        sucess: false,
        message: "Username is not valid",
      })

  }
  const isMatch = await bcrypt.compare(password, user.password);


  if (isMatch) {
    jwt.sign(
      { user },
      "rupesh_secrete_key",
      { expiresIn: "99years" },
      (err, token) => {
        return res
          .status(201)
          .json({
            sucess: true,
            token,
          });
      },
    );
  } else {
    return res
      .status(400)
      .send({
        sucess: false,
        message: "Password is not valid",
      });
  }
});

module.exports = userRouter;
