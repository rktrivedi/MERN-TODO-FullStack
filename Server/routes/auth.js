const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Setting Up Sign-Up Module

router.post("/register", async (req, res) => {
  try {
    const {email, username, password, image} = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({email, username, password: hashedPassword, image});
    await user.save();
    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "User Already Exists"});
  }
});

// For Login

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(400).json({message: "Please Sign Up First"});
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({message: "Incorrect Password"});
    }

    const {password, ...others} = user._doc;
    res.status(200).json({...others});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "User Already Exists"});
  }
});

module.exports = router;
