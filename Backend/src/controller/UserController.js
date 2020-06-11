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
                'companies.company_name'
            )
            .innerJoin('companies', 'company_id_schedule', 'company_id')
            .innerJoin('services', 'service_id_schedule', 'service_id')
            .innerJoin('attendance', 'attendace_id_schedule', 'attendace_id')
            .innerJoin('users', 'user_id_schedule', 'user_id')
            .where('user_id_schedule', params.id)
            .andWhere('status', 'true')
            .orderBy('attendance.attendace_date', 'asc');

        //Verifica se o array está vazio se estiver é porque não tem agendamentos 
        if(data.length == 0){
            return response.json({mensager: 'Você não possui agendamentos em aberto'})
        }
        
        return response.json(data);
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
            .where('user_id_schedule', params.id)
            .orderBy('attendance.attendace_date', 'asc');
        

        return response.json(data);
    },

    create(request, response, next){
        
            const user =request.body;

            hashPassword(user.password)
                .then((hashedPassword)=>{
                    delete user.password
                    user.user_password = hashedPassword
                }).then(()=> createUser(user))
                .then(user => {
                    delete user.user_password
                    response.status(201).json({user: user[0], token: createtokenUser(user.user_id)});
                }).catch((err)=>{
                    next(err);
                    response.status(404).json({err: 'Email já cadastrado'})
                })      
    }, 

    login(request, response, next){
        const userReq = request.body;
        let user;

        findUser(userReq)
            .then(foundUser => {
                user = foundUser
                return checkPassword(userReq.password, foundUser)
            })
            .then(() => {
                delete user.user_password
                response.status(200).json({user, token: createtokenUser(user.user_id)})
            })
            .catch((err) => {
                console.error(err)
                response.json({error: 'Email ou senha incorreto'})
            });
            
    }
}

/*const createUser = async (user) =>{
    
    const createdata = database.raw(
        "INSERT INTO users (user_name, user_password, user_email, user_tel, create_data) VALUES (?, ?, ?, ?, ?) RETURNING user_name, user_email, user_tel, create_data",
        [user.user_name, user.user_password, user.user_email, user.user_tel, new Date()],
        
    ).then((data) => data.rows[0])

return createdata; 
}*/

async function createUser (user){
    try {
        const createdata = await database('users').returning(['user_id','user_name', 'user_email', 'user_tel' ]).insert({
            user_name: user.user_name,
            user_password: user.user_password,
            user_email: user.user_email,
            user_tel: user.user_tel,
            create_data: new Date()
        })

        return createdata;
    } catch (error) {
        console.error('Email já cadastrado')
    }
}

const hashPassword = (password) => {
    return new Promise((resolve, reject)=> 
        bcrypt.hash(password, 10, (err, hash)=>{
            err ? reject(err) : resolve(hash);
        })       
    )
}

const createtokenUser = (userID) => {
    return jwt.sign({id:userID}, 'agendamento', {expiresIn: '20s'});
}

const findUser = (userReq) => {
    const selectUser = database.raw("SELECT * FROM users Where user_email = ?", [userReq.user_email])
    .then((data)=> data.rows[0]);

    return selectUser;
}

const checkPassword = (reqPassword, foundUser) =>{
    return new Promise((resolve, reject) => 
        bcrypt.compare(reqPassword, foundUser.user_password, (err, response)=>{
            if(err){
                reject(err)
            }else if(response){
                resolve(response)
            }else {
                reject(new Error('Passwords do not match.'))
            }
        })
    )
}