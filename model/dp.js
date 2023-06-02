const mongoose = require('mongoose');
const dpSchema = require('../schema/dp');

const DpModel = mongoose.models.DpModel || mongoose.model('dp', dpSchema);

module.exports = DpModel;
