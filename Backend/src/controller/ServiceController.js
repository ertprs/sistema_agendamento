const database = require('../database/index');

module.exports = {
    async create(request, response, next){
        try {
            const {
                service_name,
                value,
                company_id_service
            } = request.body;

            const [service_id] = await database('services').returning('service_id').insert({
                service_name,
                value,
                company_id_service
            });

            return response.json({
                service_id,
                service_name,
                value,
                company_id_service
            })
        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    }
}