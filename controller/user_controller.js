const bcryptjs = require('bcryptjs');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');
const User = require('../model/user_model');
const otpModel = require('../model/otp_model');


const nodemailer = require('nodemailer');

exports.signUp = async (req, res) => {
  try {
    // Finding user by number
    const user = await User.findOne({ number: req.body.number });
    if (user) {
      return res.status(400).send('User already exists');
    }

    const OTP = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false
    });

    const number = req.body.number;
    console.log(OTP);

    const otpDocument = new otpModel({
      number,
      otp: OTP
    });

    // Save the OTP document
    await otpDocument.save();

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com', // Enter your email address
        pass: 'your_password' // Enter your password
      }
    });

    const mailOptions = {
      from: 'your_email@gmail.com', // Enter your email address
      to: user.email, // Assuming you have an email field in your user model
      subject: 'OTP Verification',
      text: `Your OTP is: ${OTP}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error);
        return res.status(500).send('Error sending OTP email');
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).send('OTP sent successfully');
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};



exports.verifyOtp = async (req, res) => {};