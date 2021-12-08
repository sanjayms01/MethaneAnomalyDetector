import React, { Component } from 'react'
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
                    <p className="animate__animated animate__fadeInUp">Methane Anomaly Detector identifies potential methane emission anomalies in California using data from the Sentinel 5P satellite launched by the European Space Agency.</p>
                    <a href="#cta" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
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
                      <a href="#cta" className="icon-box-link">
                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-target-lock"></i></div>
                          <h4 className="title">Our Mission</h4>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                      <a href="#services" className="icon-box-link">
                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-list-ul"></i></div>
                          <h4 className="title">Product Features</h4>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="200">
                      <a href="#why-us" className="icon-box-link">
                        <div className="icon-box">
                          <div className="icon"><i className="bx bxs-slideshow"></i></div>
                          <h4 className="title">Product Demo</h4>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="300">
                      <a href="#team" className="icon-box-link">
                        <div className="icon-box">
                          <div className="icon"><i className="bx bxs-group"></i></div>
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
                <div className="container" data-aos="fade-up">
                  <div className="section-title">
                    <h2>Our Mission</h2>
                  </div>
                  <div className="p-box"><p> We aim to assist local regulators and methane-emitting facility owners in reducing the impact of harmful greenhouse gases.</p></div>
                </div>
              </section>
              {/* <!-- End Cta Section --> */}

              {/* <!-- ======= About Us Section ======= --> */}
              <section id="about" className="about" style={{backgroundColor: "#fff"}}>
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Motivation</h2>
                  </div>

                  <p>
                    The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.<sup><a href="https://www.epa.gov/gmi/importance-methane" target="_blank">[1]</a></sup>
                  </p>

                  <div className="row content">
                    <div className="col-lg-6">
                      <ul>
                        <li><i className="ri-check-double-line"></i> The detection of large and frequent methane (CH4) leaks linked to oil and gas production raises concerns in the ability of natural gas to effectively reduce greenhouse gas (GHG) emissions as a substitute to coal.<sup><a href="https://arxiv.org/pdf/2110.11832.pdf" target="_blank">[2]</a></sup></li>
                        <li><i className="ri-check-double-line"></i> A recent study by the Environmental Defense Fund finds that 3.7% of natural gas produced in the Permian Basin leaked into the atmosphere. That’s enough to erase the greenhouse gas benefits of converting from coal to gas in the near term.<sup><a href="https://www.scientificamerican.com/article/methane-leaks-erase-some-of-the-climate-benefits-of-natural-gas/" target="_blank">[3]</a></sup></li>
                        <li><i className="ri-check-double-line"></i> Knowing when methane leaks occur is essential to reducing methane emissions, but collecting frequent, precise, on-ground methane measurements is expensive.</li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li><i className="ri-check-double-line"></i> MAD uses satellite data and deep learning techniques to identify abnormal methane levels.</li>
                        {/* <li><i className="ri-check-double-line"></i> Local regulators and methane facility owners can use MAD to observe when abnormal methane levels are detected in their region, so they can then kick off more in-depth investigations into potential causes.</li> */}
                        <li><i className="ri-check-double-line"></i>  MAD enables local regulators and methane-emitting facility owners to identify abnormal methane levels in their region and kick off more in-depth investigations that aid in the reduction of harmful effects of methane.</li>
                      </ul>
                      <a href="#services" className="btn-learn-more">Learn More</a>
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- End About Us Section --> */}

              {/* <!-- ======= Services Section ======= --> */}
              <section id="services" className="services">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Product Features</h2>
                  </div>

                  <div className="row">
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box">
                        <i className="bi bi-exclamation-circle"></i>
                        <h4>Anomaly Detection</h4>
                        <p>View our custom dashboard depicting methane anomalies through time</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box">
                        <i className="bi bi-graph-up"></i>
                        <h4>Feature Insights</h4>
                        <p>Gain insights on trends of a variety of weather and methane features by exploring side-by-side visuals</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box">
                        <i className="bi bi-search"></i>
                        <h4>Personalized Search</h4>
                        <p>Enter addresses to locate specific climate zones and neighborhoods</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="400">
                      <div className="icon-box">
                        <i className="bi bi-arrow-clockwise"></i>
                        <h4>Most Current Data</h4>
                        <p>MAD is regularly updated using the most recently available data from the Registry of Open Data on Amazon Web Services (AWS)</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="500">
                      <div className="icon-box">
                        <i className="bi bi-download"></i>
                        <h4>Downloadable Data</h4>
                        <p>Download cleaned Sentinel 5P methane and ERA5 weather data for California to use for further analysis</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="600">
                      <div className="icon-box">
                        <i className="bi bi-clipboard-data"></i>
                        <h4>Custom Visual Selections</h4>
                        <p>Select, view, and download visuals for the locations, features, and time periods of interest</p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End Services Section --> */}

              {/* <!-- ======= Why Us Section ======= --> */}
              <section id="why-us" className="why-us">
                <div className="container">

                  <div className="row">
                    <div className="col-md-12 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box">
                        <div><h2>Product Walkthrough</h2></div><br/>
                        <div className="product-video"><iframe width="50%" height="315" src="https://www.youtube.com/embed/BCk9QGSHMJ8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- End Why Us Section --> */}

              {/* <!-- ======= Team Section ======= --> */}
              <section id="team" className="team section-bg">
                <TeamCards/>
              </section>
              {/* <!-- End Team Section --> */}

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