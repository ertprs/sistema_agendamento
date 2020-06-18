const database = require('../database/index');
const { index } = require('./CompaniesController');

module.exports = {
    async create(request, response, next){
        try {
            const {
                attendace_date,
                opening_hours,
                company_id_attendance
            } = request.body;

            const [attendace_id] = await database('attendance').returning('attendace_id').insert({
                attendace_date,
                opening_hours,
                company_id_attendance
            });

            return response.json({
                attendace_id,
                attendace_date,
                opening_hours,
                company_id_attendance
            })

        } catch (error) {
            console.log('Error: '+error);
            next(error);
        }
    },

    async index(request, response, next){
        try {
            const id = request.params.id;

            const hours = await database('attendance').select("*").where('company_id_attendance', id);

            return response.json(hours);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async indexDate(request, response, next){
        try {
            const date = request.params.date
            const id = request.query.id

            //dates é responsável por pegar todos os horarios daquela data da empresa selecionada
            const dates = await database('attendance')
                .select('*')
                .where('attendace_date', date)
                .andWhere('company_id_attendance', id);
             
            //schedule é responsável por pegar todos os agendamentos daquela empresa na data selecionada    
            const schedule =  await database('schedule')
                .select('*')
                .innerJoin('attendance', 'attendace_id_schedule', 'attendace_id')
                .innerJoin('companies', 'company_id_schedule', 'company_id')
                .where('status', 'true' )
                .andWhere('company_id_schedule', id)
                .andWhere('attendace_date', date)

            //quantidade pega o tamanho do array retornado de date, ou seja quantos horarios foram marcados pela empresa naquela data
            const quantidade = dates.length;
            console.log('Quantidade: '+ quantidade);

            //qntSchedule pega o tamanaho
            const qntSchedule =  schedule.length;
            console.log('qntAgendado: '+ qntSchedule)

            var horarioOcupado = []
            var vezes = 1;

            for(var i = 0; i < qntSchedule; i++){
                console.log('s: '+schedule[i].attendace_id_schedule);
                horarioOcupado.push(schedule[i].attendace_id_schedule);
            }
            console.log('array: '+horarioOcupado)
            console.log('')

            var valor = []
            if(qntSchedule == 1){
                for( var i = 0; i < quantidade; i++){
                    if(horarioOcupado[i] == dates[i].attendace_id){
                       
                        console.log('Deu certo:' + horarioOcupado[i] + ' vezes: '+vezes)
                        vezes++;
                    }else{
                        console.log('Deu Errado');
                        valor.push(dates[i]);
                    }
                    console.log('id do horario: '+dates[i].attendace_id);
                }
            }

            if(qntSchedule > 1){
                for( var i = 0; i < quantidade-1; i++){
                    if(horarioOcupado[i] == dates[i].attendace_id){
                       
                        console.log('Deu certo:' + horarioOcupado[i] + ' vezes: '+vezes)
                        vezes++;
                    }else{
                        console.log('Deu Errado');
                        valor.push(dates[i]);
                    }
                    console.log('id do horario: '+dates[i].attendace_id);
                }
            }
            

           //PRECISO VER O QUE TÁ CAUSANDO O BUG DE APARECER O HORÁRIO ATENDIDO NO DIA 08


            return response.json(valor);

        } catch (error) {
            console.log(error);

            next(error);
        }
    }
}