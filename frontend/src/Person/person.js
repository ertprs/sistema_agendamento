import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Popup from 'reactjs-popup';
import api from '../services/api';

import imagemBlog from '../upload/blog_01.jpg';
import loadingGif from '../images/loading.gif';
import imgService from '../upload/book_01.png';
import logo from '../images/logo.png';

import '../css/font-awesome.min.css';
import '../css/bootstrap.min.css';
import '../css/animate.css';
import './style.css';
import '../pages/style.css';


//****FUNÇÕES****

var token = localStorage.getItem('Token');

async function handleServicePerformed(id){
    try {
        let response = window.confirm('O atendimento foi realizado?');
        if(response === true){
            await api.put(`updateStatus/${id}`, {}, {
                headers:{
                    auther: token,
                }
            }).then(res=>{
                console.log(res)
            })

            window.location.reload();
        }
    } catch (error) {
        alert('Error ao confirmar o atedimento, por favor tente novamente.');
    }
}

async function handleDeleteScheduleClient(id){
    try {
        let response = window.confirm('Você realmente deseja cancelar esse agendamento?');
        if(response === true){
            await api.delete(`scheduleUserFromCompany/${id}`, {
                headers:{
                    auther: token,
                }
            })

            alert('Agendamento cancelado com sucesso');
            window.location.reload();
        }
    } catch (error) {
        alert('Error ao cancelar agendamento, tente novamente.');
    }
}

function saveId(id){
    localStorage.setItem('Id', id);
}

function loadingInfo(){
   return <h3 style={{color:'#808080'}}><img src={loadingGif} style={{width:'40px', marginRight: '10px'}} alt='texto'/>Carregando informações, por favor aguarde</h3>
}

function realCurrency(value){
    var real = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    
    return real
}

function formatarData(data){
    //O valor de data retornado do bd é 2020-06-05T03:00:00.000Z
    var valor =  data.substring(0, 10); //substring é responsável por pegar o caracter da posição 0 até a 10 que é 2020-06-05
    var split = valor.split('-');//utiliza um caractere para separa a string no caso é o "-" da data
    var data_formatada = split[2] + "/" + split[1] + "/" + split[0];/*aqui reformulamos no padrão brasileiro
    a posição 0 é 2020, a posição  1 é 06 e a 2 é 05, ai só colocamos na ordem e concatenamos com a barra(/)*/
    
    return data_formatada;
}

function DropdownMenuMobile() {
    var x = document.getElementById("navbar");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

//****COMPONENTES****

const Menu = (props) =>{
    var initial = useHistory();

    function logOut(){
        if(!props.login){

        }else{
            localStorage.clear();
        
            initial.push('/');
        }
    }

    var logName;
    var icon;

    if(!props.login){
        logName = 'Login';
        icon ='in';
    }else{
        logName = 'Sair';
        icon='out';
    }

    return(
        <header className="header site-header" >
        <div className="container">
            <nav className="navbar navbar-default yamm">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" onClick={()=>DropdownMenuMobile()} class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to='/'><img src={logo} alt="Logo" style={{width:'200px'}}/></Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/">Home</Link></li>
                            <li><Link to="/">Sobre</Link></li>
                            <li><Link to="/">Contato</Link></li>
                            {/* CLIENTE */}
                            <li><Link to='/userSchedule'>{props.schedules}</Link></li>
                            <li><Link to='/'>{props.account}</Link></li>
                            <li className="lastlink"><Link className="btn btn-primary" to="/selectLogin" onClick={logOut}><i className={`glyphicon glyphicon-log-${icon}`}></i> {logName} </Link></li>
                        </ul>
                    </div> {/*<!--/.nav-collapse -->*/}
                </div> {/*<!--/.container-fluid -->*/}
            </nav> {/*<!-- end nav -->*/}
        </div> {/*<!-- end container -->*/}
        <div style={{backgroundColor:'#FFF5EE', height:'0.5px'}}></div>
    </header> 
    )
}


const MenuCompany = (props) =>{

   var initial = useHistory();

    function logOut(){
        localStorage.clear();
    
        initial.push('/');
    }
    return(
        <header className="header site-header" >
        <div className="container">
            <nav className="navbar navbar-default yamm">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" onClick={()=>DropdownMenuMobile()} class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to='/companySchedule'><img src={logo} alt="Logo" style={{width:'200px'}}/></Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/companySchedule">Agendamentos do dia</Link></li>
                            <li><Link to='/report'>Relatório</Link></li>
                            <li><Link to='/#'>Fatura Mensal</Link></li>
                            <li className='dropdownMenu'>
                                <span>
                                    Horários de trabalho
                                    <span className="fa fa-angle-down" style={{marginLeft:'5px'}}/>
                                </span>
                                <div className='dropdown-content-menu'>
                                    <Link to='/workingHours'><p>Adicionar horários</p></Link>
                                    <Link to='/viewSchedule'><p>Vizualizar horários</p></Link>
                                </div>
                            </li>
                            <li><Link to='servicesCreate'>Serviços</Link></li>
                            <li><a href="/page-about.html">Conta</a></li>
                            <li className="lastlink"><Link className="btn btn-primary" to="/" onClick={logOut} ><i className="glyphicon glyphicon-log-out"></i> Sair </Link></li>
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
       return loadingInfo();
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
                            <Link to={'/servicesCompany/'+ company.company_id} style={{color:'white'}}>
                                <button  className='btn btn-primary' onClick={()=> saveId(company.company_id)}>
                                        Selecionar
                                </button>
                            </Link>
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
                            
                            <img src={logo} alt="Logo" style={{width:'200px', marginTop:'65px'}}/>
                            
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

const Services = (props) =>{
    function posts(){
        if(props.services == ''){
        return(<h1>Estabelecimento sem serviços registrados, por favor escolha outro estabelecimento</h1>)
        }

    }
    if(props.loading){
        return loadingInfo();
    }

    return(
        <>
        {props.services.map(service => (	
            <li key={service.service_id} style={{listStyleType:'none'}}>
            <div className="col-md-6">
                <div className="ebook-details row">
                    <div className="col-md-3">
                        <img src={imgService} alt="" className="img-responsive"/>
                    </div>
                    <div className="col-md-9">
                        <div className="book-details">
                            <h3>{service.service_name}</h3>
                            <p>Descrição do serviço</p>
                            <small>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(service.value)}</small><br/>
                            <PopupService value={service.value} nameService={service.service_name} id={props.id} id_servico={service.service_id}/>
                        </div>
                    </div>
                </div>
            </div>
            </li>
        ))}
        {posts()}
        </>
    )
}

const PopupService = (props)=>{

    const [date, setDate] = useState('');
    const [info, setInfo] = useState([]);
    const [hoursId, setHoursId] = useState(0);
    const [free, setFree] = useState([]);
    const [mensager, setMensager] = useState('');


    useEffect(()=>{
        if(date != ''){
            api.get(`dateAtendance/${date}?id=${props.id}`).then(res=>{
                setInfo(res.data);
                if(res.data.length == 0){
                    setMensager('Sem horários disponíveis para a data selecionada')
                }else{
                    setMensager('')
                }
            });
        }
    },[date])

    //Esse é responsável por pegar o Id da hora e ir no banco de dados verificar se tem algum agendamento com esse id de atendimento
    useEffect(()=>{
      
        api.get(`hours?id=${hoursId}`).then(res=>{
            setFree(res.data);
        })
        
    }, [hoursId])
    

    const user = localStorage.getItem('id_user');
    const token = localStorage.getItem('Token');

    //função responsável por agendar o horário do cliente
    async function schedule(){
        

        //Dados para o agendamento
        const infos = {
            status: 'true',
            company_id_schedule: props.id,
            user_id_schedule: user,
            service_id_schedule: props.id_servico,
            attendace_id_schedule: hoursId,
            
        }

        /* AS INFORMAÇÕES NECESSÁRIAS PARA REALIZAR O AGENDAMENTO (estão na const infos)
            O id do serviço e o id da empresa estão no componentes Services (service.service_id) e da empresa(props.id) TODOS PASSADOS COMO PROPS PARA O COMPONENTE PopupService.
            O id do Atendimento está no componente PopupService dentro da constante hoursId no momento que o cliente escolhe a data de atendimento.
            O id do usuário é pgo na autenticação da rota e salvo no localStorage
         */

        try {
            const response = await api.post('creatSchedule' , infos, {
                headers: {
                    auther: token,
                }
            });
            //console.log(response);
            if(response.data.error){
                alert(response.data.error)
            }else{
                alert('Agendamento Realizado!!!');
                //Aqui é bom direcionar para pagina com os agedamentos do usuário
            }
        } catch (error) {
            alert(`Erro no agendamento, tente novamento mais tarde.`)
        }
    }

    return(
        <Popup trigger={<button className="btn btn-transparent"> Agendar </button>} modal>
    {close => (
      <div className="model">
        <Link className="close "  onClick={close}>
          &times;
        </Link>
        <div className="header"> Informações para Agendamento </div>
        <div className="content">
          {" "}
          <form onSubmit={schedule}>
          <label>Serviço: {props.nameService}</label>
          <label style={{marginLeft:'10px'}}>Valor: R$ {props.value}</label>
          <br/>
          <label>Data de Agendamento:</label>
          <input type='date' value={date} onChange={e=>setDate(e.target.value)} style={{marginLeft:'5px', border:'1px solid gray'}}/>
          <label style={{marginLeft:'10px', marginRight: '5px'}}>Horários Disponíveis:</label>
          <select value={hoursId} onChange={e=>setHoursId(e.target.value)}>
              <option></option>
              {info.map(infos => (
                <option key={infos.attendace_id} value={infos.attendace_id} >{infos.opening_hours}h</option> 
                ))}
          </select>
            <strong style={{color:'red', display:'block'}}>{mensager}</strong>
          <br />
          <button  type='submit' style={{
                display:'flex',
                margin:'0 auto',
                border: '1px solid gray',
                marginBottom: '-20px',
                padding: '5px'
           }} position='top center'> Agendar </button>
          </form>
        </div>
        <div className="actions">
         {/* <Popup
            
            position="top center"
            closeOnDocumentClick
          >
           
            <span>
              Falta pegar o Id do cliente só 
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
        </button>*/}
        </div>
      </div>
    )}
  </Popup>
    )
}


const UserSchedules = (props)=>{
    if(props.loading){
        return loadingInfo();
    }else if(props.incidents.length == 0){
        return <h2 style={{textAlign:"center"}}>Sem agendamento em aberto</h2>
    }
    return(
        <section className="section">
                <div className="container">
                    <div className="row clientv2">
                        <ul>
                        {props.incidents.map(incident=>(
                        <li key={incident.schedule_id}>
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="client-box">
                            <div style={{
                                float:'left', 
                                display:'flex',
                                padding:'10px', 
                                width:'100px', 
                                height:'257px',
                                backgroundColor:'#D3D3D3',
                                margin:'-30px',
                                textAlign:'center',
                                justifyContent:'center',
                                
                                }}>
                                <strong style={{marginTop:'97px', color:'#363636'}}>Horário<br/>{incident.opening_hours} h</strong>
                            </div>
                            <div style={{marginLeft:'100px'}}>
                                <strong>Estabelecimento:</strong>
                                <p>{incident.company_name}</p>
                                <strong>Serviço:</strong>
                                <p>{incident.service_name}</p>
                                <strong>Valor:</strong>
                                <p>R$ {incident.value}</p>
                                <strong>Data do atendimento:</strong>
                                <p>{formatarData(incident.attendace_date)}</p>
                            </div>
                            </div>
                        </div>
                        </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </section>
    )
}

const SchedulesCompany = (props)=>{
    if(props.loading){
        return loadingInfo();
    }

    return(
        <section className="section">
        <div className="container">
            <div className="row clientv2">
                <ul>
                {props.incidents.map(incident=>(
                <li key={incident.schedule_id}>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="client-box">
                    <div style={{
                        float:'left', 
                        display:'flex',
                        padding:'10px', 
                        width:'100px', 
                        height:'297px',
                        backgroundColor:'#D3D3D3',
                        margin:'-30px',
                        textAlign:'center',
                        justifyContent:'center',
                        
                        }}>
                        <strong style={{marginTop:'97px', color:'#363636'}}>Horário<br/>{incident.opening_hours} h</strong>
                    </div>
                    <div style={{marginLeft:'100px'}} >
                        <strong>Nome do Cliente:</strong>
                        <p>{incident.user_name}</p>
                        <strong>Serviço:</strong>
                        <p>{incident.service_name}</p>
                        <strong>Valor:</strong>
                        <p>R$ {incident.value}</p>
                        <strong>Data do atendimento:</strong>
                    <p>{formatarData(incident.attendace_date)}</p>
                        <button className='btn btn-transparent' onClick={()=>handleServicePerformed(incident.schedule_id)} style={{padding:'5px', marginTop:'5px'}}>Atendimento realizado</button>
                        <button className='btn btn-transparent' onClick={()=>handleDeleteScheduleClient(incident.schedule_id)} style={{padding:'5px', marginTop:'5px', marginLeft:'5px', color:'red', border:'1.5px solid red'}}>Cancelar Atendimento</button>
                    </div>
                    </div>
                </div>
                </li>
                ))}
                </ul>
                <h2>{props.mensagerText}</h2>
            </div>
        </div>
    </section>
    )
}

const ReportTable = (props) =>{
    if(props.loading){
        return loadingInfo();
    }else if(props.status){
        return <div></div>
    }

    return(
        <div>
            <div className='container tableClass'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Total de agendamentos: {props.totalSchedule}</h3>
                    </div>
                    <div className='col-md-4'>
                        <h3>Receita total: {realCurrency(props.totalRevenue)  }</h3>
                    </div>
                    <div className='col-md-4'>
                        <h3>Taxa de serviço: {realCurrency(props.percentage)}</h3>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <h4>Todos os agendamentos do período</h4>
                    </div>
                    <div className='col-md-12'>
                    <table border='1' style={{backgroundColor:'white', marginTop:'10px' , width:'100%', marginBottom:'20px'}}>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>valor do serviço</th>
                                <th>Nome do cliente</th>
                                <th>Data do agendamento</th>
                            </tr>
                        </thead>
                        <tbody>
                                {props.incidents.map(incident=>(
                                <tr key={incident.schedule_id}>
                                    <td>{incident.service_name}</td>
                                    <td>{realCurrency(parseFloat(incident.value)) }</td>
                                    <td>{incident.user_name}</td>
                                    <td>{formatarData(incident.attendace_date)}</td>
                                </tr>
                                ))}
                        </tbody>
                        
                    </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

const ServiceTable = (props)=>{

    if(props.loading){
        return loadingInfo();
    }

    async function handleDeleteScheduleService(idCompany, idService){
        const token = localStorage.getItem('Token');

        try {
            let response = window.confirm('Você realmente deseja cancelar esse agendamento?');
            if(response === true){
                await api.delete(`deleteService/${idCompany}?idService=${idService}`, {
                    headers:{
                        auther: token,
                    }
                })
    
                alert('Agendamento cancelado com sucesso');
                window.location.reload();
            }
        } catch (error) {
            alert('Error ao cancelar agendamento, tente novamente.');
        }
    }

    return(
        <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <h4>Todos Serviços da Empresa</h4>
                    </div>
                    <div className='col-md-12'>
                    <table border='1' style={{backgroundColor:'white', marginTop:'10px' , width:'50%', marginBottom:'20px'}}>
                        <thead>
                            <tr>
                                <th style={{color:'black', textAlign:'center'}}>Nome do Serviço</th>
                                <th style={{color:'black', textAlign:'center'}}>valor do serviço</th>
                                <th colSpan='2' style={{textAlign:'center', color:'black'}}>Opções</th>
                                
                            </tr>
                        </thead>
                        <tbody>    
                            {props.serviceList.map(service=>(
                            <tr key={service.service_id}>
                                <th>{service.service_name}</th>
                                <th>{realCurrency(parseFloat(service.value))} </th>    
                                <th><PopupServiceEdit idService={service.service_id} idCompany={service.company_id_service}>Editar</PopupServiceEdit></th>
                                <th><button className='btn btn-transparent' onClick={()=>handleDeleteScheduleService(service.company_id_service, service.service_id)} style={{padding:'10px', margin:'auto', color:'red', borderColor:'red'}}>Ecluir</button></th>
                            </tr>      
                            ))}      
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const PopupServiceEdit = (props)=>{

    const token = localStorage.getItem('Token');

    const [service_name, setService_name] = useState('');
    const [value, setValue] = useState('');
    
    useEffect(()=>{
        api.get(`serviceSelect/${props.idCompany}?idService=${props.idService}`, {
            headers: {
                auther: token
            }
        }).then(res=>{
            setService_name(res.data[0].service_name);
            setValue(res.data[0].value);
        })
    }, [])

    async function handlePost(){

        const data ={
            service_name: service_name,
            value: value,
        }

        await api.put(`serviceUpdate/${props.idCompany}?idService=${props.idService}`, data, {
            headers:{
                auther: token
            }
        } )
    }

    
    return(
    <Popup trigger={<button className="btn btn-transparent" style={{padding:'10px', margin:'auto'}}> Editar </button>} modal>
    {close => (
      <div className="model">
        <Link className="close "  onClick={close}>
          &times;
        </Link>
        <div className="header"> Informações do Serviço </div>
        <div className="content">
          {" "}
          <form onSubmit={handlePost}>
          <label>Nome do Serviço:</label>
          <input type='text' value={service_name} onChange={e=>setService_name(e.target.value)} style={{marginLeft:'5px', border:'1px solid gray', padding:'0px 0px 0px 5px'}}/>
          <label style={{marginLeft:'5px', marginRight: '5px'}}>Valor do Serviço:</label>
          <input type='number' value={value} onChangeCapture={e=>setValue(e.target.value)}  style={{marginLeft:'5px', border:'1px solid gray', padding:'0px 0px 0px 5px'}}/>
          <button  type='submit' style={{
                display:'flex',
                margin:'0 auto',
                border: '1px solid gray',
                padding: '5px',
                marginTop:'10px'
           }} position='top center'> Editar </button>
          </form>
        </div>
      </div>
    )}
    </Popup>
    )
}

const HistoricServiceTable = (props)=>{
    if(props.loading){
        return loadingInfo();
    }

    return (
        <div className='container' >
                <div className='row'>
                    <div className='col-md-12'>
                    <table border='1' style={{backgroundColor:'white', marginTop:'10px' , width:'100%', marginBottom:'20px'}}>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>valor do serviço</th>
                                <th>Horário do agendamento</th>
                                <th>Empresa</th>
                                <th>Data do agendamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {props.historicIncident.map((incident, index)=>(  
                                <tr key={index}>
                                    <td>{incident.service_name}</td>
                                    <td>{realCurrency(parseFloat(incident.value))}</td>
                                    <td>{incident.opening_hours}</td>
                                    <td>{incident.company_name}</td>
                                    <td>{formatarData(incident.attendace_date)}</td>
                                </tr>    
                            ))} 
                        </tbody>
                        
                    </table>

                    </div>
                </div>
            </div>
    )
}

const Allhours = (props) =>{
    //variável responsável por atualizar os itens quando excluido
    var cont = 0;

    if(props.loading){
        return loadingInfo();
    }else if(!props.status){
        return <div></div>
    }

    async function configHours(id, hour){
       
        var now = new Date;
        
        console.log(props.date)

        var datanow = now.getFullYear()+'-'+ (now.getMonth()+1) + '-' + now.getDate()
        if((now.getMonth()+1) < 10){
            var datanow = now.getFullYear()+'-0'+ (now.getMonth()+1) + '-' + now.getDate()
        }
        if(now.getDate() < 10){
            var datanow = now.getFullYear()+'-'+ (now.getMonth()+1) + '-0' + now.getDate()
        }

        if(now.getDate() < 10 && (now.getMonth()+1) < 10){
            var datanow = now.getFullYear()+'-0'+ (now.getMonth()+1) + '-0' + now.getDate()
        }

        var data1 = new Date(props.date)
        var data2 = new Date(datanow);
        
        var hourNow;

        if(now.getHours() == 0){
            hourNow = '0'+now.getHours()+':'+now.getMinutes();
        }else{
            hourNow = now.getHours()+':'+now.getMinutes();
        }


        if(data1.getTime() >= data2.getTime()){
            if(hourNow > hour && data1.getTime() == data2.getTime()){
                alert('Não é possível apagar horários que já passaram')
            }else if(hourNow < hour && data1.getTime() == data2.getTime()){
                cont = 1;
                deleteHours(id);
            }else if(data1.getTime() > data2.getTime()){
                cont = 1;
                deleteHours(id);
            }else{
                alert('erro, tente novamente mais tarde')
            }
            
        }else {
            
            alert('Não é possível apagar um horário que já passaram de dias anteriores')
        }

    }

    async function deleteHours(id){
        try {
            const token = localStorage.getItem('Token');

            await api.delete(`deleteAttendance/${id}`, {
                headers: {
                    auther: token
                }
            })

            alert('Horário apagado com sucesso!');
            //chama a função que busca os horários, dessa forma atualiza os itens
            if(cont == 1){
                props.function();
                cont = 0;
            }
            //window.location.reload();
        } catch (error) {
            alert('Erro ao apagar o horário, tente novamente mais tarde');
        }
    }

    return(
        <div>
            <h3>Horários</h3>

            <div className='col-sm-4 col-md-4'>
                <h4 style={{fontSize: '1.5em', color:'black', marginTop: '10px'}}>Manhã</h4>
                {props.morning.map((post, index)=>(
                <div className='col-md-6'>
                    <label key={post.attendace_id}>{post.opening_hours}</label>
                    <button type='button' onClick={()=> configHours(post.attendace_id, post.opening_hours)}>
                        <span className='fa fa-times' style={{color:'red', marginLeft:'4px'}}/>
                    </button>
                </div> 
                ))}
            </div>   
            <div className='col-sm-4 col-md-4'>
                <h4 style={{fontSize: '1.5em', color:'black', marginTop: '10px'}}>Tarde</h4>
                {props.afternoon.map((post, index)=>(
                <div className='col-md-6'>
                    <label key={post.attendace_id}>{post.opening_hours}</label>
                    <button type='button' onClick={()=> configHours(post.attendace_id, post.opening_hours)}>
                        <span className='fa fa-times' style={{color:'red', marginLeft:'4px'}}/>
                    </button>
                </div> 
                ))}
            </div>   
            <div className='col-sm-4 col-md-4'>
                <h4 style={{fontSize: '1.5em', color:'black', marginTop: '10px'}}>Noite</h4>
                {props.night.map((post, index)=>(
                <div className='col-md-6'>
                    <label key={post.attendace_id}>{post.opening_hours}</label>
                    <button type='button' onClick={()=> configHours(post.attendace_id, post.opening_hours)}>
                        <span className='fa fa-times' style={{color:'red', marginLeft:'4px'}}/>
                    </button>
                </div> 
                ))}
            </div>   
        </div>
    )
}



export {
    Companies, 
    PaginationNumber,
    Menu,
    Footer,
    PopupService, 
    Services,
    UserSchedules,
    MenuCompany,
    SchedulesCompany,
    ReportTable,
    ServiceTable,
    PopupServiceEdit,
    HistoricServiceTable,
    Allhours
};