const database = require('../database/index');

module.exports = {
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