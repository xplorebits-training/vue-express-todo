const express = require('express')
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');
})
.catch((error) => {
console.error('Error connecting to MongoDB:', error);
});

app.listen(3009)