const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "jmbp1999", { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).send("Internal Server Error");
  }
};
