import React, { useState, useEffect } from 'react';
import {Menu} from '../../Person/person';
import {useHistory} from 'react-router-dom';

import './style.css';
import '../style.css';
import './main.css';
import './util.css';
import api from '../../services/api';

export default function Login(){

    const [company_email, setCompanyEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensager, setMesager] = useState('');


    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            company_email,
            password
        };

        //alert(`email: ${data.user_email} e senha: ${data.password}`)

        try {
            const response = await api.post('company/login', data);
            console.log(response)

            if(response.data.error){
                //alert('Email ou senha incorreto')
                setMesager('Email ou senha incorreto');
            }else{
                localStorage.setItem('Token', response.data.token)
                history.push('/redirect')
            }
        } catch (error) {
            alert('email ou senha incorreto');
        }
    }

    return (
        <div>
            <Menu login={false}/>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                        <form className="login100-form validate-form" onSubmit={handleLogin}>
                            <span className="login100-form-title p-b-33">
                                Login Empresa
                            </span>
                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="email" placeholder="Email" value={company_email} onChange={e=>setCompanyEmail(e.target.value)}/>
                                <span className="focus-input100-1"></span>
                                <span className="focus-input100-2"></span>
                            </div>

                            <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
                                <span className="focus-input100-1"></span>
                                <span className="focus-input100-2"></span>
                            </div>
                            <p style={{marginTop:'5px', color:'red'}}>{mensager}</p>

                            <div className="container-login100-form-btn m-t-20">
                                <button className="login100-form-btn" type='submit'>
                                    Login
                                </button>
                            </div>

                            <div className="text-center p-t-45 p-b-4">
                                <span className="txt1">
                                    Esqueci
                                </span>

                                <a href="/#" className="txt2 hov1" style={{marginLeft:'5px'}}>
                                    Minha senha
                                </a>
                            </div>

                            <div className="text-center">
                                <span className="txt1">
                                    Não possui uma conta?
                                </span>

                                <a href="/#" className="txt2 hov1" style={{marginLeft:'5px'}}>
                                    Cadastre-se
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}