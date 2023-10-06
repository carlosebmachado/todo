const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(URI, { useNewUrlParser: true });

module.exports = mongoose;
