import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom"
import {Menu, Footer, PopupService} from '../../Person/person';

import imgService from '../../upload/book_01.png';

import '../../css/font-awesome.min.css';
import '../../css/bootstrap.min.css';
import '../../css/animate.css';
import '../style.css';

import api from '../../services/api';

export default function CompaniesServices(){
    //Aqui eu pego o parametro da url sem gambiarra estudar mais sobre isso
    //https://dev.to/finallynero/hooks-introduced-in-react-router-v5-1-7g8 Esse é o link do site
	//file:///C:/Users/Rendrikson/Desktop/tampletes/seotime/seotime/page-ebooks.html
	
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(false);
	
    const id = useParams();

	console.log('Params: '+id.id)
	
	useEffect(()=>{
		const fetchServices = ()=>{
			setLoading(true);
			api.get(`servicesCompany/${id.id}`).then(res=>{
				setServices(res.data);
				setLoading(false);
			})
		}

		fetchServices();
	}, [])


    return(
        <div>
            <Menu/>
            <section className="section transheaderServices bgcolor">
			<div className="container">
				<div className="row">	
					<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
						<h2>Nome do estabelecimento</h2>
					</div>
				</div>
			</div>
		</section>

        <section className="section">
			<div className="container">
				<div className="row">
					<ul>
					{services.map(service => (	
						<li key={services.service_id} style={{listStyleType:'none'}}>
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
										<PopupService/>
										
									</div>
								</div>
							</div>
						</div>
						</li>
					))}
					</ul>
				</div>
			</div>
		</section>
        <Footer/>


        </div>
    )
}
