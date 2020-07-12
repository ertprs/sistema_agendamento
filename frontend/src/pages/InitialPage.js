import React, { useEffect, useState } from 'react';

import {Menu, Footer} from '../Person/person';

import imagemBannerEsquerda from '../images/business1.jpg';
import imagemBannerDireita from '../images/client1.jpg';

import '../css/font-awesome.min.css';
import '../css/bootstrap.min.css';
import '../css/animate.css';
import '../css/carousel.css';
import './style.css';
import { Link } from 'react-router-dom';
import api from '../services/api';


//import '../js/vendor/html5shiv.min.js';
//import '../js/vendor/respond.min.js';

export default function Initial(){

    const [schedules, setSchedules] = useState('');
    const [account, setAccount] = useState('');
    const [login, setLogin] =useState(false)

    const token = localStorage.getItem('Token');

    useEffect(()=>{
        const fetchPage =()=>{
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

        fetchPage();
    }, [])

    return(
    <div>
        <Menu schedules={schedules} account={account} login={login}/>
        <section className="section transheader homepage" data-stellar-background-ratio="0.5" >
        <div className="container">
            <div className="row">	
                <div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
                    <h2>Agende Now</h2>
                    <p className="lead">Marque Seu Horário Sem Sair de Casa</p>
                    <form className="calculateform">
                        <div className="item-box">
                            <div className="item-top form-inline">
                                <div className="form-group">
                                    <div className="input-group2">
                                        <span className="input-addon">
                                            <i className="fa fa-map-o"></i>
                                        </span>
                                        <select className="form-control" id="urladres" name="url" >
                                            <option></option>
                                            <option>Penedo - AL</option>
                                        </select>
                                    </div>
                                </div>
                                <Link to='/companiesList'><input type="submit" name="send" value="Buscar" className="btn btn-default" style={{marginLeft:'10px'}} /></Link>
                            </div>
                        </div>
                    </form>
                </div>{/*<!-- end col -->*/}
            </div>{/*<!-- end row -->*/}
        </div>{/*<!-- end container -->*/}
        </section>{/*<!-- end section -->*/}

        <section>
        <div className="container">
                <div className="section-title text-center">
                    <small>Bem vindo ao Agende Now</small>
                    <h3>Conheça os Benéficios em Utilizar Nossa Plataforma</h3>
                    <hr/>
                    <p className="lead">Nossa plataforma trás benefícios para sua empresa e clientes. <br/>Tenha o controle de sua empresa na palma de sua mão e dê tchau a fila de espera de seus clientes. </p>
                </div>
        </div>
        </section>

        <section className="section lb nopad spotlight style1">
        
            <div className="image col-md-4 hidden-sm hidden-xs">
                <img src={imagemBannerEsquerda} alt="empresa" />
            </div>
            <div className="content">
                <h2>Empresa</h2>
                <p style={{textAlign:'justify'}}>Aumente seu faturamento sem filas de espera para seus clientes. Tenha total controle e segurança no gerenciamento do seus estabelecimento. Aumente a possibilidade estratégica do marketing de sua empresa tendo vizibilidade mundial do estabelecimento. </p>
                    
            </div>
        </section>
        
        <section className="section lb nopad spotlight style1" style={{marginBottom:'20px'}}>
            <div className="content">
                <h2>Cliente</h2>
                <p style={{textAlign:'justify'}}>Dê adeus as filas de esperas nos estabelecimentos, otimize seu tempo e  acompanhe seu atendimento em qualquer lugar. </p>
                    
            </div>
            <div className="image col-md-4 hidden-sm hidden-xs">
                <img src={imagemBannerDireita} alt="cliente" />
            </div>
        </section>

        <Footer />
    </div> 
    )
}