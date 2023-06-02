require('dotenv').config();
const mongoose = require('mongoose');

// Connecting server and mongodb
module.exports = {
  init: () => {
    try {
      mongoose.connect(process.env.DB_CONN_URI)
      console.log('Mongodb is connected')
    } catch (err) {
      console.log(err)
    }
  }
}
