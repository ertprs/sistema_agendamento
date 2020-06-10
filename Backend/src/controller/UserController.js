const database = require('../database/index');

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

    async create(request, response, next){
        try {
            const {
                user_name,
                user_password,
                user_email,
                user_tel
            } = request.body;

            const [user_id] = await database('users').returning('user_id').insert({
                user_name,
                user_password,
                user_email,
                user_tel,
                create_data: new Date()
            });

            return response.json({
                user_id,
                user_name,
                user_email,
                user_tel
            });
        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    }
}