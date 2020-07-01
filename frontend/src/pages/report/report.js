import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {MenuCompany, Footer} from '../../Person/person';

import './styleReport.css';
import api from '../../services/api';

export default function Report(){

    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const token = localStorage.getItem('Token');
    const logon = useHistory();
    const company_id = localStorage.getItem('id_company');

    useEffect(()=>{
        const fetchIncidents=()=>{
            api.get('companyId', {
                headers: {
                    auther: token
                }
            }).then(res=>{
                if(res.data.error){
                    alert('Por favor, realize o login para acessar a página');
                    logon.push('/loginCompany');
                }else{
                    localStorage.setItem('id_company', res.data.id)
                }

            })
        }

        fetchIncidents();
    }, []);

    const [schedule, setSchedule] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [services, setServices] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState('');
    const [totalSchedule, setTotalSchedule] = useState('');
    const [percentage, setPercentage] = useState('');

    function generateReport(){
     
        api.get(`report/${company_id}?date1='${initialDate}'&date2='${finalDate}'`,{
            headers:{
                auther: token
            }
        }).then(res=>{
            setSchedule(res.data.schedule);
            setAttendance(res.data.attendance);
            setServices(res.data.services);
            setTotalRevenue(res.data.total);
            setTotalSchedule(res.data.totalSchedule);
            setPercentage(res.data.percentage);
        })
    }

    console.log(schedule)
    console.log('espaço')
    console.log(schedule.map(post=> post))

    return(
        <div>
            <MenuCompany />
            <form className='formDate'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 style={{marginTop:'10px'}}>Relatório de agendamento</h3>
                            <p style={{marginBottom:'10px'}}>Por favor, defina o período que você deseja visualizar os seus atentimentos</p>
                        </div>
                        <div className='col-md-6' >
                            <label style={{marginTop:'10px'}}>Data inicial</label>
                            <input type='date' className='inputDate' value={initialDate} onChange={e=>setInitialDate(e.target.value)} />
                        </div>
                        <div className='col-md-6'>
                            <label style={{marginTop:'10px'}}>Data Final</label>
                            <input type='date' className='inputDate' value={finalDate} onChange={e=>setFinalDate(e.target.value)} />
                        </div>
                        <div className='col-md-12'>
                            <button type='button' className='btn btn-primary' onClick={()=>generateReport()} style={{marginTop:'20px', marginBottom:'10px', padding:'10px'}}>Exibir Relatório</button>
                            {/* Aqui vai exibir o botão quando os resultado forem carregados
                            
                            <button className='btn btn-primary' style={{marginTop:'20px', marginBottom:'10px', padding:'10px'}}>Boleto da Taxa</button>
                            */}
                        </div>
                    </div>
                </div>
            </form>
            <div className='container tableClass'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Total de agendamentos: {totalSchedule}</h3>
                    </div>
                    <div className='col-md-4'>
                        <h3>Receita total: R$ {totalRevenue}</h3>
                    </div>
                    <div className='col-md-4'>
                        <h3>Taxa de serviço: R$ {percentage}</h3>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <h4>Todos os agendamentos do período</h4>
                    </div>
                    <div className='col-md-12'>
                    <table border='1' style={{backgroundColor:'white', marginTop:'10px' , width:'100%', marginBottom:'20px'}}>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>valor do serviço</th>
                                <th>Nome do cliente</th>
                                <th>Data do agendamento</th>
                            </tr>
                        </thead>
                        <tbody>
                                {services.map(post=>(
                                <tr>
                                    <td>{post.service_name}</td>
                                    <td>R$ 10,00</td>
                                    <td>Rendrikson</td>
                                    <td>10/06/2020</td>
                                </tr>
                                ))}
                            <tr>
                                <td>corte de cabelo</td>
                                <td>R$ 10,00</td>
                                <td>Rendrikson</td>
                                <td>10/06/2020</td>
                            </tr>
                            <tr>
                                <td>corte de cabelo</td>
                                <td>R$ 10,00</td>
                                <td>Rendrikson</td>
                                <td>11/06/2020</td>
                            </tr>
                        </tbody>
                        
                    </table>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}