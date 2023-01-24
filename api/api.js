const express = require('express');
const Router = express.Router();
const surveyRouter = require('./route/survey.route');
const authRouter = require('./route/auth.route');

Router.use('/survey', surveyRouter);
Router.use('/auth', authRouter);

module.exports = Router;