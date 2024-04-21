
const express = require('express');
const router = express.Router();
const fileUpLoadController = require('../controllers/fileUpLoadController');

router.post('/save', fileUpLoadController.saveImage);

module.exports = router;