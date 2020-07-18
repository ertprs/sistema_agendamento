import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import {Menu, Footer} from '../../Person/person';

export default function ProfileUser(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const [schedules, setSchedules] = useState('');
    const [account, setAccount] = useState('');
    const [login, setLogin] =useState(false)

    const token = localStorage.getItem('Token');
    const logon = useHistory();
    const id_user = localStorage.getItem('id_user');

    

    useEffect(()=>{
        
        const fetchIncidents=()=>{

           api.get(`profile/${id_user}`, {
                headers:{
                    auther: token
                }
            }).then(res=>{
                console.log(res)
                setName(res.data.user_name);
                setEmail(res.data.user_email);
                setTelefone(res.data.user_tel);
            })

            api.get('userId',{
                headers:{
                    auther: token
                }
            }).then(res=>{
                //console.log(res);
                if(res.data.error){
                    alert('Por favor, realize o login para acessar a página');
                    logon.push('/login');
                }else{
                    localStorage.setItem('id_user', res.data.id);
                    setSchedules('Seus Agendamentos');
                    setAccount('Minha Conta');  
                    setLogin(true);
                }
            })
        }

        fetchIncidents();
    },[])

    var history = useHistory();

    var dataUser = {
        user_name: name,
        user_email: email,
        user_tel: telefone,
    } 

    function handlePost(){
        api.put(`updateProfile/${id_user}`, dataUser, {
            headers:{
                auther: token
            }
        }).then(res=>{
            console.log(res)
        })
         history.push('/profileUser');
    }

    return(
        <div>
            <Menu schedules={schedules} account={account} login={login}/>
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
                                <label>E-mail</label>
                                <input type='email' className='inputProfile' value={email} onChange={e=>setEmail(e.target.value)} />
                            </div>
                            <div className='col-md-12'>
                                <label>Telefone</label>
                                <input type='text' className='inputProfile' value={telefone} onChange={e=>setTelefone(e.target.value)} />
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