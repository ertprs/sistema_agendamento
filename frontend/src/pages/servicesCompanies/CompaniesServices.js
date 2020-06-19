import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom"
import {Menu, Footer, Services} from '../../Person/person';


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
	//const [date, setDate] = useState([]);
	
	const id = useParams();
	
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

	/*useEffect(()=>{
		const fetchHours = ()=>{
			api.get(`attendance/${id.id}`).then(res=>{
				setDate(res.data);
			})
		}

		fetchHours();
	}, [])*/


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
					<Services loading={loading} services={services} id={id.id}/>
					</ul>
				</div>
			</div>
		</section>
        <Footer/>


        </div>
    )
}
