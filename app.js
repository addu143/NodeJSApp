const express = require("express");
const app = express();
const caseStudyRoute = require('./routes/caseStudyRoute');

app.use(express.json());
app.use('/api', caseStudyRoute);

module.exports = app;
