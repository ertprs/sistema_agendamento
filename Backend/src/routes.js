const express = require('express');

const auth = require('./middleware/auth');

const UserController = require('./controller/UserController');
const CompaniesController = require('./controller/CompaniesController');
const ServicesController = require('./controller/ServiceController');
const AttendanceController = require('./controller/AttendanceController');
const ScheduleController = require('./controller/scheduleController');


const routes = express.Router();

routes.post('/createUser', UserController.create);
routes.get('/user/listMissedAppointments/:id', UserController.index);
routes.get('/user/listAll/:id', UserController.indexAll);
routes.post('/user/login', UserController.login);

routes.get('/testando', auth, (req, res)=>{
    res.send('Entrou')
})

routes.post('/createCompanies', CompaniesController.create);
routes.get('/companies/list/:id', CompaniesController.index);
routes.get('/companies/listAll/:id', CompaniesController.indexAll);

routes.post('/createServices', ServicesController.create);

routes.post('/createAttendance', AttendanceController.create);

routes.post('/creatSchedule', ScheduleController.create);
routes.get('/listar/:id', ScheduleController.index);

module.exports = routes;