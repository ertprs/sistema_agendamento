import React, {useEffect, useState} from 'react';
import {Menu, Footer} from '../../Person/person';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

export default function SignUpUser(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [telefone, setTelefone] = useState('');

    const [errors, setErros] = useState({});

    useEffect(()=>{
        if(
            errors.name == '' && errors.email == '' && errors.email2 == '' && 
            errors.password == '' && errors.password2 == '' && errors.telefone == ''
        ){
            sendData();
        }

    }, [errors])

    var data = {
        user_name: name,
        password: password,
        user_email: email,
        user_tel: telefone,
    }

    const logon = useHistory();

    async function sendData(){
        try {
            console.log(data)
            const response = await api.post('createUser', data, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            console.log(response.data);

            alert('cadastro realizado com sucesso!');
            logon.push('/login');

            return response;
        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro no seu cadastro, tente novamente mais tarde')
        }
    }


    function validate(){
        let errors = {};
        console.log(name)
        if(!name){
            errors.name = 'o campo não pode ser vázio';
        }else{
            errors.name = '';
        }

        if(!password){
            errors.password = 'o campo não pode ser vázio';
        }else if(password != password2){
            errors.password = 'Os campos não podem ser diferentes';
        }else{
            errors.password = ''
        }

        if(!password2){
            errors.password2 = 'o campo não pode ser vázio';
        }else if(password != password2){
            errors.password2 = 'Os campos não podem ser diferentes';
        }else{
            errors.password2 = ''
        }

        if(!email){
            errors.email = 'o campo não pode ser vázio';
        }else if(email != email2){
            errors.email = 'Os campos não podem ser diferentes';
        }else{
            errors.email = ''
        }

        if(!email2){
            errors.email2 = 'o campo não pode ser vázio';
        }else if(email != email2){
            errors.email2 = 'Os campos não podem ser diferentes';
        }else{
            errors.email2 = ''
        }

        if(!telefone){
            errors.telefone = 'o campo não pode ser vázio';
        }else{
            errors.telefone = '';
        }
        
        console.log(errors)
        return errors;
    }

    function handleSubmit(e){
        e.preventDefault();
        setErros(validate())
    }
    return (
        <div>
            <Menu/>
            <form className='formProfile' onSubmit={e => handleSubmit(e)}>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <h2>Cadastro de Usuário </h2>
                        </div>
                        <div className='col-md-12'>
                            <label>Nome</label>
                            <input type='text' className='inputProfile' name='Nome' value={name} onChange={e=>setName(e.target.value)} />
                            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                        </div>
                        <div className='col-md-12'>
                            <label>Senha</label>
                            <input type='password' className='inputProfile'  name='Senha' value={password} onChange={e=>setPassword(e.target.value)}  />
                            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        </div>
                        <div className='col-md-12'>
                            <label>Confirme sua senha</label>
                            <input type='password' className='inputProfile'  name='Senha2' value={password2} onChange={e=>setPassword2(e.target.value)}  />
                            {errors.password2 && <p style={{color: 'red'}}>{errors.password2}</p>}
                        </div>
                        <div className='col-md-12'>
                            <label>E-mail</label>
                            <input type='email' className='inputProfile' name='Email' value={email} onChange={e=>setEmail(e.target.value)} required  />
                            {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                        </div>
                        <div className='col-md-12'>
                            <label>Confirme seu E-mail</label>
                            <input type='email' className='inputProfile' name='Email2' value={email2} onChange={e=>setEmail2(e.target.value)} required />
                            {errors.email2 && <p style={{color: 'red'}}>{errors.email2}</p>}
                        </div>
                        <div className='col-md-12'>
                            <label>Telefone</label>
                            <input type='text' className='inputProfile' name='Telefone' value={telefone} onChange={e=>setTelefone(e.target.value)}  />
                            {errors.telefone && <p style={{color: 'red'}}>{errors.telefone}</p>}
                        </div>
                        <div className='col-md-4'/>
                        <div className='col-md-4'>
                        <button type='submit' id='save' className='btn btn-transparent' style={{padding: '10px', marginBottom:'10px'}}>Enviar</button>
                        </div>
                        <div className='col-md-4'/>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>
    )
}