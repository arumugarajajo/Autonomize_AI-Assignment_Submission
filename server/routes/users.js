// routes/users.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.get("/checkDbConnection", async (req, res) => {
  try {
    console.log("Checking database connection...");
    res.json({ message: "Database connection is active" });
  } catch (error) {
    console.error("Error checking database connection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route 2: Find all the users where users mutually follow each other and save them as friends
router.post(
  "/findFriends",
  [body("username").notEmpty().isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const friends = await User.find({
        username: { $in: user.followers },
        followers: username,
      });

      res.json(friends);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server Error");
    }
  }
);

// Route 3: Search the saved data from the database based on username, location, etc.
router.get(
  "/search",
  [body("query").notEmpty().isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { query } = req.body;
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
        ],
      });

      res.json(users);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server Error");
    }
  }
);

// Route 4: delete a record based on a given username from the database
router.delete("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route 5: Update fields
router.put(
  "/update/:username",
  [
    body("location").optional().isString(),
    body("blog").optional().isString(),
    body("bio").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username } = req.params;
      const user = await User.findOneAndUpdate(
        { username },
        { $set: req.body },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server Error");
    }
  }
);

// Route 6: Return a list of all users from the database sorted by given fields
router.get("/getAllUsers/:sortField", async (req, res) => {
  try {
    const { sortField } = req.params;
    const users = await User.find().sort({ [sortField]: 1 });

    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

router.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).send("Server Error");
});

module.exports = router;
