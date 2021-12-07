import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

import Header from '../components/header';
import Footer from '../components/footer';
import TeamCards from '../components/teamCards';
import ScrollToTop from "react-scroll-to-top";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

          <div>
            <ScrollToTop smooth={true} />
            <Header/>
            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero" className="d-flex justify-cntent-center align-items-center">
              <div id="heroCarousel" data-bs-interval="5000" className="container carousel carousel-fade" data-bs-ride="carousel">

                {/* <!-- Slide 1 --> */}
                <div className="carousel-item active">
                  <div className="carousel-container">
                    <img src="https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/2cf68f7fa452970e069cbdb072c303950d0bef0a/frontend/src/assets/img/MADLogoWhite.svg" className="animate__animated animate__fadeInDown" style={{width: 500, height: 200}}></img>
                    <h2 className="animate__animated animate__fadeInDown"><span>Methane Anomaly Detector</span></h2>
                    {/* <h2 className="animate__animated animate__fadeInDown"><span><u>m</u>ethane <u>a</u>nomaly <u>d</u>etector</span></h2> */}
                    <p className="animate__animated animate__fadeInUp">Methane Anomaly Detector identifies potential methane emission anomalies in California using data from the Sentinel 5P satellite launched by the European Space Agency.</p>
                    <a href="#about" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- End Hero --> */}

            <main id="main">

              {/* <!-- ======= Icon Boxes Section ======= --> */}
              <section id="icon-boxes" className="icon-boxes">
                <div className="container">

                  <div className="row">
                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up">
                      <a href="#about">
                        <div className="icon-box" style={{width: 300, textAlign: 'center'}}>
                          <div className="icon"><i className="bx bx-target-lock" style={{fontSize: 100}}></i></div>
                          <h4 className="title">Our Mission</h4>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                      <a href="#why-us">
                        <div className="icon-box" style={{width: 300, textAlign: 'center'}}>
                          <div className="icon"><i className="bx bxs-slideshow" style={{fontSize: 100}}></i></div>
                          <h4 className="title">Product Demo</h4>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="200">
                      <a href="#services">
                        <div className="icon-box" style={{width: 300, textAlign: 'center'}}>
                          <div className="icon"><i className="bx bx-list-ul" style={{fontSize: 100}}></i></div>
                          <h4 className="title">Product Feature</h4>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="300">
                      <a href="#team">
                        <div className="icon-box" style={{width: 300, textAlign: 'center'}}>
                          <div className="icon"><i className="bx bxs-group" style={{fontSize: 100}}></i></div>
                          <h4 className="title">Our Team</h4>
                        </div>
                      </a>
                    </div>

                  </div>

                </div>
              </section>
              {/* <!-- End Icon Boxes Section --> */}

              {/* <!-- ======= Cta Section ======= --> */}
              <section id="cta" className="cta">
                <div className="container">

                  <div className="row" data-aos="zoom-in">
                    <div className="col-lg-9 text-center text-lg-start">
                      <h3>Our Mission</h3>
                      <p> We aim to assist local regulators and methane emitting facility owners in reducing the impact of harmful greenhouse gases.</p>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End Cta Section --> */}

              {/* <!-- ======= About Us Section ======= --> */}
              <section id="about" className="about" style={{borderTop:'1px solid black'}}>
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Motivation</h2>
                    {/* <p>We aim to assist local regulators and methane emitting facility owners in reducing the impact of harmful greenhouse gases.</p> */}
                  </div>

                  <div className="row content">
                    <div className="col-lg-6">
                      <p>
                      The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.
                      </p>
                      <ul>
                        <li><i className="ri-check-double-line"></i> The detection of large and frequent methane (CH4) leaks linked to oil and gas production has raised concerns in the ability of natural gas to effectively reduce greenhouse gas (GHG) emissions as a substitute to coal.</li>
                        <li><i className="ri-check-double-line"></i> A recent study by the Environmental Defense Fund found that 3.7% of natural gas produced in the Permian Basin leaked into the atmosphere. That’s enough to erase the greenhouse gas benefits of quitting coal for gas in the near term. </li>
                        <li><i className="ri-check-double-line"></i> Knowing when methane leaks occur is essential to reducing methane emissions, but frequent precise on ground methane measurement is expensive.</li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      {/* <p>
                      The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.
                      </p> */}
                      <ul>
                        <li><i className="ri-check-double-line"></i> MAD uses satellite data and deep learning to identify abnormal methane levels</li>
                        <li><i className="ri-check-double-line"></i> Local regulators and methane facility owners can use MAD to see when abnormal methane levels are detected in their region, so they can then kick off a more in depth investigation into possible causes.</li>
                      </ul>
                      <a href="#why-us" className="btn-learn-more">Learn More</a>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End About Us Section --> */}

              {/* <!-- ======= Clients Section ======= --> */}
              {/* <section id="clients" className="clients">
                <div className="container" data-aos="zoom-in">

                  <div className="clients-slider swiper">
                    <div className="swiper-wrapper align-items-center">
                      <div className="swiper-slide"><img src="assets/img/clients/client-1.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-2.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-3.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-4.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-5.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-6.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-7.png" className="img-fluid" alt=""></img></div>
                      <div className="swiper-slide"><img src="assets/img/clients/client-8.png" className="img-fluid" alt=""></img></div>
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>

                </div>
              </section> */}
              {/* <!-- End Clients Section --> */}

              {/* <!-- ======= Why Us Section ======= --> */}
              <section id="why-us" className="why-us" style={{padding: '60px 0', borderTop:'1px solid black'}}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-5 align-items-stretch position-relative video-box" style={{display: 'flex', width: '100%'}} data-aos="fade-in">
                      <div style={{display: 'flex', width: '50%', alignItems: 'center'}}><iframe width="100%" height="315" src="https://www.youtube.com/embed/BCk9QGSHMJ8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                      <div style={{display: 'flex', width: '50%', justifyContent: 'center', alignItems: 'center'}}><h2>Product Demo</h2></div>
                      {/* <a href="https://www.youtube.com/watch?v=LUjn3RpkcKY" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a> */}
                    </div>

                    {/* <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch" data-aos="fade-left"> */}

                      {/* <div className="content"> */}
                        {/* <h3>Product Demo</h3> */}
                        {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                        </p> */}
                      {/* </div> */}

                      {/* <div className="accordion-list">
                        <ul>
                          <li data-aos="fade-up" data-aos-delay="100">
                            <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1"><span>01</span> Non consectetur a erat nam at lectus urna duis? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">
                              <p>
                                Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                              </p>
                            </div>
                          </li>

                          <li data-aos="fade-up" data-aos-delay="200">
                            <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" className="collapsed"><span>02</span> Feugiat scelerisque varius morbi enim nunc? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-2" className="collapse" data-bs-parent=".accordion-list">
                              <p>
                                Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                              </p>
                            </div>
                          </li>

                          <li data-aos="fade-up" data-aos-delay="300">
                            <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" className="collapsed"><span>03</span> Dolor sit amet consectetur adipiscing elit? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-3" className="collapse" data-bs-parent=".accordion-list">
                              <p>
                                Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                              </p>
                            </div>
                          </li>

                        </ul>
                      </div> */}

                    {/* </div> */}

                  </div>

                </div>
              </section>
              {/* <!-- End Why Us Section --> */}

              {/* <!-- ======= Services Section ======= --> */}
              <section id="services" style={{borderTop:'1px solid black'}} className="services">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Product Features</h2>
                    {/* <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p> */}
                  </div>


                  <div className="row">
                    {/* <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                      <div className="icon-box">
                        <i className="bi bi-card-checklist"></i>
                        <h4><a href="#">Detection</a></h4>
                        <p>Anomaly identification and visualization</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                      <div className="icon-box">
                        <i className="bi bi-bar-chart"></i>
                        <h4><a href="#">Alerts</a></h4>
                        <p>Sign up to receive alerts with potential anomalies</p>
                      </div>
                    </div> */}
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box" style={{width: 700}}>
                        <i className="bi bi-exclamation-circle"></i>
                        <h4 style={{color: "#1D7044"}}>Anomaly Detection</h4>
                        <p>View our custom dashboard depicting methane anomalies through time</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box" style={{width: 700}}>
                        <i className="bi bi-graph-up"></i>
                        <h4 style={{color: "#1D7044"}}>Feature Insights</h4>
                        <p>Gain insights on trends of a variety of weather and methane features by exploring side-by-side visuals</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box" style={{width: 700}}>
                        <i className="bi bi-search"></i>
                        <h4 style={{color: "#1D7044"}}>Personalized Search</h4>
                        <p>Enter addresses to locate specific climate zones</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="400">
                      <div className="icon-box" style={{width: 700}}>
                        <i className="bi bi-arrow-clockwise"></i>
                        <h4 style={{color: "#1D7044"}}>Most Current Data</h4>
                        <p>Our product is regularly updated using the most recently available data from the Registry of Open Data on AWS</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="500">
                      <div className="icon-box" style={{width: 700}}>
                        <i className="bi bi-download"></i>
                        <h4 style={{color: "#1D7044"}}>Downloadable Data</h4>
                        <p>Download cleaned Sentinel 5P methane and ERA5 weather data for California to use for your own analysis</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="600">
                      <div className="icon-box" style={{width: 700}}>
                        <i className="bi bi-clipboard-data"></i>
                        <h4 style={{color: "#1D7044"}}>Custom Visual Selections</h4>
                        <p>Select, view, and download visuals for the locations, features, and time periods you are interested in</p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End Services Section --> */}

              {/* <!-- ======= Portfoio Section ======= --> */}
              {/* <section id="portfolio" className="portfoio">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Portfoio</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                      <ul id="portfolio-flters">
                        <li data-filter="*" className="filter-active">All</li>
                        <li data-filter=".filter-app">App</li>
                        <li data-filter=".filter-card">Card</li>
                        <li data-filter=".filter-web">Web</li>
                      </ul>
                    </div>
                  </div>

                  <div className="row portfolio-container">

                    <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                      <img src="assets/img/portfolio/portfolio-1.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>App 1</h4>
                        <p>App</p>
                        <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="App 1"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                      <img src="assets/img/portfolio/portfolio-2.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>Web 3</h4>
                        <p>Web</p>
                        <a href="assets/img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Web 3"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                      <img src="assets/img/portfolio/portfolio-3.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>App 2</h4>
                        <p>App</p>
                        <a href="assets/img/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="App 2"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                      <img src="assets/img/portfolio/portfolio-4.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>Card 2</h4>
                        <p>Card</p>
                        <a href="assets/img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Card 2"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                      <img src="assets/img/portfolio/portfolio-5.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>Web 2</h4>
                        <p>Web</p>
                        <a href="assets/img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Web 2"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                      <img src="assets/img/portfolio/portfolio-6.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>App 3</h4>
                        <p>App</p>
                        <a href="assets/img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="App 3"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                      <img src="assets/img/portfolio/portfolio-7.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>Card 1</h4>
                        <p>Card</p>
                        <a href="assets/img/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Card 1"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                      <img src="assets/img/portfolio/portfolio-8.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>Card 3</h4>
                        <p>Card</p>
                        <a href="assets/img/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Card 3"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                      <img src="assets/img/portfolio/portfolio-9.jpg" className="img-fluid" alt=""></img>
                      <div className="portfolio-info">
                        <h4>Web 3</h4>
                        <p>Web</p>
                        <a href="assets/img/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Web 3"><i className="bx bx-plus"></i></a>
                        <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                      </div>
                    </div>

                  </div>

                </div>
              </section> */}
              {/* <!-- End Portfoio Section --> */}

              {/* <!-- ======= Team Section ======= --> */}
              <section id="team" className="team section-bg" style={{paddingBottom: 0, borderTop:'1px solid black'}}>
                <TeamCards/>
                <br></br>
              </section>
              {/* <!-- End Team Section --> */}
              <br></br>
            </main>
            {/* <!-- End #main --> */}
            {/* <!-- ======= Footer ======= --> */}
            <Footer/>
            {/* <!-- End Footer --> */}
            {/* <div id="preloader"></div> */}
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
          </div>
        )
    }
}