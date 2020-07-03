import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {MenuCompany, Footer, ReportTable} from '../../Person/person';

import './styleReport.css';
import api from '../../services/api';

export default function Report(){

    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);

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

    const [incidents, setIncidents] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState('');
    const [totalSchedule, setTotalSchedule] = useState('');
    const [percentage, setPercentage] = useState('');

    function generateReport(){
        setLoading(true);
        api.get(`report/${company_id}?date1='${initialDate}'&date2='${finalDate}'`,{
            headers:{
                auther: token
            }
        }).then(res=>{
            setIncidents(res.data.schedule);
            setTotalRevenue(res.data.totalRevenue);
            setTotalSchedule(res.data.totalSchedule);
            setPercentage(res.data.percentage);
            setLoading(false);
            setStatus(false);
        })
    }

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
                        </div>
                    </div>
                </div>
            </form>
            <ReportTable 
                loading={loading} 
                incidents={incidents} 
                totalSchedule={totalSchedule} 
                totalRevenue={totalRevenue}
                percentage={percentage}
                status={status}
            />
            <Footer />
        </div>
    )
}