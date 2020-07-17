import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import {MenuCompany, Footer} from '../../Person/person';


import './styleProfile.css';


export default function ProfileCompany(){

    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [city, setCity] = useState('');

    const token = localStorage.getItem('Token');
    const logon = useHistory();
    const company_id = localStorage.getItem('id_company');

    useEffect(()=>{
        api.get(`companySelect/${company_id}`).then(res=>{
            setName(res.data.company_name);
            setCnpj(res.data.company_cnpj);
            setEmail(res.data.company_email);
            setTelefone(res.data.company_tel);
            setCity(res.data.cidade);
        })

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
    },[])

    var history = useHistory();

    const [file, setFile] = useState('');

    var fn = new FormData();
    fn.append('file', file[0]);

    var dataCompany = {
        company_name: name,
        company_email: email,
        company_tel: telefone,
        cidade: city
    } 

    function handlePost(){
        //vou pegar o id da empresa para colocar aqui
        api.put(`uploadImage/${company_id}`, fn, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            console.log(res);
        })

        api.put(`companyUpdate/${company_id}`, dataCompany).then(res=>{
            console.log(res)
        })
         history.push('/companySchedule');
    }

    
    return(
        <div>
            <MenuCompany/>
                <form className='formProfile' encType='multipart/form-data'>
                    <div className='container'>
                        <div className='row'>
                            <div>
                                <h2>Minha Conta</h2>
                            </div>
                            <div className='col-md-12'>
                                <label>Nome</label>
                                <input type='text' className='inputProfile' value={name} onChange={e=>setName(e.target.value)}/>
                            </div>
                            <div className='col-md-12'>
                                <label>CNPJ</label>
                                <input type='text' className='inputProfile' readOnly value={cnpj} onChange={e=>setCnpj(e.target.value)} />
                            </div>
                            <div className='col-md-12'>
                                <label>E-mail</label>
                                <input type='email' className='inputProfile' value={email} onChange={e=>setEmail(e.target.value)} />
                            </div>
                            <div className='col-md-12'>
                                <label>Telefone</label>
                                <input type='text' className='inputProfile' value={telefone} onChange={e=>setTelefone(e.target.value)} />
                            </div>
                            <div className='col-md-12'>
                                <label>Cidade</label>
                                <select value={city} onChange={e=>setCity(e.target.value)} className='inputProfile'>
                                    <option>{city}</option>
                                </select>
                            </div>
                            <div className='col-md-12'>
                                <label>Logo</label>
                                <input type='file' className='inputProfile' name='image' id='file' onChange={e=>setFile(e.target.files)}/>
                            </div>
                            <div className='col-md-4'/>
                            <div className='col-md-4'>
                            <button type='submit' id='save' className='btn btn-transparent' style={{padding: '10px', marginBottom:'10px'}} onClick={()=>handlePost()}>Salvar</button>
                            </div>
                            <div className='col-md-4'/>
                        </div>
                    </div>
                </form>
            <Footer/>
        </div>
    )
}