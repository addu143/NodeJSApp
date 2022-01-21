var express = require('express');
var router = express.Router();

var caseStudy_controller = require('../controllers/caseStudyController');

// GET request for list of all case studies.
router.post('/caseStudy/filter', caseStudy_controller.caseStudies_list);

module.exports = router;
