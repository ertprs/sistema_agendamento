import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

import imgService from '../../upload/book_01.png';

import '../../css/font-awesome.min.css';
import '../../css/bootstrap.min.css';
import '../../css/animate.css';
import '../style.css';

import {Menu, Footer} from '../../Person/person';

export default function CompaniesServices(){
    //Aqui eu pego o parametro da url sem gambiarra estudar mais sobre isso
    //https://dev.to/finallynero/hooks-introduced-in-react-router-v5-1-7g8 Esse é o link do site
    //file:///C:/Users/Rendrikson/Desktop/tampletes/seotime/seotime/page-ebooks.html
    
    const id = useParams();

    console.log('Params: '+id.id)
            
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
					<div className="col-md-6">
						<div className="ebook-details row">
							<div className="col-md-3">
								<img src={imgService} alt="" className="img-responsive"/>
							</div>
							<div className="col-md-9">
								<div className="book-details">
									<h3>Nome do Serviço</h3>
									<p>Descrição do serviço</p>
									<small>R$ 10,00</small><br/>
									<a href="/#" className="btn btn-transparent">Agendar</a>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="ebook-details row">
							<div className="col-md-3">
								<img src={imgService} alt="" className="img-responsive"/>
							</div>
							<div className="col-md-9">
								<div className="book-details">
									<small>Free</small>
									<h3>Nome do Serviço</h3>
									<p>Learn more about WordPress search engine optimization (tips, tricks and plugins)</p>
									<a href="/#" className="btn btn-transparent">Agendar</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
        <Footer/>


        </div>
    )
}