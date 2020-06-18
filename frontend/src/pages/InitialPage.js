import React from 'react';

import {Menu} from '../Person/person';

import fundoTela from '../upload/bg_04.jpg';
import imagemBannerEsquerda from '../upload/blog_alt_06.jpg';
import imagemBannerDireita from '../upload/blog_alt_01.jpg';

import '../css/font-awesome.min.css';
import '../css/bootstrap.min.css';
import '../css/animate.css';
import '../css/carousel.css';
import './style.css';
import { Link } from 'react-router-dom';

//import '../js/vendor/html5shiv.min.js';
//import '../js/vendor/respond.min.js';

export default function Initial(){
    return(
    <div>
        <Menu/>
        <section className="section transheader homepage parallax" data-stellar-background-ratio="0.5" style={{backgroundImage: `url(${fundoTela})`}}>
        <div className="container">
            <div className="row">	
                <div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
                    <h2>Agende Logo</h2>
                    <p className="lead">Agende seu horário de forma rápida e fácil sem sair de casa</p>
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
                    <small>Bem vindo ao agendamento fácil</small>
                    <h3>Top Lorem ipsum pharetra</h3>
                    <hr/>
                    <p className="lead"> Lorem ipsum pharetra facilisis lobortis erat tempor fermentum quam habitant, <br/>Lorem ipsum pharetra facilisis lobortis erat tempor </p>
                </div>
        </div>
        </section>

        <section className="section lb nopad spotlight style1">
        
            <div className="image col-md-4 hidden-sm hidden-xs">
                <img src={imagemBannerEsquerda} alt="" />
            </div>
            <div className="content">
                <h2>Be the leader in the sector</h2>
                <p>Cras arcu sapien, maximus a accumsan at, iaculis nec nunc. Nullam ac ultricies velit, ut tincidunt tellus. Nunc nec sem at ante imperdiet tempor. Ut eu vulputate augue. Maecenas ultrices, arcu vel condimentum pharetra, diam eros mattis lectus, nec gravida sem erat nec orci. In dapibus ex eget arcu feugiat, non rhoncus enimpien id ligula sollicitudin fringilla ut id lacus. </p>
                    <a href="/#" className="btn btn-transparent">Learn More</a>
            </div>
        </section>
        
        <section className="section lb nopad spotlight style1">
            <div className="content">
                <h2>Protect place with detailed analysis</h2>
                <p>Donec congue odio in mi finibus dignissim. Etiam faucibus pharetra euismod. Pellentesque malesuada et ligula et scelerisque. Pellentesque aliquet magna ut dolor consequat, luctus tincidunt metus consequat. Nam eu mattis ante, nec facilisis purus. Praesent ac venenatis erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tincidunt finibus.</p>
                    <a href="/#" className="btn btn-transparent">Learn More</a>
            </div>
            <div className="image col-md-4 hidden-sm hidden-xs">
                <img src={imagemBannerDireita} alt="" />
            </div>
        </section>

        <footer className="footer primary-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <div className="widget clearfix">
                            <h4 className="widget-title">Nome da empresa ou logo</h4>
                            <div className="newsletter-widget">
                                <p>Frase da empresa</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-2">
                        <div className="widget clearfix">
                            <h4 className="widget-title">Empresa</h4>
                            <ul>
                                <li><a href="/#">Sobre nós</a></li>
                                <li><a href="/#">Contatos</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-2">
                        <div className="widget clearfix">
                            <h4 className="widget-title">Rede Sociais</h4>
                            <ul>
                                <li><a href="/#">Facebook</a></li>
                                <li><a href="/#">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div> 
    )
}