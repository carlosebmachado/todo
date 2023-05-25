const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    created: {type: Date, default: Date.now},
    lastUpdate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
