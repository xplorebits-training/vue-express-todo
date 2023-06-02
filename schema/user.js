const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        );
      },
      message: 'Given email address is not valid',
    },
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length >= 6;
      },
      message: 'Password should be at least 6 characters long',
    },
    required: [true, 'Password is required'],
  },
  phoneNumber: Number,
  photoURL: String
});

module.exports = userSchema;
