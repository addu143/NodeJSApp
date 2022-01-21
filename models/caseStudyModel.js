const mongoose = require('mongoose');

const caseStudyModelSchema = mongoose.Schema({
    key: {type: String, required: true},
    value: {type: String, required: true},
    createdAt: {type: Date, required: true}
});

module.exports = mongoose.model('Records', caseStudyModelSchema);