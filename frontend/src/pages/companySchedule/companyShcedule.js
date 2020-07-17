import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {SchedulesCompany, MenuCompany, Footer} from '../../Person/person';
import {useHistory} from 'react-router-dom';

export default function CompanySchedule(){

    const [incidents, setIncidents] = useState([]);
    const [mensagerText, setMensagerText] = useState('');
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);

    const logon = useHistory();
    const token = localStorage.getItem('Token');
    const company_id = localStorage.getItem('id_company');

    useEffect(()=>{
        const fetchIncidents = ()=>{
            
            setLoading(true);
            console.log(company_id)
            if(company_id != null){
                api.get(`companies/list/${company_id}`, {
                    headers:{
                        auther: token,
                    }
                }).then(res=>{
                    setIncidents(res.data)
                    if(res.data.error){
                        alert('Por favor, realize o login para acessar a página');
                        logon.push('/loginCompany');
                    }
                    if(res.data.length == 0){
                        setMensagerText('Sem agendamentos marcados')
                
                    }else{
                        setMensagerText('');
                        
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }

            api.get('companyId', {
                headers:{
                    auther: token,
                }
            }).then(res=>{
                if(!res.data.error){
                    localStorage.setItem('id_company', res.data.id)
                    setLoading(false);
                    setLogin(true);
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        
        fetchIncidents();
    },[company_id])
    
    
    return(
        <div>
        <MenuCompany login={login}/>
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
        <SchedulesCompany loading={loading} incidents={incidents} mensagerText={mensagerText} />
        <Footer />
        </div>
    )
}
