import React, {useEffect, useState} from 'react';
import {MenuCompany, Footer, ServiceTable} from '../../Person/person';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

import '../report/styleReport.css';

export default function ServicesCreate(){

    const token = localStorage.getItem('Token');
    const logon = useHistory();
    const id_company = localStorage.getItem('id_company');

    const [service_name, setService_name] = useState('');
    const [value, setValue] = useState('');
    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(false);

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


            setLoading(true)
			api.get(`servicesCompany/${id_company}`, {
				headers:{
					auther: token,
				}
			}).then(res=>{
                if(!res.data.error){
                    console.log(res)
                    setServiceList(res.data.services);
                    setLoading(false);
                }
			})
        }

        fetchIncidents();
    }, []);

    

    async function handlePost(){
        try {

            const data = {
                service_name,
                value,
                company_id_service: id_company
            }

            const response = await api.post('createServices', data, {
                headers:{
                    auther: token
                }
            });
            if(response.data.error){
                console.log(response.data.error)
            }else{
            console.log('Serviço registrado!!!');
            window.location.reload();
            //Aqui é bom direcionar para pagina com os horários marcados
            }
            
        } catch (error) {
            
        }
    }


    return (
        <div>
            <MenuCompany/>
            <form className='formDate'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 style={{marginTop:'10px'}}>Criação de serviços</h3>
                            <p style={{marginBottom:'10px'}}>Por favor, defina o nome do novo serviço e o seu valor</p>
                        </div>
                        <div className='col-md-6' >
                            <label style={{marginTop:'10px'}}>Nome do serviço</label>
                            <input type='text' className='inputDate' placeholder='Insira o nome' value={service_name} onChange={e=>setService_name(e.target.value)} />
                        </div>
                        <div className='input-group col-md-6'>
                            <label style={{marginTop:'10px'}}>valor do serviço</label>
                            <input type='number' className='inputDate' placeholder='R$ 0,00' value={value} onChange={e=>setValue(e.target.value)}/>
                        </div>
                        <div className='col-md-12'>
                            <button type='button' className='btn btn-primary' onClick={()=>handlePost()} style={{marginTop:'20px', marginBottom:'10px', padding:'10px'}}>Criar serviço</button>
                        </div>
                    </div>
                </div>
            </form>
            <ServiceTable loading={loading} serviceList={serviceList} />
            <h1>Vou criar um popup para o botão EDITAR</h1>
            <Footer />
        </div>
    )
}