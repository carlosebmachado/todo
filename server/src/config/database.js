const mongoose = require('mongoose');

// const URI = 'mongodb://127.0.0.1:27017/todo';
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@atlascluster.qqmavpm.mongodb.net/todo?retryWrites=true&w=majority`;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
