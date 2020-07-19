import React, {useState, useEffect} from  'react';
import {Menu, Footer} from '../../Person/person';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

export default function SignUpCompany(){
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [telefone, setTelefone] = useState('');
    const [city, setCity] = useState('');

    const [file, setFile] = useState('');
    
    var fn = new FormData();
    fn.append('file', file[0]);
    
    const [errors, setErros] = useState({});

    useEffect(()=>{
        if(
            errors.name == '' && errors.cnpj == '' && errors.email == '' && errors.email2 == '' && errors.name == ''
            && errors.password == '' && errors.password2 == '' && errors.telefone == ''
        ){
            sendData();
        }

    }, [errors])

    var data = {
        company_name: name,
        password: password,
        company_email: email,
        company_tel: telefone,
        company_cnpj: cnpj,
        cidade: city,
    }

    const logon = useHistory();

    async function sendData(){
        try {
            console.log(data)
            const response = await api.post('createCompanies', data, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            const file = await api.put(`uploadImage/${response.data.company.company_id}`, fn, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            console.log(file);
            console.log(response.data.company.company_id);

            alert('cadastro realizado com sucesso!');
            logon.push('/loginCompany');

            return response;
        } catch (error) {
            console.log(error);
           
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

        if(!cnpj){
            errors.cnpj = 'o campo não pode ser vázio';
        }else{
            errors.cnpj = '';
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
        
        if(!city){
            errors.city = 'o campo não pode ser vázio';
        }else{
            errors.city = '';
        }
        
        console.log(errors)
        return errors;
    }

    function handleSubmit(e){
        e.preventDefault();
        setErros(validate())
    }

    return(
        <div>
            <Menu/>
                <form className='formProfile' encType='multipart/form-data' onSubmit={e => handleSubmit(e)}>
                    <div className='container'>
                        <div className='row'>
                            <div>
                                <h2>Cadastro de Nova Conta </h2>
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
                                <label>CNPJ</label>
                                <input type='text' className='inputProfile'  name='CNPJ' value={cnpj} onChange={e=>setCnpj(e.target.value)}  />
                                {errors.cnpj && <p style={{color: 'red'}}>{errors.cnpj}</p>}
                            </div>
                            <div className='col-md-12'>
                                <label>E-mail</label>
                                <input type='email' className='inputProfile' name='Email' value={email} onChange={e=>setEmail(e.target.value)}  />
                                {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                            </div>
                            <div className='col-md-12'>
                                <label>Confirme seu E-mail</label>
                                <input type='email' className='inputProfile' name='Email2' value={email2} onChange={e=>setEmail2(e.target.value)}  />
                                {errors.email2 && <p style={{color: 'red'}}>{errors.email2}</p>}
                            </div>
                            <div className='col-md-12'>
                                <label>Telefone</label>
                                <input type='text' className='inputProfile' name='Telefone' value={telefone} onChange={e=>setTelefone(e.target.value)}  />
                                {errors.telefone && <p style={{color: 'red'}}>{errors.telefone}</p>}
                            </div>
                            <div className='col-md-12'>
                                <label>Cidade</label>
                                <select name='Cidade' value={city} onChange={e=>setCity(e.target.value)}  className='inputProfile'>
                                    <option></option>
                                    <option value='Penedo-AL'>Penedo-AL</option>
                                </select>
                                {errors.city && <p style={{color: 'red'}}>{errors.city}</p>}
                            </div>
                            <div className='col-md-12'>
                                <label>Logo</label>
                                <input type='file' className='inputProfile' name='image' id='file' onChange={e=>setFile(e.target.files)}/>
                            </div>
                            <div className='col-md-4'/>
                            <div className='col-md-4'>
                            <button type='submit' id='save' className='btn btn-transparent' style={{padding: '10px', marginBottom:'10px'}}>Salvar</button>
                            </div>
                            <div className='col-md-4'/>
                        </div>
                    </div>
                </form>
            <Footer/>
        </div>
    )
}