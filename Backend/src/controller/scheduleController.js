const database = require('../database/index');

module.exports = {
    async index(request, response, next){
        try {
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
                .where('user_id', params.id)
                .first();
               
            return response.json(data);
        } catch (error) {
            console.log('Error index: '+error);
            next(error);
        }
    },

    async create(request, response, next){
        try {
            const {
                status,
                company_id_schedule,
                user_id_schedule,
                service_id_schedule,
                attendace_id_schedule
            } = request.body

            const services = await database('services').select('*').where('service_id', service_id_schedule).first();
            
            //verifico se o id do serviço pertence a empresa
            if(services.company_id_service != company_id_schedule){
                return response.status(401).json({error: 'Esse serviço não pertence a empresa'});
            }
            
            const attendace = await database('attendance').select('*').where('attendace_id', attendace_id_schedule).first();

            //verifico se o id do horário de atendimento pertence a empresa
            if(attendace.company_id_attendance != company_id_schedule){
                return response.status(401).json({error: 'Esse horário de funcionamento não pertence a essa empresa'});
            }

            const hours = await database('schedule').select('*').where('attendace_id_schedule', attendace_id_schedule).first();

            //Verifico se o horário já foi agendado ou não
            if(hours != undefined){
                if(hours.attendace_id_schedule == attendace_id_schedule){
                    return response.status(401).json({error: 'Este horário já está agendado, escolha outro por favor'});
                }
            }

            const [schedule_id] = await database('schedule').returning('schedule_id').insert({
                status,
                company_id_schedule,
                user_id_schedule,
                service_id_schedule,
                attendace_id_schedule
            });
            
            return response.json({
                schedule_id,
                status,
                company_id_schedule,
                user_id_schedule,
                service_id_schedule,
                attendace_id_schedule
            });
        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    }
}