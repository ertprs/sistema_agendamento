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
                .select('attendace_id', 'attendace_date', 'opening_hours', 'status', 'attendace_id_schedule', 'company_id_schedule')
                .innerJoin('attendance', 'attendace_id_schedule', 'attendace_id')
                .innerJoin('companies', 'company_id_schedule', 'company_id')
                .where('status', 'true' )
                .andWhere('company_id_schedule', id)
                .andWhere('attendace_date', date)
                .orderBy('attendace_id_schedule', 'asc');

          
            //quantidade pega o tamanho do array retornado de date, ou seja quantos horarios foram marcados pela empresa naquela data
            const quantidade = dates.length;


            //qntSchedule pega o tamanaho
            const qntSchedule =  schedule.length;
            

            const todos = []
            for(var i=0;i<quantidade;i++){
                todos.push(dates[i].attendace_id);
            }
            //console.log('Todos: '+todos)
            //ESSE FOR É RESPONSÁVEL POR SEPARAR O ID DOS ATENDIMENTO QUE JÁ ESTÁ AGENDADOS DOS QUE NÃO LIVRES
            for(var i = 0; i < qntSchedule; i++){
            //AQUI ESPECIFICO QUAL É O ID QUE ESTOU PROCURANDO(como a cada loop o valor do id do atendimento ja agendado vai mudar para o próximo)  
                var indice = todos.indexOf(schedule[i].attendace_id);
            //ENQUANTO ELEMENTOS FOREM ENCONTRADOS NO ARRAY FAÇA...(se não for encontrado é retornado -1 e sai do loop)    
                while(indice >= 0){
                    //aqui eu retiro todos os id de atendimento já agendados
                    todos.splice(indice,1);
                    indice = todos.indexOf(schedule[i].attendace_id);
                }
            }
            //verifico o tamanho do meu array que contém os id de atendimento NÃO agendados
            var valoresTodos = todos.length;
            //valor vai armazenar meus horários
            var valor = [];

            var i = 0;
            var a = 0 //se der errado coloco igual a valoresTodos
            //enquanto i for menor que o número de itens(horarios) registrados no atendimento daquele dia 
            while(i < quantidade){
            //aqui vai ser percorrido procurando cada id de atendimento em dates que seja igual aos id livre(a-valoresTodos é pra ficar igual a 0)
                if(dates[i].attendace_id == todos[a]){
                    valor.push(dates[i])
                    a++;
                }
                //console.log('vezes: '+i)
                i++;
            }

            return response.json(valor);

        } catch (error) {
            console.log(error);

            next(error);
        }
    }
}