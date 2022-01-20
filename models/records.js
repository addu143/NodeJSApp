const mongoose = require('mongoose');

const recordsSchema = mongoose.Schema({
    key: {type: String, required: true},
    value: {type: String, required: true},
    createdAt: {type: Date, required: true}
});

module.exports = mongoose.model('Records', recordsSchema);