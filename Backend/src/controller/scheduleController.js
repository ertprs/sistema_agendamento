const database = require('../database/index');
const { post } = require('../routes');

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

    async freeHours(request, response, next){
        try {
            const id = request.query.id;
            const date = request.query.date;

            const info = await database('schedule')
                .select('*')
                .innerJoin('attendance', 'attendace_id_schedule', 'attendace_id')
                .where('attendace_id_schedule', id)
                .andWhere('status', 'true');
            
            return response.json(info);
        } catch (error) {
            console.log(error);
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

            const hours = await database('schedule').select('*').where('attendace_id_schedule', attendace_id_schedule).andWhere('status', 'true').first();

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
                attendace_id_schedule,
            });
        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    },

    async deleteScheduleUser(request, response, next){
        try {
            const {id} = request.params;
            console.log(id)
            const incidents = await database('schedule')
                .where('schedule_id', id)
                .select('*')
                .first();
            
            console.log(incidents)
            if(incidents === undefined){
                return response.status(404).json({error: 'id no found'})
            }
            
            if(incidents.schedule_id != id || incidents.schedule_id === undefined){
                return response.status(404).json({error: 'id no found'})
            }

            await database('schedule').where('schedule_id', id).delete();

            return response.status(200).json({mensager: 'Data successfully deleted'});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async statusAttendance(request, response, next){
        try {
            const {id} = request.params;

            const incident = await database('schedule')
                .where('schedule_id', id)
                .select('*')
                .first();
            
         
            if(incident === undefined){
                return response.status(404).json({error: 'id no found'});
            }    

            if(incident.schedule_id != id || incident.schedule_id === undefined){
                return response.status(404).json({error:'id no found'})
            }

         
            await database('schedule').where('schedule_id', id).update({
                status: false
            })

            return response.status(200).json({mensager:'Data update successfully'});

        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async report(request, response, next){
        try {
            const {id} = request.params;
            const dateReport = request.query.date1;
            const dateReport2 = request.query.date2;

            var incident = [];
            //AQUI PEGA TODOS OS AGENDAMENTOS DA EMPRESA
            incident = await database('schedule')
            .select('*')
            .where('company_id_schedule', id);

            var amount = incident.length;
            var date;
            var posts = [];
            var scheduleID = [];
            var totalReport = 0;
            var cont = 0;

            for(let i = 0;i<amount;i++){
                //AQUI PEGA AS DATAS E OS ID DOS SERVIÇOS AGENDADOS
                date = await database('attendance')
                    .select('*')
                    .where('attendace_id', incident[i].attendace_id_schedule)
                    .andWhereBetween('attendace_date', [dateReport, dateReport2]);
                if(date[0] != undefined){
                    scheduleID.push(incident[i].service_id_schedule)
                    posts.push(date[0]);
                    cont = cont + 1;
                }
            }

            amount = cont;
            //ScheduleID pega os id dos serviços que estão entre a data selecionada
            //console.log(scheduleID)
            //console.log(posts);

            var services = [];

            var amountService = scheduleID.length;
            for(let i = 0; i < amountService; i++){
                //AQUI PEGA O VALOR DO SERVIÇOS AGENDADOS NO MÊS
                date = await database('services')
                    .select('*')
                    .where('service_id', scheduleID[i])
                
                if(date[0] != undefined){
                    //console.log(date[0]);
                    totalReport = totalReport + parseInt(date[0].value);
                    services.push(date[0])
                }
            }
            //VALOR DE TODOS OS SERVIÇOS ENTRE AS DATA AGENDADAS
            //console.log('R$'+totalReport)

            var percentage = (totalReport * 8)/100;
     
        if(incident === undefined){
            return response.status(404).json({error: 'id no found'});
        }  

        return response.status(200).json({
            schedule: incident, 
            attendance: posts, 
            services: services, 
            total: totalReport, 
            totalSchedule: amount,
            percentage: percentage
        });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}