import React, {useEffect, useState} from 'react';

import api from '../../services/api';

import logo from '../../images/logo.png';

import anuncioImg from '../../images/banner.gif'

import '../../css/font-awesome.min.css';
import '../../css/bootstrap.min.css';
import '../../css/animate.css';
import '../style.css';

import {Companies, PaginationNumber, Menu , Footer} from '../../Person/person';


export default function ListCompanies(){

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(4);


    useEffect(()=>{
        const fetchCompanies = () =>{
            setLoading(true)
            api.get('companies').then(res =>{
                setCompanies(res.data);
                setLoading(false)
            })
        }

        fetchCompanies();
    }, [])


    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = companies.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
    <div style={{backgroundColor:'white'}}>
        <Menu/>
    <div>
        <h1 style={{marginLeft:'145px'}}>Empresas</h1>
        <section className="section">
			<div className="container">
				<div className="row">
                   <ul>
                    <div className="content col-md-8">
                       <Companies companies={currentPosts} loading={loading}/>
                       <PaginationNumber postsPerPage={postPerPage} totalPosts={companies.length} paginate={paginate}/>
                   </div>
                <div className="sidebar col-md-4 col-sm-4">
                    <div className="widget clearfix">
                        <h4 className="widget-title">Buscar</h4>
                        <div className="newsletter-widget">
                            <p>Insira o nome do estabelecimento que você está procurando.</p>
                            <form className="form-inline" role="search">
                                <div className="form-1">
                                    <input type="text" className="form-control" placeholder="Insira o nome aqui..."/>
                                    <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="widget clearfix">
                        <h4 className="widget-title">Anúncios</h4>
                        <div className="category-widget">
                            <img src={anuncioImg} alt="" className="img-responsive img-thumbnail"/>
                        </div>
                    </div>
                </div>
                   </ul>
                </div>			
            </div>      
		</section>
        <Footer/>
    </div>
    </div>
    )
}