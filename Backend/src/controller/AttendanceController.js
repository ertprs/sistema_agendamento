const database = require('../database/index');

module.exports = {
    async create(request, response, next){
        try {
            const {
                attendace_date,
                opening_hours,
                company_id
            } = request.body;

            const [attendace_id] = await database('attendance').returning('attendace_id').insert({
                attendace_date,
                opening_hours,
                company_id
            });

            return response.json({
                attendace_id,
                attendace_date,
                opening_hours,
                company_id
            })

        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    }
}