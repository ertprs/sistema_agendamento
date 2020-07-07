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
    },

    async update(request, response, next){
        try {
            const {id} = request.params;
            const idService = request.query.idService;

            const incident = await database('services')
                .where('company_id_service', id)
                .andWhere('service_id', idService)
                .first();


            if(incident === undefined){
                return response.status(404).json({error: 'id no found'});
            }

            if(incident.service_id != idService || incident.service_id === undefined){
                return response.status(404).json({error: 'id no found'});
            } 

            await database('services')
                .where('company_id_service', id)
                .andWhere('service_id', idService)
                .update({
                    service_name: request.body.service_name,
                    value: request.body.value
                })
            
            return response.status(200).json({mensager: 'Data update successfull'});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async delete(request, response, next){
        try {
            const {id} = request.params;
            const idService = request.query.idService;

            const incident = await database('services')
                .where('company_id_service', id)
                .andWhere('service_id', idService)
                .select('*')
                .first();

      
            if(incident === undefined){
                return response.status(404).json({error: 'id no found'});
            }

            if(incident.service_id != idService || incident.service_id === undefined){
                return response.status(404).json({error: 'id no found'});
            }

            await database('services')
                .where('company_id_service', id)
                .andWhere('service_id', idService)
                .delete();

            return response.status(200).json({mensager: 'Data successfully deleted'});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}