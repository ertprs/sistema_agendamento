import React from 'react';

import logo from '../images/logo.png';
import fundoTela from '../upload/bg_04.jpg';
import imagemBannerEsquerda from '../upload/blog_alt_06.jpg';
import imagemBannerDireita from '../upload/blog_alt_01.jpg';

import '../css/font-awesome.min.css';
import '../css/bootstrap.min.css';
import '../css/animate.css';
import '../css/carousel.css';
import './style.css';

//import '../js/vendor/html5shiv.min.js';
//import '../js/vendor/respond.min.js';

export default function Initial(){
    return(
    <div>
            <header className="header site-header">
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
                                <a className="navbar-brand" href="index.html"><img src={logo} alt="Logo"/></a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="active"><a href="index.html">Home</a></li>
                                    <li className="dropdown yamm-fw hasmenu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Features <span className="fa fa-angle-down"></span></a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <div className="yamm-content">
                                                    <div className="row"> 
                                                        <div className="col-md-4">
                                                            <ul>
                                                                <li><a href="service-01.html">SEO Consultants</a></li>
                                                                <li><a href="service-02.html">SEO Audits</a></li>
                                                                <li><a href="service-03.html">SEO Packages e Plans</a></li>
                                                                <li><a href="service-04.html">Web Copywriting</a></li>
                                                                <li><a href="service-05.html">SEO Copywriting</a></li>
                                                                <li><a href="service-06.html">Keyword Research</a></li>
                                                                <li><a href="service-07.html">SEO Strategy</a></li>
                                                                <li><a href="service-08.html">Website Design</a></li>
                                                                <li><a href="service-09.html">Link Building Services</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <ul>
                                                                <li><a href="page-services.html">All Services</a></li>
                                                                <li><a href="page-pricing.html">Pricing e Plans</a></li>
                                                                <li><a href="page-clients.html">Our Clients</a></li>
                                                                <li><a href="page-testimonials.html">Testimonials</a></li>
                                                                <li><a href="page-ebooks.html">Free E-Books</a></li>
                                                                <li><a href="page-seo-analysis.html">SEO Analysis</a></li>
                                                                <li><a href="case-studies.html">Case Studies</a></li>
                                                                <li><a href="case-studies-alt.html">Case Studies Alt</a></li>
                                                                <li><a href="case-studies-single.html">Case Studies Single</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <ul>
                                                                <li><a href="blog.html">Blog e News</a></li>
                                                                <li><a href="blog-alt.html">Blog Alternative</a></li>
                                                                <li><a href="blog-single.html">Single Blog</a></li>
                                                                <li><a href="page.html">Default Page</a></li>
                                                                <li><a href="page-fullwidth.html">Fullwidth Page</a></li>
                                                                <li><a href="page-contact.html">Contact us</a></li>
                                                                <li><a href="page-contact-alt.html">Contact Alternative</a></li>
                                                                <li><a href="page-faqs.html">FAQ's Page</a></li>
                                                                <li><a href="page-not-found.html">404 Not Found</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="page-about.html">What is SEO?</a></li>
                                    <li><a href="case-studies.html">Case Studies</a></li>
                                    <li><a href="blog.html">Blog</a></li>
                                    <li><a href="page-contact.html">Contact</a></li>
                                    <li className="lastlink hidden-xs hidden-sm"><a className="btn btn-primary" href="page-seo-analysis.html"><i className="glyphicon glyphicon-search"></i> Login </a></li>
                                </ul>
                            </div> {/*<!--/.nav-collapse -->*/}
                        </div> {/*<!--/.container-fluid -->*/}
                    </nav> {/*<!-- end nav -->*/}
                </div> {/*<!-- end container -->*/}
            </header> {/*<!-- end header -->*/}

            <section className="section transheader homepage parallax" data-stellar-background-ratio="0.5" style={{backgroundImage: `url(${fundoTela})`}}>
			<div className="container">
				<div className="row">	
					<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
						<h2>Agende Logo</h2>
						<p className="lead">Agende seu horário de forma rápida e fácil sem sair de casa</p>
						<form className="calculateform">
						    <div className="item-box">
						        <div className="item-top form-inline">
						            <div className="form-group">
						                <div className="input-group2">
						                    <span className="input-addon">
												<i className="fa fa-map-o"></i>
											</span>
						                    <select className="form-control" id="urladres" name="url" >
                                                <option></option>
                                                <option>Penedo - AL</option>
                                            </select>
						                </div>
						            </div>
						            <input type="submit" name="send" value="Buscar" className="btn btn-default" style={{marginLeft:'10px'}} />
						        </div>
						    </div>
						</form>
					</div>{/*<!-- end col -->*/}
				</div>{/*<!-- end row -->*/}
			</div>{/*<!-- end container -->*/}
		</section>{/*<!-- end section -->*/}

        <section>
        <div class="container">
				<div class="section-title text-center">
					<small>Bem vindo ao agendamento fácil</small>
					<h3>Top Lorem ipsum pharetra</h3>
					<hr/>
					<p class="lead"> Lorem ipsum pharetra facilisis lobortis erat tempor fermentum quam habitant, <br/>Lorem ipsum pharetra facilisis lobortis erat tempor </p>
				</div>
        </div>
        </section>

        <section className="section lb nopad spotlight style1">
        
		    <div className="image col-md-4 hidden-sm hidden-xs">
		        <img src={imagemBannerEsquerda} alt="" />
		    </div>
		    <div className="content">
		        <h2>Be the leader in the sector</h2>
		        <p>Cras arcu sapien, maximus a accumsan at, iaculis nec nunc. Nullam ac ultricies velit, ut tincidunt tellus. Nunc nec sem at ante imperdiet tempor. Ut eu vulputate augue. Maecenas ultrices, arcu vel condimentum pharetra, diam eros mattis lectus, nec gravida sem erat nec orci. In dapibus ex eget arcu feugiat, non rhoncus enimpien id ligula sollicitudin fringilla ut id lacus. </p>
		         <a href="#" className="btn btn-transparent">Learn More</a>
		    </div>
		</section>
        
        <section className="section lb nopad spotlight style1">
		    <div className="content">
		        <h2>Protect place with detailed analysis</h2>
		        <p>Donec congue odio in mi finibus dignissim. Etiam faucibus pharetra euismod. Pellentesque malesuada et ligula et scelerisque. Pellentesque aliquet magna ut dolor consequat, luctus tincidunt metus consequat. Nam eu mattis ante, nec facilisis purus. Praesent ac venenatis erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tincidunt finibus.</p>
		         <a href="#" className="btn btn-transparent">Learn More</a>
		    </div>
		    <div className="image col-md-4 hidden-sm hidden-xs">
		        <img src={imagemBannerDireita} alt="" />
		    </div>
		</section>

        <footer className="footer primary-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                    	<div className="widget clearfix">
                    		<h4 className="widget-title">Subscribe</h4>
                    		<div className="newsletter-widget">
                    			<p>You can opt out of our newsletters at any time. See our privacy policy.</p>
		                        <form className="form-inline" role="search">
		                            <div className="form-1">
		                              	<input type="text" className="form-control" placeholder="Enter email here.."/>
										<button type="submit" className="btn btn-primary"><i className="fa fa-envelope-o"></i></button>
		                            </div>
								</form>
                    		</div>
                    	</div>
                    </div>
                    <div className="col-md-2 col-sm-2">
                    	<div className="widget clearfix">
                    		<h4 className="widget-title">Company</h4>
                    		<ul>
                    			<li><a href="#">About us</a></li>
                    			<li><a href="#">Carrier</a></li>
                    			<li><a href="#">Trademark</a></li>
                    			<li><a href="#">Contact</a></li>
                    		</ul>
                    	</div>
                    </div>

                    <div className="col-md-2 col-sm-2">
                    	<div className="widget clearfix">
                    		<h4 className="widget-title">Services</h4>
                    		<ul>
                    			<li><a href="#">Design & Dev</a></li>
                    			<li><a href="#">ASP.NET</a></li>
                    			<li><a href="#">PHP Development</a></li>
                    			<li><a href="#">Mobile App</a></li>
                    			<li><a href="#">Oracle</a></li>
                    		</ul>
                    	</div>
                    </div>

                    <div className="col-md-2 col-sm-2">
                    	<div className="widget clearfix">
                    		<h4 className="widget-title">Download</h4>
                    		<ul>
                    			<li><a href="#">MAC/OSX</a></li>
                    			<li><a href="#">Android</a></li>
                    			<li><a href="#">Windows</a></li>
                    			<li><a href="#">Google Play</a></li>
                    			<li><a href="#">Amazon</a></li>
                    		</ul>
                    	</div>
                    </div>

                    <div className="col-md-2 col-sm-2">
                    	<div className="widget clearfix">
                    		<h4 className="widget-title">Be Social</h4>
                    		<ul>
                    			<li><a href="#">Facebook</a></li>
                    			<li><a href="#">Twitter</a></li>
                    			<li><a href="#">Google+</a></li>
                    			<li><a href="#">Linkedin</a></li>
                    		</ul>
                    	</div>
                    </div>
                </div>
           	</div>
		</footer>

    </div> 
    )
}