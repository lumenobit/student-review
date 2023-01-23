const express = require('express');
const { getAllSurveys, saveSurvey } = require('../controller/survey.controller');
const Router = express.Router();

Router.get('/', getAllSurveys);
Router.post('/', saveSurvey)

module.exports = Router;