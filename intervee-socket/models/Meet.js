const mongoose = require('mongoose');

const meetSchema = new mongoose.Schema({
  meetId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  available:{
    type:Boolean,
    default:true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Meet = mongoose.model('Meet', meetSchema);

module.exports = Meet;