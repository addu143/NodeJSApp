const express = require("express");
const app = express();
const db = require('./database/database');
const caseStudyRoute = require('./routes/caseStudyRoute');
app.use(express.json());
app.use('/api', caseStudyRoute);

module.exports = app;
