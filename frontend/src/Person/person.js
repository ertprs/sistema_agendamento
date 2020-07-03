import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Popup from 'reactjs-popup';
import api from '../services/api';

import imagemBlog from '../upload/blog_01.jpg';
import loadingGif from '../images/loading.gif';
import imgService from '../upload/book_01.png';
import logo from '../images/seu-logo.png';

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
            console.log('entrou aqui')
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
                        <Link className="navbar-brand" to='/'><img src={logo} alt="Logo" style={{width:'200px'}}/></Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><a href="index.html">Home</a></li>
                            <li><a href="/page-about.html">Sobre</a></li>
                            <li><a href="/page-contact.html">Contato</a></li>
                            {/* CLIENTE */}
                            <li><Link to='/userSchedule'>{props.schedules}</Link></li>
                            <li><Link to='/'>{props.account}</Link></li>
                            {/* EMPRESA*/}
                            <li><Link to=''>{props.scheduleCompany}</Link></li>{/* VOU CRIAR A PAGINA DA EMPRESA*/}
                            <li className="lastlink hidden-xs hidden-sm"><Link className="btn btn-primary" to="/selectLogin" onClick={logOut}><i className={`glyphicon glyphicon-log-${icon}`}></i> {logName} </Link></li>
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
                        <Link className="navbar-brand" to='/'><img src={logo} alt="Logo" style={{width:'200px'}}/></Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link href="companySchedule">Agendamentos do dia</Link></li>
                            <li><Link to='/report'>Relatório</Link></li>
                            <li><Link to='/#'>Fatura Mensal</Link></li>
                            <li><Link to='/#'>Horários de trabalho</Link></li>
                            <li><a href="/page-about.html">Conta</a></li>
                            <li className="lastlink hidden-xs hidden-sm"><Link className="btn btn-primary" to="/" onClick={logOut} ><i className="glyphicon glyphicon-log-out"></i> Sair </Link></li>
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
                console.log(`api: ${res.data.map(dat => (dat.attendace_id))}`)
                setInfo(res.data);
                if(res.data.length == 0){
                    setMensager('Sem horários disponíveis para a data selecionada')
                }else{
                    setMensager('')
                }
            })
            
            //setFree([hoursId])
            console.log("aqui: "+ [info])
            console.log("hora id: "+ hoursId)
            

        }
    },[date])
    //Esse é responsável por pegar o Id da hora e ir no banco de dados verificar se tem algum agendamento com esse id de atendimento
    useEffect(()=>{
        console.log("hora id2: "+ hoursId) //ID DO ATENDIMENTO (attendance_id)
      
        api.get(`hours?id=${hoursId}`).then(res=>{
            console.log('Primeira promise: '+res.data)
            setFree(res.data);

        })
        
    }, [hoursId])
    //Esse é responsável por pegar o resultado do anterior e verificar se está livre ou não o horario(se o array retornar vázio está livre)
    useEffect(()=>{
        console.log('valor: '+free)
        console.log('Tamanho: '+free.length)
        info.map(infos => {
            if(free.length != 0){
                console.log('horário ocupado: '+ infos.opening_hours + ' id: '+infos.attendace_id)
            }else{
                console.log('horário livre '+ infos.opening_hours + 'id: '+ infos.attendace_id)
            }
        })

    }, [free])

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

        //console.log(infos);

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
                                    <td>{realCurrency(parseInt(incident.value)) }</td>
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
    ReportTable
};