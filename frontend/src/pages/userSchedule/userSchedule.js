import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import {Menu, Footer, UserSchedules, HistoricServiceTable} from '../../Person/person';
import api from '../../services/api';


export default function UserSchedule(){

    const [incidents, setIncidents] = useState([])
    const [loading, setLoading] = useState(false);

    const logon = useHistory();
    const id_user = localStorage.getItem('id_user')
    const token = localStorage.getItem('Token');

    const [schedules, setSchedules] = useState('');
    const [account, setAccount] = useState('');
    const [login, setLogin] =useState(false)

    const [historicIncident, setHistoricIncident] = useState([]);

    useEffect(()=>{
        setLoading(true)
        const fetchSchedule = ()=>{
            api.get(`user/listMissedAppointments/${id_user}`, {
                headers:{
                    auther: token,
                }
            }).then(res=>{
                if(res.data.error){
                    alert('Por favor, realize o login para acessar a página');
                    logon.push('/login');
                }else{
                    setIncidents(res.data.data);
                    setLoading(false);
                }
            })

            api.get(`user/servicesHistoric/${id_user}`, {
                headers:{
                    auther: token,
                }
            }).then(res=>{
                setHistoricIncident(res.data)
                
            })

            api.get('userId',{
                headers:{
                    auther: token
                }
            }).then(res=>{
                //console.log(res);
                if(!res.data.error){
                    localStorage.setItem('id_user', res.data.id);
                    setSchedules('Seus Agendamentos');
                    setAccount('Minha Conta');  
                    setLogin(true);
                }
            })

        }

        fetchSchedule();
    },[id_user]) 
    /*coloco para página atualizar sempre que o id do usuário sofrer alteração,
     assim se alguém mudar no local storage ele vai atualizar para o id do login de novo */

    return(
        <div style={{backgroundColor:'white'}}>
            <Menu schedules={schedules} account={account} login={login}/>
            <section className="section normalhead">
			<div className="container">
				<div className="row">	
					<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
						<h2>Seus agendamentos</h2>
						<p className="lead">Visualize seus agendamentos em aberto</p>
					</div>
				</div>
			</div>
		    </section>
            <UserSchedules incidents={incidents} loading={loading} />
            <section className='section normalhead'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1 col-sm-12 text-center'>
                            <h2>Histórico de agedamento</h2>
                            <p className='lead'>Visualize o seu histórico de agendamento</p>
                        </div>
                    </div>
                </div>
            </section>
            <HistoricServiceTable historicIncident={historicIncident} loading={loading} />
            <Footer />
        </div>
    )
}