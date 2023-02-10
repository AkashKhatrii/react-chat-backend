const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verify = require("../utils/verify");
const secretKey = "mylstrongsecret";

router.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  const data = await user.save();
  

  res.status(200).json({ message: "User saved", data: data });
});

maxAge = 60 * 60;
path = "http://localhost:3000/";
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user)

  if (user) {
    if (user.password === req.body.password) {
      jwt.sign({ user }, secretKey, { expiresIn: "3600s" }, (err, token) => {
        if (err) {
          res.json({
            message: err,
          });
        } else {
          // console.log(token)
          // res.cookie("name", "akash")
          res.cookie("access_token", token);
          res.status(200).json({ user: user, access_token: token });
        }
      });
    } else {
      res.status(400).json({ message: "wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post("/test", verify, (req, res) => {
  // console.log(req.token)
  jwt.verify(req.token, secretKey, (err, data) => {
    if (err) {
      res.send({
        result: "Invalid token",
      });
    } else {
      res.json({
        message: "Token verified",
        data,
      });
    }
  });
});


router.get("/getuser", verify, (req, res) => {

    
    jwt.verify(req.token, secretKey, (err, data) => {
        if (err) {
          res.json({
            result: "Invalid token",
          });
        } else {
          res.json({
            message: "Token verified",
            data,
          });
        }
      });
})

module.exports = router;
