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
            .where('company_id_schedule', params.id)
            .andWhere('status', 'true')
            .orderBy('attendance.attendace_date', 'asc');

        if(data.length == 0){
            return response.json({mensager: 'A empresa não possui agendamento em aberto :)'})
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
            .where('company_id_schedule', params.id)
            .orderBy('attendance.attendace_date', 'asc');

        if(data.length == 0){
            return response.json({mensager: 'A empresa não possui agendamentos :('})
        }

        return response.json(data);
    }, 

    async create(request, response, next){
        try {
            const {
                company_name,
                company_password,
                company_email,
                company_tel,
                company_cnpj
            } = request.body;

            const [company_id] = await database('companies').returning('company_id').insert({
                company_name,
                company_password,
                company_email,
                company_tel,
                company_cnpj,
                create_date_company: new Date()
            });

            return response.json({
                company_id,
                company_name,
                company_email,
                company_tel,
                company_cnpj
            })
        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    }
}