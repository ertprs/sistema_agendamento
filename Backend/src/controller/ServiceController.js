const database = require('../database/index');

module.exports = {
    async create(request, response, next){
        try {
            const {
                service_name,
                value,
                company_id
            } = request.body;

            const [service_id] = await database('services').returning('service_id').insert({
                service_name,
                value,
                company_id
            });

            return response.json({
                service_id,
                service_name,
                value,
                company_id
            })
        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    }
}