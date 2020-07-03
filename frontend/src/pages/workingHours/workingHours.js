import React from 'react';
import { MenuCompany } from '../../Person/person';

import './styleWorkingHours.css';

export default function WorkingHours(){
    return (
        <div>
            <MenuCompany/>
            <form className='formDate'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 style={{marginTop:'10px'}}>Adicionar Horarios de Trabalho</h3>
                            <p style={{marginBottom:'10px'}}>Por favor, defina a data e os horarios que o estabelecimento funcionará</p>
                        </div>
                        <div className='col-md-12' >
                            <label style={{color:'black'}}>Data</label>
                            <input type='date' className='inputDate' style={{marginBottom:'20px'}} />
                        </div>

                        <h3>Horários</h3>

                        <div className='col-md-4'>
                            <h4 style={{fontSize: '1.5em', color:'black', marginTop: '10px'}}>Manhã</h4>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='08:00' value='08:00'  />
                                <label htmlFor='08:00' >08:00</label>
                            </div>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='08:10' value='08:10' />
                                <label htmlFor='08:10' >08:10</label>
                            </div>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='08:20' value='08:20' />
                                <label htmlFor='08:20' >08:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='08:30' value='08:30' />
                                <label htmlFor='08:30' >08:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='08:40' value='08:40' />
                                <label htmlFor='08:40' >08:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='08:50' value='08:50' />
                                <label htmlFor='08:50' >08:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='09:00' value='09:00' />
                                <label htmlFor='09:00' >09:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='09:10' value='09:10' />
                                <label htmlFor='09:10' >09:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='09:20' value='09:20' />
                                <label htmlFor='09:20' >09:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='09:30' value='09:30' />
                                <label htmlFor='09:30' >09:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='09:40' value='09:40' />
                                <label htmlFor='09:40' >09:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='09:50' value='09:50' />
                                <label htmlFor='09:50' >09:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='10:00' value='10:00' />
                                <label htmlFor='10:00' >10:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='10:10' value='10:10' />
                                <label htmlFor='10:10' >10:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='10:20' value='10:20' />
                                <label htmlFor='10:20' >10:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='10:30' value='10:30' />
                                <label htmlFor='10:30' >10:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='10:40' value='10:40' />
                                <label htmlFor='10:40' >10:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='10:50' value='10:50' />
                                <label htmlFor='10:50' >10:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='11:00' value='11:00' />
                                <label htmlFor='11:00' >11:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='11:10' value='11:10' />
                                <label htmlFor='11:10' >11:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='11:20' value='11:20' />
                                <label htmlFor='11:20' >11:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='11:30' value='11:30' />
                                <label htmlFor='11:30' >11:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='11:40' value='11:40' />
                                <label htmlFor='11:40' >11:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='11:50' value='11:50' />
                                <label htmlFor='11:50' >11:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:00' value='12:00' />
                                <label htmlFor='12:00' >12:00</label>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <h4 style={{fontSize: '1.5em', color:'black', marginTop: '10px'}}>Tarde</h4>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:00' value='12:00'  />
                                <label htmlFor='12:00' >12:00</label>
                            </div>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:10' value='12:10' />
                                <label htmlFor='12:10' >12:10</label>
                            </div>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:20' value='12:20' />
                                <label htmlFor='12:20' >12:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:30' value='12:30' />
                                <label htmlFor='12:30' >12:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:40' value='12:40' />
                                <label htmlFor='12:40' >12:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='12:50' value='12:50' />
                                <label htmlFor='12:50' >12:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='13:00' value='13:00' />
                                <label htmlFor='13:00' >13:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='13:10' value='13:10' />
                                <label htmlFor='13:10' >13:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='13:20' value='13:20' />
                                <label htmlFor='13:20' >13:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='13:30' value='13:30' />
                                <label htmlFor='13:30' >13:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='13:40' value='13:40' />
                                <label htmlFor='13:40' >13:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='13:50' value='13:50' />
                                <label htmlFor='13:50' >13:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='14:00' value='14:00' />
                                <label htmlFor='14:00' >14:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='14:10' value='14:10' />
                                <label htmlFor='14:10' >14:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='14:20' value='14:20' />
                                <label htmlFor='14:20' >14:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='14:30' value='14:30' />
                                <label htmlFor='14:30' >14:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='14:40' value='14:40' />
                                <label htmlFor='14:40' >14:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='14:50' value='14:50' />
                                <label htmlFor='14:50' >14:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='15:00' value='15:00' />
                                <label htmlFor='15:00' >15:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='15:10' value='15:10' />
                                <label htmlFor='15:10' >15:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='15:20' value='15:20' />
                                <label htmlFor='15:20' >15:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='15:30' value='15:30' />
                                <label htmlFor='15:30' >15:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='15:40' value='15:40' />
                                <label htmlFor='15:40' >15:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='15:50' value='15:50' />
                                <label htmlFor='15:50' >15:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='16:00' value='16:00' />
                                <label htmlFor='16:00' >16:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='16:10' value='16:10' />
                                <label htmlFor='16:10' >16:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='16:20' value='16:20' />
                                <label htmlFor='16:20' >16:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='16:30' value='16:30' />
                                <label htmlFor='16:30' >16:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='16:40' value='16:40' />
                                <label htmlFor='16:40' >16:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='16:50' value='16:50' />
                                <label htmlFor='16:50' >16:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='17:00' value='17:00' />
                                <label htmlFor='17:00' >17:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='17:10' value='17:10' />
                                <label htmlFor='17:10' >17:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='17:20' value='17:20' />
                                <label htmlFor='17:20' >17:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='17:30' value='17:30' />
                                <label htmlFor='17:30' >17:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='17:40' value='17:40' />
                                <label htmlFor='17:40' >17:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='17:50' value='17:50' />
                                <label htmlFor='17:50' >17:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='18:00' value='18:00' />
                                <label htmlFor='18:00' >18:00</label>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <h4 style={{fontSize: '1.5em', color:'black', marginTop: '10px'}}>Noite</h4>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='18:10' value='18:10' />
                                <label htmlFor='18:10' >18:10</label>
                            </div>
                            <div className='col-md-6'>
                                <input type='checkbox' style={{ marginRight:'5px'}} id='18:20' value='18:20' />
                                <label htmlFor='18:20' >18:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='18:30' value='18:30' />
                                <label htmlFor='18:30' >18:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='18:40' value='18:40' />
                                <label htmlFor='18:40' >18:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='18:50' value='18:50' />
                                <label htmlFor='18:50' >18:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='19:00' value='19:00' />
                                <label htmlFor='19:00' >19:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='19:10' value='19:10' />
                                <label htmlFor='19:10' >19:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='19:20' value='19:20' />
                                <label htmlFor='19:20' >19:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='19:30' value='19:30' />
                                <label htmlFor='19:30' >19:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='19:40' value='19:40' />
                                <label htmlFor='19:40' >19:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='19:50' value='19:50' />
                                <label htmlFor='19:50' >19:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='20:00' value='20:00' />
                                <label htmlFor='20:00' >20:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='20:10' value='20:10' />
                                <label htmlFor='20:10' >20:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='20:20' value='20:20' />
                                <label htmlFor='20:20' >20:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='20:30' value='20:30' />
                                <label htmlFor='20:30' >20:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='20:40' value='20:40' />
                                <label htmlFor='20:40' >20:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='20:50' value='20:50' />
                                <label htmlFor='20:50' >20:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='21:00' value='21:00' />
                                <label htmlFor='21:00' >21:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='21:10' value='21:10' />
                                <label htmlFor='21:10' >21:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='21:20' value='21:20' />
                                <label htmlFor='21:20' >21:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='21:30' value='21:30' />
                                <label htmlFor='21:30' >21:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='21:40' value='21:40' />
                                <label htmlFor='21:40' >21:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='21:50' value='21:50' />
                                <label htmlFor='21:50' >21:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='22:00' value='22:00' />
                                <label htmlFor='22:00' >22:00</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='22:10' value='22:10' />
                                <label htmlFor='22:10' >22:10</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='22:20' value='22:20' />
                                <label htmlFor='22:20' >22:20</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='22:30' value='22:30' />
                                <label htmlFor='22:30' >22:30</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='22:40' value='22:40' />
                                <label htmlFor='22:40' >22:40</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='22:50' value='22:50' />
                                <label htmlFor='22:50' >22:50</label>
                            </div>
                            <div className='col-md-6'>   
                                <input type='checkbox' style={{ marginRight:'5px'}} id='23:00' value='23:00' />
                                <label htmlFor='23:00' >23:00</label>
                            </div>
                        </div>
                        
                        <div className='col-md-12'>
                            <button type='button' className='btn btn-primary' style={{marginTop:'20px', marginBottom:'10px', padding:'10px'}}>Adicionar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}