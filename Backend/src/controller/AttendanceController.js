const database = require('../database/index');


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

    async allHours(request, response, next){
        try {
            const id = request.params.id;
            const date = request.query.date;
            const morning = [];
            const afternoon = [];
            const night = [];

            const hours = await database('attendance')
                .select("*")
                .where('company_id_attendance', id)
                .andWhere('attendace_date', date)
                .orderBy('opening_hours', 'asc');
            
            for(var i = 0; i < hours.length; i++){
                if(parseInt(hours[i].opening_hours) < 12){
                    morning.push(hours[i])
                }else if(parseInt(hours[i].opening_hours) >= 12 && parseInt(hours[i].opening_hours) < 18){
                    afternoon.push(hours[i]);
                }else{
                    night.push(hours[i]);
                }
            }

            return response.json({morning: morning, afternoon:afternoon, night:night});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async deleteAttendance(request, response, next){
        try {
            const {id} = request.params;
            const incident = await database('attendance')
                .where('attendace_id', id)
                .select('*')
                .first();
            console.log(incident)
            if(incident === undefined){
                return response.status(404).json({error: 'id no found'});
            }

            if(incident.attendace_id != id || incident.attendace_id === undefined){
                return response.status(404).json({error: 'id no found'})
            }

            const incidentSchedule = await database('schedule')
                .where('attendace_id_schedule', id)
                .select('*')
                .first();

            if(incidentSchedule != undefined){
                await database('schedule').where('attendace_id_schedule', id).delete();
            }

            await database('attendance').where('attendace_id', id).delete();

            return response.status(200).json({mensager: 'Data Succefully deleted'});
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
                .andWhere('company_id_attendance', id)
                .orderBy('opening_hours', 'asc');
             
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

            //valor vai armazenar meus horários
            var valor = [];

            var i = 0;
            var a = 0 
            var now = new Date();
            var dateSelect = new Date(date);

            var datanow = now.getFullYear()+'-'+ (now.getMonth()+1) + '-' + now.getDate()
            if((now.getMonth()+1) < 10){
                var datanow = now.getFullYear()+'-0'+ (now.getMonth()+1) + '-' + now.getDate()
            }
            if(now.getDate() < 10){
                var datanow = now.getFullYear()+'-'+ (now.getMonth()+1) + '-0' + now.getDate()
            }

            if(now.getDate() < 10 && (now.getMonth()+1) < 10){
                var datanow = now.getFullYear()+'-0'+ (now.getMonth()+1) + '-0' + now.getDate()
            }
            //convertendo datanow em formato de data
            datanow = new Date(datanow);

            //enquanto i for menor que o número de itens(horarios) registrados no atendimento daquele dia 
            while(i < quantidade){
            //aqui vai ser percorrido procurando cada id de atendimento em dates que seja igual aos id livre(a-valoresTodos é pra ficar igual a 0)
                if(dates[i].attendace_id == todos[a]){
                    var hourNow;

                    if(now.getHours() < 10 && now.getMinutes() < 10){
                        hourNow = '0'+now.getHours()+':0'+now.getMinutes();
                    }else if(now.getMinutes() < 10){
                        hourNow = now.getHours()+':0'+now.getMinutes();
                    }else if(now.getHours() < 10 && now.getMinutes() < 10){
                        hourNow = '0'+now.getHours()+':'+now.getMinutes();
                    }                    
                    else{
                        hourNow = now.getHours()+':'+now.getMinutes()
                    }

                    var split = dates[i].opening_hours.split(':');
                    var horarioformatada = split[0]+split[1];

                    split = hourNow.split(':');
                    var hourNowFormatado = split[0]+split[1];
              
                    if(dateSelect > datanow){
                        valor.push(dates[i])
                    }else if(parseInt(horarioformatada) > parseInt(hourNowFormatado)){
                        valor.push(dates[i])
                    }
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