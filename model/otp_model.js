const { Schema, model} = require('mongoose');


const OtpSchema = new Schema({
  number : {
    type: String,
    
    required: true
  },
  otp : {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {expires: 300 } // Expires in 300 seconds
  }
}, {timestamp: true})

module.exports = model('Otp', OtpSchema);