const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Check if the email already exists in the database
  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        // If user with the same email exists, return an error
        return res.status(400).json({ error: 'Email already exists' });
      } else {
        // If email does not exist, hash the password and create the new user
        bcrypt.hash(password, 10)
          .then((hash) => {
            User.create({ fname, lname, email, password: hash })
              .then((user) => res.json({ status: 'Success' }))
              .catch((err) => res.status(500).json({ error: 'Internal server error' }));
          })
          .catch((err) => res.status(500).json({ error: 'Internal server error' }));
      }
    })
    .catch((err) => res.status(500).json({ error: 'Internal server error' }));
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token, { httpOnly: true, secure: true });
          res.json({ status: "success" });
        } else {
          res.status(401).json({ error: "Password is incorrect" });
        }
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






module.exports = { register, login };
