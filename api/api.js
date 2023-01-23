const express = require('express');
const Router = express.Router();
const surveyRouter = require('./route/survey.route');

Router.use('/survey', surveyRouter);

module.exports = Router;