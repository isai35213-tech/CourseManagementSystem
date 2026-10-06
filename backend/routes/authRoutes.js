const express = require("express");
const router = express.Router();

const User = require("../models/User");

/*
====================================================
REGISTER
POST /api/auth/register
====================================================
*/

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message:
          "Please fill all the fields"
      });
    }

    // Check if email already exists
    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already registered"
      });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role
    });

    // Save to MongoDB
    await newUser.save();

    res.status(201).json({
      message:
        "Registration successful",

      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error"
    });
  }
});


/*
====================================================
LOGIN
POST /api/auth/login
====================================================
*/

router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Please enter email and password"
      });
    }

    // Find user in MongoDB
    const user =
      await User.findOne({
        email: email.toLowerCase().trim()
      });

    // User not found
    if (!user) {
      return res.status(401).json({
        message:
          "Account not found"
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({
        message:
          "Incorrect password"
      });
    }

    // Send user details
    res.status(200).json({
      message:
        "Login successful",

      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error"
    });
  }
});


module.exports = router;