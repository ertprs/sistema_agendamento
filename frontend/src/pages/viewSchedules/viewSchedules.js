import React, { useEffect, useState } from 'react';
import {MenuCompany, Footer, Allhours} from '../../Person/person';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function ViewSchedules(){
    const token = localStorage.getItem('Token');
    const id_company = localStorage.getItem('id_company');
    const logon = useHistory();
    const [morning, setMorning] = useState([]);
    const [afternoon, setAfternoon] = useState([]);
    const [night, setNight] = useState([]);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    

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

            });

        }

        fetchIncidents();
    }, [])

    function handleHours(){
        setLoading(true);
        api.get(`allhours/${id_company}?date=${date}`).then(res=>{
            if(!res.data.error){
                setMorning(res.data.morning);
                setAfternoon(res.data.afternoon);
                setNight(res.data.night);
                setLoading(false);
                setStatus(true);
            }
        })
    }



    return(
        <div>
            <MenuCompany/>
            <form className='formDate'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 style={{marginTop:'10px'}}>Vizualizar Horários de Trabalho</h3>
                            <p style={{marginBottom:'10px'}}>Por favor, defina a data para vizualizar os horarios que o estabelecimento funcionará</p>
                        </div>
                        <div className='col-md-12' >
                            <label style={{color:'black'}}>Data</label>
                            <input type='date' className='inputDate' style={{marginBottom:'20px'}} value={date} onChange={e=>setDate(e.target.value)}  />
                        </div>
                        <div className='col-sm-12 col-md-12'>
                            <button type='button' onClick={()=>handleHours()} className='btn btn-primary' style={{marginBottom:'20px', padding:'10px'}}>Adicionar</button>
                        </div>

                        <Allhours loading={loading} morning={morning} afternoon={afternoon} night={night}  status={status} date={date}/>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>
    )
}