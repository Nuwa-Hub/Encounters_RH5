const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.post("/createInterviewee", authController.createInterviewee);
router.get("/getusers",authController.getAllInterviewees)
module.exports = router;
