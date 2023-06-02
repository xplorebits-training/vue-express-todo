const mongoose = require('mongoose');
const userSchema = require('../schema/user');

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = UserModel;
