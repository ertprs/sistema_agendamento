import React from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';

import imagemBlog from '../upload/blog_01.jpg';
import loadingGif from '../images/loading.gif';
import logo from '../images/seu-logo.png';

import '../css/font-awesome.min.css';
import '../css/bootstrap.min.css';
import '../css/animate.css';
import './style.css';
import '../pages/style.css';



function saveId(id){
    localStorage.setItem('Id', id);
}


const Menu = () =>{
    return(
        <header className="header site-header" >
        <div className="container">
            <nav className="navbar navbar-default yamm">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="index.html"><img src={logo} alt="Logo" style={{width:'200px'}}/></a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><a href="index.html">Home</a></li>
                            <li className="dropdown yamm-fw hasmenu">
                                <a href="/#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Serviços <span className="fa fa-angle-down"></span></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="yamm-content">
                                            <div className="row"> 
                                                <div className="col-md-4">
                                                    <ul>
                                                        <li><a href="/">SEO Consultants</a></li>
                                                        <li><a href="/">SEO Audits</a></li>
                                                        <li><a href="/">SEO Packages e Plans</a></li>
                                                        <li><a href="/">Web Copywriting</a></li>
                                                        <li><a href="/">SEO Copywriting</a></li>
                                                        <li><a href="/">Keyword Research</a></li>
                                                        <li><a href="/">SEO Strategy</a></li>
                                                        <li><a href="/">Website Design</a></li>
                                                        <li><a href="/">Link Building Services</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul>
                                                        <li><a href="/#">All Services</a></li>
                                                        <li><a href="/#">Pricing e Plans</a></li>
                                                        <li><a href="/#">Our Clients</a></li>
                                                        <li><a href="/#">Testimonials</a></li>
                                                        <li><a href="/#">Free E-Books</a></li>
                                                        <li><a href="/#">SEO Analysis</a></li>
                                                        <li><a href="/#">Case Studies</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul>
                                                        <li><a href="/#">Blog e News</a></li>
                                                        <li><a href="/#">Blog Alternative</a></li>
                                                        <li><a href="/#">Single Blog</a></li>
                                                        <li><a href="/#">Default Page</a></li>
                                                        <li><a href="/#">Fullwidth Page</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="/page-about.html">Sobre</a></li>
                            <li><a href="/page-contact.html">Contato</a></li>
                            <li className="lastlink hidden-xs hidden-sm"><a className="btn btn-primary" href="page-seo-analysis.html"><i className="glyphicon glyphicon-log-in"></i> Login </a></li>
                        </ul>
                    </div> {/*<!--/.nav-collapse -->*/}
                </div> {/*<!--/.container-fluid -->*/}
            </nav> {/*<!-- end nav -->*/}
        </div> {/*<!-- end container -->*/}
        <div style={{backgroundColor:'#FFF5EE', height:'0.5px'}}></div>
    </header> 
    )
}

const Companies = (props) =>{

    if(props.loading){
        return <h3 style={{color:'#808080'}}><img src={loadingGif} style={{width:'40px', marginRight: '10px'}} alt='texto'/>Carregando informações, por favor aguarde</h3>
    }


    return(
        <>
        {props.companies.map(company => (
            <li key={company.company_id}  style={{listStyleType:'none'}}>
                
                    <div className="blog-box clearfix row">
                        <div className="media-box col-md-4">
                            <a href="/blog-single.html" title=""><img src={imagemBlog} alt={company.company_name} className="img-responsive img-thumbnail"/></a>
                        </div>
                        <div className="blog-desc col-md-8">
                            <h3><a href="/blog-single.html" title="">{company.company_name}</a></h3>
                            <strong>Contato</strong>
                            <p>Telefone: {company.company_tel}</p>
                            <p style={{marginTop:'-10px'}}>Email: {company.company_email}</p>
                            <p style={{marginTop:'-10px'}}>Endereço: </p>
                            <button  className='btn btn-primary' onClick={()=> saveId(company.company_id)}>
                                <Link to={'/servicesCompany/'+ company.company_id} style={{color:'white'}}>
                                    Selecionar
                                </Link>
                            </button>
                        </div>
                    </div>
                
            </li>
           ))}
        </>
    )
}

const PaginationNumber = ({postsPerPage, totalPosts, paginate}) =>{
    const pageNumbers = [];

    var totalPages = Math.ceil(totalPosts / postsPerPage);

    for(let i = 1; i <= totalPages; i++){
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className='pagination'>
                <li>
                    <Link onClick={()=> paginate(1)} to={'#'} >Primeira Página</Link>
                </li>
                {pageNumbers.map(number => (
                    <li ley={number} className='page-item'>
                        <Link onClick={()=> paginate(number)} to={'#'} className='page-link'>
                            {number}
                        </Link>
                    </li>
                ))}
                    <li>
                        <Link onClick={()=> paginate(totalPages)} to={'#'} >Última Página</Link>
                    </li>
            </ul>
        </nav>
    )
}

const Footer = ()=>{
    return(
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
    )
}

const PopupService = ()=>{
    return(
        <Popup trigger={<button className="btn btn-transparent"> Agendar </button>} modal>
    {close => (
      <div className="model">
        <a className="close " onClick={close}>
          &times;
        </a>
        <div className="header"> Informações para Agendamento </div>
        <div className="content">
          {" "}
          <label>Serviço: Corte</label>
          <label style={{marginLeft:'10px'}}>Valor: R$ 00,00</label>
          <br/>
          <label>Data de Agendamento</label>
          <input type='date'/>
          <label style={{marginLeft:'10px'}}>Data de Agendamento</label>
          <input type='date'/>
          <br />
          <label>Data de Agendamento</label>
          <input type='date'/>
          <label style={{marginLeft:'10px'}}>Data de Agendamento</label>
          <input type='date'/>
          <br/>
          <label>Data de Agendamento</label>
          <input type='date'/>
          <label style={{marginLeft:'10px'}}>Data de Agendamento</label>
          <input type='date'/>
          <br />
          <label>Data de Agendamento</label>
          <input type='date'/>
          <label style={{marginLeft:'10px'}}>Data de Agendamento</label>
          <input type='date'/>
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Agendar </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Vou ver o que faço aqui
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
    )
}


export {
    Companies, 
    PaginationNumber,
    Menu,
    Footer,
    PopupService
};