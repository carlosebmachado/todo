const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    when: { type: Date },
    done: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
