const jwt = require('jsonwebtoken');
const User = require("../models/User");
const nodemailer=require('nodemailer');

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
    console.log(email,password)
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "jmbp1999", { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.createInterviewee = async (req, res) => {
    try {
      const { email, image, nicImage, cv } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already exists");
      }
  
      // Generate a random password
      const password = generateRandomPassword(8);
  
      const user = new User({ email, password, role: "Interviewee", image, nicImage, cv });
      await user.save();
  
      console.log(user.email, user.password)

      // // Send email
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'pamuditha.algoexpert@gmail.com', // Your email
      //     pass: 'Mellfm53dh77@' // Your password
      //   }
      // });
  
      // const mailOptions = {
      //   from: 'pamuditha.algoexpert@gmail.com',
      //   to: email,
      //   subject: 'Your Account Details',
      //   html: `<p>Your account has been created successfully.</p><p>Username: ${email}</p><p>Password: ${password}</p>`
      // };
  
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
  
      res.status(201).send("Interviewee created successfully. Email sent.");
    } catch (error) {
      console.error("Error in creating Interviewee:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  exports.getAllInterviewees = async (req, res) => {
    try {
      const interviewees = await User.find({ role: "Interviewee" });
      res.status(200).json(interviewees);
    } catch (error) {
      console.error("Error in retrieving interviewees:", error);
      res.status(500).send("Internal Server Error");
    }
  };


function generateRandomPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}