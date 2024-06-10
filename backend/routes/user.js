const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config"); // assuming JWT_SECRET is exported as an object
const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success, error } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
      error: error.errors, // this will give more detailed validation errors
    });
  }

  const user = await User.findOne({ username: body.username });

  if (user) {
    return res.status(400).json({
      message: "Username already taken",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign({ userid: dbUser._id }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userid: user._id,
      },
      JWT_SECRET
    );

    res.json({ token });
    return;
  }

  res.status(411).json({ message: "Error while logging in" });
});

module.exports = router;
