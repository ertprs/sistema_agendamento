import React from 'react';
import {Menu} from '../../Person/person';

import './style.css';
import '../style.css';
import './main.css';
import './util.css';

export default function Login(){
    return (
        <div>
            <Menu/>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-33">
                                Faça seu Login
                            </span>

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email"/>
                                <span className="focus-input100-1"></span>
                                <span className="focus-input100-2"></span>
                            </div>

                            <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Senha"/>
                                <span className="focus-input100-1"></span>
                                <span className="focus-input100-2"></span>
                            </div>

                            <div className="container-login100-form-btn m-t-20">
                                <button className="login100-form-btn">
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

                            <div class="text-center">
                                <span class="txt1">
                                    Não possui uma conta?
                                </span>

                                <a href="/#" class="txt2 hov1" style={{marginLeft:'5px'}}>
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