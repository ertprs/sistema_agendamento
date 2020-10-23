const express = require('express');

const auth = require('./middleware/auth');

const UserController = require('./controller/UserController');
const CompaniesController = require('./controller/CompaniesController');
const AttendanceController = require('./controller/AttendanceController');
const ScheduleController = require('./controller/scheduleController');
const ServiceController = require('./controller/ServiceController');

const multer = require('./upload/multer');
const { upload } = require('./controller/CompaniesController');
const upload1 = require('multer')();
const mailer = require('nodemailer');


const routes = express.Router();

routes.post('/teste', (req, res, next)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    console.log(req.body)

    const smtpTransport = mailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '07ca2074eac847',
            pass: '7c5268436ad14e'
        }
    })

    const mail = {
        from: 'rendrikson16@gmail.com',
        to: email,
        subject: `${nome} te enviou uma mensagem`,
        text: mensagem,
        html: '<b>Mensagem em html</b>'
    }

    smtpTransport.sendMail(mail, (error, info)=>{
        if(error){
           return res.status(400).send('falhou')
        }
        return res.status(200).send('enviou')
    });
})

//user
routes.post('/createUser', UserController.create);
routes.post('/user/login', UserController.login);
routes.get('/user/listMissedAppointments/:id', auth, UserController.index);
routes.get('/user/servicesHistoric/:id', auth, UserController.servicesHistoric);
routes.get('/user/listAll/:id', auth ,UserController.indexAll);
routes.get('/userId', auth, UserController.userId);
routes.get('/profile/:id', auth, UserController.profile);
routes.put('/updateProfile/:id', auth, UserController.updateProfile);
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
routes.get('/serviceSelect/:id', auth, CompaniesController.ServicesSelect);
routes.get('/companySelect/:id' ,CompaniesController.CompanySelect);
routes.put('/companyUpdate/:id' ,CompaniesController.uploadData);

routes.put('/uploadImage/:id', multer.any('image'), CompaniesController.upload);

//Services
routes.post('/createServices', auth ,ServiceController.create);
routes.put('/serviceUpdate/:id', auth, ServiceController.update);
routes.delete('/deleteService/:id', auth, ServiceController.delete);

//Attendance
routes.post('/createAttendance', auth ,AttendanceController.create);
routes.get('/attendance/:id', AttendanceController.index);
routes.get('/dateAtendance/:date', AttendanceController.indexDate);
routes.get('/allHours/:id', AttendanceController.allHours);
routes.delete('/deleteAttendance/:id', auth, AttendanceController.deleteAttendance);
//schedule
routes.post('/creatSchedule', auth ,ScheduleController.create);
routes.get('/listar/:id', ScheduleController.index);
routes.get('/hours', ScheduleController.freeHours);
routes.delete('/scheduleUserFromCompany/:id', auth, ScheduleController.deleteScheduleUser);
routes.put('/updateStatus/:id', auth ,ScheduleController.statusAttendance);
routes.get('/report/:id', auth,  ScheduleController.report);

module.exports = routes;