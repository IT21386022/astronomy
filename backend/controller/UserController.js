const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      // If user with the same email exists, return an error
      return res.status(400).json({ error: 'Email already exists' });
    }

    // If email does not exist, create the new user
    const newUser = new User({ fname, lname, email, password });
    await newUser.save();
    res.json({ status: 'Success' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      // If user not found, return an error
      return res.status(404).json({ error: "User not found" });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // If password matches, generate token
    const token = jwt.sign(
      { email: user.email },
      "jwt-secret-key",
      { expiresIn: "1d" }
    );
    // Set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json({ status: "success" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
