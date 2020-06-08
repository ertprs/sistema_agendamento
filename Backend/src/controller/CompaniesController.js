const database = require('../database/index');

module.exports = {
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