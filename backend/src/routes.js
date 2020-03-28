const express = require('express');
const crypto = require('crypto');
const ongcontroller = require('./contrrollers/ongController')
const incidentController = require('./contrrollers/incidentcontroller')
const profile = require('./contrrollers/profilecontroler')
const section = require('./contrrollers/sectioncontroller')

const conection = require('./database/conection');

const routes = express.Router();

routes.post('/secssion', section.create)

routes.get('/ongs', ongcontroller.index);
routes.post('/ongs', ongcontroller.create);

routes.get('/profile', profile.index)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)

module.exports = routes;