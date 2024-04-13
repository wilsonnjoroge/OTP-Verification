const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  Number: {
    type: String,
    required: true,
  }
}, {timestamp : true});

UserSchema.methods.generateJWT = function() { 
  const token = jwt.sign({_id: this._id, number: this.number}, process.env.WT_SECRET, {expiresIn: '7days'});
}

module.exports = model('User', UserSchema);