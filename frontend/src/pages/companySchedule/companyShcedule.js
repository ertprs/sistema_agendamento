import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function CompanySchedule(){

    const [incidents, setIncidents] = useState([]);
    const [mensagerText, setMensagerText] = useState('')

    
    const token = localStorage.getItem('Token');


    useEffect(()=>{
        const fetchIncidents = ()=>{
            
            const id = localStorage.getItem('id_company');
            console.log(id)

            api.get(`companies/list/${id}`).then(res=>{
                console.log(res)
                setIncidents(res.data)
                if(res.data.length == 0){
                    console.log('aqui')
                    setMensagerText('Sem agendamentos marcados')
                   
                }else{
                    setMensagerText('')
                    //localStorage.setItem('id_company', res.data.id)
                    //usar quando a rota for autenticada
                }
            })
        }
        
        fetchIncidents();
    },[])
    

    function formatarData(data){
        //O valor de data retornado do bd é 2020-06-05T03:00:00.000Z
        var valor =  data.substring(0, 10); //substring é responsável por pegar o caracter da posição 0 até a 10 que é 2020-06-05
        var split = valor.split('-');//utiliza um caractere para separa a string no caso é o "-" da data
        var data_formatada = split[2] + "/" + split[1] + "/" + split[0];/*aqui reformulamos no padrão brasileiro
        a posição 0 é 2020, a posição  1 é 06 e a 2 é 05, ai só colocamos na ordem e concatenamos com a barra(/)*/
        console.log('data '+data_formatada)
        return data_formatada;
    }
    

    return(
        <div>
        <h1>Menu</h1>
        <section className="section normalhead">
			<div className="container">
				<div className="row">	
					<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
						<h2>Agendamentos em Aberto do Dia</h2>
						<p className="lead">Aqui você tem controle de todos os seus agendamentos</p>
					</div>
				</div>
			</div>
        </section>
        <section className="section">
                <div className="container">
                    <div className="row clientv2">
                        <ul>
                        {incidents.map(incident=>(
                        <li key={incident.schedule_id}>
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="client-box">
                            <div style={{
                                float:'left', 
                                display:'flex',
                                padding:'10px', 
                                width:'100px', 
                                height:'297px',
                                backgroundColor:'#D3D3D3',
                                margin:'-30px',
                                textAlign:'center',
                                justifyContent:'center',
                                
                                }}>
                                <strong style={{marginTop:'97px', color:'#363636'}}>Horário<br/>{incident.opening_hours} h</strong>
                            </div>
                            <div style={{marginLeft:'100px'}} >
                                <strong>Nome do Cliente:</strong>
                                <p>{incident.user_name}</p>
                                <strong>Serviço:</strong>
                                <p>{incident.service_name}</p>
                                <strong>Valor:</strong>
                                <p>R$ {incident.value}</p>
                                <strong>Data do atendimento:</strong>
                                <p>{formatarData(incident.attendace_date)}</p>
                                <button className='btn btn-transparent' style={{padding:'5px', marginTop:'5px'}}>Atendimento realizado</button>
                                <button className='btn btn-transparent' style={{padding:'5px', marginTop:'5px', marginLeft:'5px', color:'red', border:'1.5px solid red'}}>Cancelar Atendimento</button>
                            </div>
                            </div>
                        </div>
                        </li>
                        ))}
                        </ul>
                        <h2>{mensagerText}</h2>
                    </div>
                </div>
            </section>
        </div>
    )
}