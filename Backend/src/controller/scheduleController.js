const database = require('../database/index');

module.exports = {
    async index(request, response, next){
        try {

            const params = request.params;
            const data = await database('schedule')
                .select(
                    'schedule.status',
                    'companies.company_name',
                    'services.service_name',
                    'services.value',
                    'attendance.attendace_date',
                    'attendance.opening_hours',
                    'users.user_name'
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