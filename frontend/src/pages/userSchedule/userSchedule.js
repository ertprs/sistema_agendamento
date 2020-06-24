import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import {Menu, Footer, UserSchedules} from '../../Person/person';
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
                    setLogin(true)
                }
            })

        }

        fetchSchedule();
    },[])


  
    

    return(
        <div>
            <Menu schedules={schedules} account={account} login={login}/>
            <section className="section normalhead">
			<div className="container">
				<div className="row">	
					<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
						<h2>Seus agendamentos</h2>
						<p className="lead">Aqui você tem controle de todos os seus agendamentos</p>
					</div>
				</div>
			</div>
		    </section>
            <UserSchedules incidents={incidents} loading={loading} />
            <h1>Vou colocar um botão de cancelar em cada agendamento, nele vai excluir o agendamento</h1>
            <Footer />
        </div>
    )
}