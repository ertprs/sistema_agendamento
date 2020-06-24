import React from 'react';
import {Menu} from '../../Person/person';
import {Link} from 'react-router-dom';

import './style.css';
import '../style.css';
import './main.css';
import './util.css';


export default function Login(){

    return (
        <div>
            <Menu login={false}/>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-33">
                                Fazer login como?
                            </span>
                            <div className="container-login100-form-btn m-t-20">
                                <Link to='/loginCompany' style={{color:'white', width:'100%'}}>
                                    <button className="login100-form-btn">
                                        Empresa
                                    </button>
                                </Link>
                            </div>
                            <div className="container-login100-form-btn m-t-20">
                                <Link to='/login' style={{color:'white', width:'100%'}}>
                                    <button className="login100-form-btn">
                                        Cliente
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}