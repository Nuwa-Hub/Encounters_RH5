const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.post("/createInterviewee", authController.createInterviewee);
router.get("/getusers",authController.getAllInterviewees)
router.post("/createmeet",authController.createmeet)
router.get("/getmeets",authController.getAllMeets)
router.post("/saveimage",authController.saveImage)
router.post("/meetingended",authController.meetingEnded);

module.exports = router;
