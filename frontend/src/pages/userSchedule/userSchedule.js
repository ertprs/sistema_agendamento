import React from 'react';

import {Menu, Footer} from '../../Person/person';

export default function UserSchedule(){
    return(
        <div>
            <Menu />
            <section className="section normalhead">
			<div className="container">
				<div className="row">	
					<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
						<h2>Seus agendamentos</h2>
						<p className="lead">Aqui você tem controle de todos os seus agendamentos</p>
					</div>
				</div>
			</div>
		    </section>
            <section className="section">
                <div className="container">
                    <div className="row clientv2">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                            <div style={{display:'block', padding:'10px', width:'500px'}}>
                                <strong>Horário</strong>
                            </div>
                                <strong>Nome:</strong>
                                <p>Rendrikson</p>
                                <strong>Serviço:</strong>
                                <p>Corte na máquina</p>
                                <strong>Valor:</strong>
                                <p>R$ 10,00</p>
                                <strong>Horário do Atendimento</strong>
                                <p>08:00 h</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_02.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_03.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_04.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_05.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_06.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_07.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="client-box">
                                <a href="/#"><img src="upload/client_08.png" alt="" className="img-responsive"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <strong>Aqui vai ficar a paginação</strong>
            <Footer />
        </div>
    )
}