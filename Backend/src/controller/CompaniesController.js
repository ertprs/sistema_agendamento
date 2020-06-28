const database = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(request, response, next){
        const params = request.params;
        const data = await database('schedule')
            .select(
                'users.user_name',
                'services.service_name',
                'services.value',
                'schedule.status',
                'attendance.attendace_date',
                'attendance.opening_hours',
                'companies.company_name',
                'schedule.schedule_id'
            )
            .innerJoin('companies', 'company_id_schedule', 'company_id')
            .innerJoin('services', 'service_id_schedule', 'service_id')
            .innerJoin('attendance', 'attendace_id_schedule', 'attendace_id')
            .innerJoin('users', 'user_id_schedule', 'user_id')
            .where('company_id_schedule', params.id)
            .andWhere('status', 'true')
            .orderBy('attendance.attendace_date', 'asc');

        const id_company = response.locals.auth_data;
        console.log('teste')
        console.log(id_company);
        return response.json(data);
    },

    async CompanyId(request, response, next){
        try {
            const company_id = response.locals.auth_data;
            response.json(company_id)
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async indexAll(request, response, next){
        const params = request.params;
        const data = await database('schedule')
            .select(
                'users.user_name',
                'services.service_name',
                'services.value',
                'schedule.status',
                'attendance.attendace_date',
                'attendance.opening_hours',
                'companies.company_name'
            )
            .innerJoin('companies', 'company_id_schedule', 'company_id')
            .innerJoin('services', 'service_id_schedule', 'service_id')
            .innerJoin('attendance', 'attendace_id_schedule', 'attendace_id')
            .innerJoin('users', 'user_id_schedule', 'user_id')
            .where('company_id_schedule', params.id)
            .orderBy('attendance.attendace_date', 'asc');

        if(data.length == 0){
            return response.json({mensager: 'A empresa não possui agendamentos :('})
        }

        return response.json(data);
    }, 

    async ServicesList(request, response, next){
        try {
            const id = request.params.id;

            const services = await database('services').select('*').where('company_id_service', id);
            //pegando o id do usuário logado
            console.log('listagem de serviços/ ID-USER: '+response.locals.auth_data.id);
            const id_user = response.locals.auth_data;
            return response.json({services:services, user: id_user});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async ListCompanies(request, response, next){
        try {
            const companies = await database('companies').select('*');
            return response.json(companies);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    create(request, response, next){

            const company = request.body;

            hashPassword(company.password)
            .then((hashedPassword)=>{
                delete company.password
                company.company_password =hashedPassword
            })
            .then(()=> createCompany(company))
            .then(company =>{
                delete company.company_password
                response.status(201).json({company: company[0], token: createTokenCompany(company.company_id)})
            }).catch((err)=>{
                next(err);
                response.status(404).json({err: 'Email ou cnpj já cadastrado'})
            })

            
    },

    login(request, response, next){
        const companyReq = request.body;
        let company;

        findCompany(companyReq)
            .then(foundCompany =>{
                company = foundCompany
                return checkPassword(companyReq.password, foundCompany)
            })
            .then(()=>{
                delete company.company_password
                response.status(200).json({company, token: createTokenCompany(company.company_id)});
            })
            .catch((err)=>{
                console.error('Error: '+err);
                response.json({error:'Email ou senha incorreto'})
            })
    }

}

const hashPassword = (password) =>{
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10, (err, hash)=>{
            err ? reject(err) : resolve(hash)
        })
    })
}

const createTokenCompany = (companyId) => {
    return jwt.sign({id: companyId}, 'agendamento', {expiresIn: '300s'});
}

const findCompany = (companyReq) =>{
    const selectCompany = database.raw("SELECT * FROM companies WHERE company_email = ?", [companyReq.company_email])
    .then((data)=>data.rows[0]);

    return selectCompany;
}

const checkPassword = (reqPassword, foundCompany) =>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(reqPassword, foundCompany.company_password, (err, response)=>{
            if(err){
                reject(err)
            }else if(response){
                resolve(response)
            }else{
                reject(new Error('Passwords do not match.'));
            }
        })
    })
}

/*const createCompany = (company) =>{
    const createdata = database.raw(
        "INSERT INTO companies (company_name, company_password, company_email, company_tel, company_cnpj, create_date_company) VALUES (?, ?, ?, ?, ?, ?) RETURNING company_name, company_email, company_tel, company_cnpj",
        [company.company_name, company.company_password, company.company_email, company.company_tel, company.company_cnpj, new Date()]
    ).then((data)=> data.rows[0])

    return createdata;
}*/

async function createCompany (company){
    try {
        const createdata = await database('companies').returning(['company_email', 'company_name', 'company_tel', 'company_cnpj', 'company_id']).insert({
            company_name: company.company_name,
            company_password: company.company_password,
            company_email: company.company_email,
            company_tel: company.company_tel,
            company_cnpj: company.company_cnpj,
            create_date_company: new Date()
        })

        return createdata
    } catch (error) {
        console.error('Email ou cnpj já cadastrado')
    }
}