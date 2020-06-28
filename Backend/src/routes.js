const express = require('express');

const auth = require('./middleware/auth');

const UserController = require('./controller/UserController');
const CompaniesController = require('./controller/CompaniesController');
const ServicesController = require('./controller/ServiceController');
const AttendanceController = require('./controller/AttendanceController');
const ScheduleController = require('./controller/scheduleController');
const { compare } = require('bcrypt');


const routes = express.Router();

//user
routes.post('/createUser', UserController.create);
routes.post('/user/login', UserController.login);
routes.get('/user/listMissedAppointments/:id', auth, UserController.index);
routes.get('/user/listAll/:id', auth ,UserController.indexAll);
routes.get('/userId', auth, UserController.userId);
//test
routes.get('/testando', auth, (req, res)=>{
    const params = req.query;
    console.log(res.locals.auth_data);
    params.token = req.headers.auther;
    res.send(`O usuário ${params.name} Acabou de efetuar login. lembrar de pegar o token e enviar como parâmetro do front.O Token ${params.token}`)
})
//company
routes.post('/createCompanies', CompaniesController.create);
routes.post('/company/login', CompaniesController.login);
routes.get('/companies/list/:id', auth, CompaniesController.index);
routes.get('/companies/listAll/:id', auth ,CompaniesController.indexAll);
routes.get('/companies' ,CompaniesController.ListCompanies);
routes.get('/servicesCompany/:id', auth ,CompaniesController.ServicesList);
routes.get('/companyId', auth, CompaniesController.CompanyId);

routes.post('/createServices', auth ,ServicesController.create);

routes.post('/createAttendance', auth ,AttendanceController.create);
routes.get('/attendance/:id', AttendanceController.index);
routes.get('/dateAtendance/:date', AttendanceController.indexDate);
//schedule
routes.post('/creatSchedule', auth ,ScheduleController.create);
routes.get('/listar/:id', ScheduleController.index);
routes.get('/hours', ScheduleController.freeHours);
routes.delete('/scheduleUserFromCompany/:id', auth, ScheduleController.deleteScheduleUser)

module.exports = routes;