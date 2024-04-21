const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  meetId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;