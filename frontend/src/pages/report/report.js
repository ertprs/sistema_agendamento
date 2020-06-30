import React from 'react';
import {MenuCompany, Footer} from '../../Person/person';

import './styleReport.css';

export default function Report(){
    return(
        <div>
            <MenuCompany />
            <form className='formDate'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 style={{marginTop:'10px'}}>Relatório de agendamento</h3>
                            <p style={{marginBottom:'10px'}}>Por favor, defina o período que você deseja visualizar os seus atentimentos</p>
                        </div>
                        <div className='col-md-6' >
                            <label style={{marginTop:'10px'}}>Data inicial</label>
                            <input type='date' className='inputDate' />
                        </div>
                        <div className='col-md-6'>
                            <label style={{marginTop:'10px'}}>Data Final</label>
                            <input type='date' className='inputDate' />
                        </div>
                        <div className='col-md-12'>
                            <button className='btn btn-primary' style={{marginTop:'20px', marginBottom:'10px', padding:'10px'}}>Exibir Relatório</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className='container tableClass'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Total de agendamentos: 04</h3>
                    </div>
                    <div className='col-md-4'>
                        <h3>Receita total: R$ 100,00</h3>
                    </div>
                    <div className='col-md-4'>
                        <h3>Taxa de serviço: R$ 7,00</h3>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <h4 style={{marginTop:'50px', color:'#595959'}}>Todos os agendamentos no perído</h4>
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
                            <tr>
                                <td>corte de cabelo</td>
                                <td>R$ 10,00</td>
                                <td>Rendrikson</td>
                                <td>10/06/2020</td>
                            </tr>
                            <tr>
                                <td>corte de cabelo</td>
                                <td>R$ 10,00</td>
                                <td>Rendrikson</td>
                                <td>10/06/2020</td>
                            </tr>
                            <tr>
                                <td>corte de cabelo</td>
                                <td>R$ 10,00</td>
                                <td>Rendrikson</td>
                                <td>11/06/2020</td>
                            </tr>
                        </tbody>
                        
                    </table>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}