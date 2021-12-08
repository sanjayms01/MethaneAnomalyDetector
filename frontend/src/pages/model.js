import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

import Header from '../components/header';
import ScrollToTop from "react-scroll-to-top";
import DataDownload from '../components/dataDownload';

export default class Model extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
        };
    }

    render() {
      return (
        <div>
          <ScrollToTop smooth={true}/>
          <Header/>
          {/* <!-- ======= Hero Section ======= --> */}
          <section id="hero" className="d-flex justify-cntent-center align-items-center" style={{height: 400}}>
            <div id="heroCarousel" data-bs-interval="5000" className="container carousel carousel-fade" data-bs-ride="carousel">

              {/* <!-- Slide 1 --> */}
              <div className="carousel-item active">
                <div className="carousel-container">
                  {/* <img src="./MADLogo.svg" className="animate__animated animate__fadeInDown" style={{width: 500, height: 200}}></img> */}
                  <h2 className="animate__animated animate__fadeInDown"><span>Model</span></h2>
                  <p className="animate__animated animate__fadeInUp">View details about the data, architecture, and performance of our deep learning model.</p>
                  <a href="#about" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- End Hero --> */}

          <main id="main">
            {/* <!-- ======= About Us Section ======= --> */}
            <section id="about" className="about" style={{marginTop: 20, backgroundColor: "#fff"}}>
              <div className="container" data-aos="fade-up">

                <div className="section-title">
                  <h2>Data</h2>
                </div>

                <div className="row content">
                  <div className="col-lg-6">
                    <p>
                    MAD uses data from the Sentinel 5P satellite, launched by the European Space Agency. Methane measurements are calculated by using spectral band measurements as inputs to a vetted algorithm. This data is reported daily with a resolution of 7 km x 5.5 km, covering the entire globe. Methane values are in parts per billion and are a normalized concentration over each column captured by the satellite. For more details on the Sentinel 5P satellite and its data, see <a href="https://sentinel.esa.int/web/sentinel/missions/sentinel-5p">here</a>.
                    </p>
                    <p>
                    Methane emission levels are known to be impacted by weather. MAD incorporates weather data from ERA5, created by the European Center for Medium-Range Weather Forecasts. The data is reported hourly and updated every 3 months for the entire globe at a resolution of 28 km x 28 km. For more details on the ERA5 data, see <a href="https://www.ecmwf.int/en/forecasts/datasets/reanalysis-datasets/era5">here</a>.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p>
                    To detect anomalies, MAD incorporates the following weather features:
                    </p>
                    <ul>
                      <li><i className="ri-check-double-line"></i> Sea Level Air Pressure</li>
                      <li><i className="ri-check-double-line"></i> Eastward Wind</li>
                      <li><i className="ri-check-double-line"></i> Northward Wind</li>
                      <li><i className="ri-check-double-line"></i> Air Temperature</li>
                      <li><i className="ri-check-double-line"></i> Surface Air Pressure</li>
                      <li><i className="ri-check-double-line"></i> Solar Radiation</li>
                      <li><i className="ri-check-double-line"></i> Precipitation</li>
                      <li><i className="ri-check-double-line"></i> Dew Point Temperature</li>
                    </ul>
                  </div>
                </div>
                <DataDownload dates={this.props.dates} keepTitle={true} borderStyle={{borderTop:'2px solid #11694E'}}/>

              </div>
            </section>
            {/* <!-- End About Us Section --> */}

            {/* <!-- ======= About Us Section ======= --> */}
            <section id="about" className="about model-bg" style={{marginTop: -70}}>
              <div className="container" data-aos="fade-up">

                <div className="section-title" style={{marginTop: -50}}>
                  <h2>Model Overview</h2>
                  {/* <p>We aim to assist local regulators and methane emitting facility owners in reducing the impact of harmful greenhouse gases.</p> */}
                </div>

                <div className="row content">
                  <div className="col-lg-6">
                    <p>
                    MAD uses a Long Short Term Memory (LSTM) autoencoder to detect anomalies. Autoencoders are a framework for neural networks that have proven to be effective at detecting anomalies in other time series scenarios, such as stocks, crime rates, and fraud detection.
                    </p>
                    <p>
                    Autoencoders take a high dimensional input, put it through a bottleneck, and then reconstruct the input as best as possible. The bottleneck, alongside various dense layers, will learn the latent representation of the input data. The goal is for the autoencoder to learn the signals and trends of the data it trains on.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p>
                    A threshold is set for reconstruction loss, which is the difference between the true value and the model's reconstructed value. Anomalies are identified when the reconstruction loss for an input is above the set threshold, as that indicates that the input does not follow the normal pattern of the data.
                    </p>
                    <p>
                    MAD has divided the state of California into regions based on building code regions. Each climate zone has a unique climatic condition that dictates which minimum efficiency requirements are needed for that specific climate zone. The climate zones are based on energy use, temperature, weather, and other factors. A model has been created for each region. <a href="https://www.pge.com/myhome/edusafety/workshopstraining/pec/toolbox/arch/climate/index.shtml">Click here</a> for more details on these climate zones.
                    </p>
                    <br /><br />
                  </div>

                  <img src="https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/2cf68f7fa452970e069cbdb072c303950d0bef0a/frontend/src/assets/img/diagrams/ModelDiagram.svg"></img>
                </div>

              </div>
            </section>
            {/* <!-- End About Us Section --> */}

            {/* <!-- ======= About Us Section ======= --> */}
            <section id="about" className="about" style={{backgroundColor: "#fff"}}>
              <div className="container" data-aos="fade-up">

                <div className="section-title" style={{marginTop: -50}}>
                  <h2>Performance</h2>
                  {/* <p>We aim to assist local regulators and methane emitting facility owners in reducing the impact of harmful greenhouse gases.</p> */}
                </div>

                <div className="row content">
                  <div className="col-lg-6">
                    {/* <p>
                    The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.
                    </p> */}
                    <ul>
                      <li><i className="ri-check-double-line"></i> Detecting methane anomalies is an unsupervised problem because there is no dataset with labeled anomalies or labeled methane leaks available to the public.</li>
                      <li><i className="ri-check-double-line"></i> The models are evaluated using the root mean square error (RMSE) of validation data, which indicates how well the autoencoder model can reconstruct the input data.</li>
                      <li><i className="ri-check-double-line"></i> The model is able to detect anomalies for a geographic region for a single day. It is clear from where many of these anomalies lie within the methane reading trends, that they are detected based on one or multiple days of distinctly low methane readings.</li>
                      <br /><img src="https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/7f0a22a9f73824febff812a115865f1abdb4dfa9/frontend/src/assets/img/diagrams/MethaneVisualization.svg" style={{width: 620}}></img><br /><br />
                      <li><i className="ri-check-double-line"></i> Although no anomalies are detected from when methane readings are distinctly high (which would indicate a leak), the results show that the model has the ability to do so.</li>
                      {/* <li><i className="ri-check-double-line"></i> Additionally, we do see that from the graph below our model does identify an anomaly when the methane levels are elevated.</li> */}
                      <li><i className="ri-check-double-line"></i> To further evaluate the models, anomaly detection is performed on a known methane leak outside of the domain of MAD, in Russia.</li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>
                      <li><i className="ri-check-double-line"></i> The MAD data pipeline is used to extract data in the area of the leak, but unfortunately only 200 data points are collected due to weather conditions that prevent the satellite from collecting data. That lack of an abundance of data has led to an unsuccessful detection of the leak, highlighting the need for more frequent collection of data.</li>
                      {/* <li><i className="ri-check-double-line"></i> Unfortunately our data for Russia was limited to only 200 data points and with a small amount of data and the fact that Russia has a very different climate from California, our model was not able to predict the anomalies at the time the methane leak was documented to have occurred.</li>
                      <li><i className="ri-check-double-line"></i> When predicting on the New Mexico data, our model was able to identify an anomaly that occurred close to the time when the actual methane leak was documented to have occurred, validating that our model can be successful in achieving its intended purpose.</li> */}
                    </ul>
                    <p>
                    The table below shows the RMSE for the best model for each zone.
                    </p>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Zone</th>
                          <th scope="col">Train RMSE</th>
                          <th scope="col">Validation RMSE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>0.7148</td>
                          <td>0.6035</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>0.6778</td>
                          <td>0.6195</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>0.6695</td>
                          <td>0.5930</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>0.6549</td>
                          <td>0.5816</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>0.6172</td>
                          <td>0.6612</td>
                        </tr>
                        <tr>
                          <th scope="row">6</th>
                          <td>0.6317</td>
                          <td>1.9263</td>
                        </tr>
                        <tr>
                          <th scope="row">7</th>
                          <td>0.6519</td>
                          <td>0.6765</td>
                        </tr>
                        <tr>
                          <th scope="row">8</th>
                          <td>0.6850</td>
                          <td>0.6332</td>
                        </tr>
                        <tr>
                          <th scope="row">9</th>
                          <td>0.6976</td>
                          <td>0.5981</td>
                        </tr>
                        <tr>
                          <th scope="row">10</th>
                          <td>0.6367</td>
                          <td>0.6937</td>
                        </tr>
                        <tr>
                          <th scope="row">11</th>
                          <td>0.6973</td>
                          <td>0.5853</td>
                        </tr>
                        <tr>
                          <th scope="row">12</th>
                          <td>0.6644</td>
                          <td>0.5887</td>
                        </tr>
                        <tr>
                          <th scope="row">13</th>
                          <td>0.7172</td>
                          <td>0.6370</td>
                        </tr>
                        <tr>
                          <th scope="row">14</th>
                          <td>0.6717</td>
                          <td>0.6095</td>
                        </tr>
                        <tr>
                          <th scope="row">15</th>
                          <td>0.6607</td>
                          <td>0.6729</td>
                        </tr>
                        <tr>
                          <th scope="row">16</th>
                          <td>0.7005</td>
                          <td>0.6226</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- End About Us Section --> */}

            {/* <!-- ======= About Us Section ======= --> */}
            <section id="about" className="about">
              <div className="container" data-aos="fade-up">

                <div className="section-title" style={{marginTop: -50}}>
                  <h2>Anomaly Analysis</h2>
                  {/* <p>We aim to assist local regulators and methane emitting facility owners in reducing the impact of harmful greenhouse gases.</p> */}
                </div>

                <div className="row content">
                  <div className="col-lg-6">
                    {/* <p>
                    The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.
                    </p> */}
                    <ul>
                      <li><i className="ri-check-double-line"></i> Unfortunately, because Sentinel 5P launched in late 2018 and many data values are missing either due to low quality measurements or no readings at all on certain days, the model does not have enough data to train on each precise location.</li>
                      <li><i className="ri-check-double-line"></i> This lack of data forced an adjustment of scope from the ideal granularity (0.1 latitude and longitude degree resolution, narrowing in on distinct areas) to an even more zoomed out view of California climate zones.</li>
                      <li><i className="ri-check-double-line"></i> It is not surprising that MAD could not detect specific leaks at the geographic range by averaging methane readings within each climate zone. Leaks often occur from a single facility causing a jump in methane level that would be dampened by all of the other space within the same climate zone that did not have a leak.</li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    {/* <p>
                    The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.
                    </p> */}
                    <ul>
                      <li><i className="ri-check-double-line"></i> It is important to note that other researchers also find this problem difficult. The leading company that does anomaly detection on methane has to manually verify each anomaly because this type of modeling is so complex.</li>
                      <li><i className="ri-check-double-line"></i> The data pipeline and MAD autoencoder framework is a strong foundation for tackling this problem when more frequent quality methane readings are available. It can and should be used on more granular areas when that data becomes available. Additionally, the MAD data pipeline can be applied to other geographic regions outside the state of California.</li>
                      <li><i className="ri-check-double-line"></i> Upcoming projects in the methane space like <a href="https://carbonmapper.org/">Carbon Mapper</a> will soon provide a more precise and accurate abundance of methane level data and will need a framework like ours to turn that sea of data into quick insights on where methane levels are anomalous and should be further examined.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>
            {/* <!-- End About Us Section --> */}

            {/* <!-- ======= About Us Section ======= --> */}
            <section id="about" className="about" style={{backgroundColor: "#fff"}}>
              <div className="container" data-aos="fade-up">

                <div className="section-title" style={{marginTop: -50}}>
                  <h2>Product Architecture</h2>
                  <p>Check out the infrastructure behind Methane Anomaly Dector.</p>
                </div>

                <div className="row content">
                  <img src="https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/021498d3fb521cfd8341ab5f0e5bc0267baf3ce7/frontend/src/assets/img/diagrams/product_architecture_final.svg"></img>
                  {/* <div className="col-lg-6">
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
                    <p>
                    The Environmental Protection Agency (EPA) estimates that methane is causing 25 times more damage to the atmosphere than carbon dioxide.
                    </p>
                    <ul>
                      <li><i className="ri-check-double-line"></i> MAD uses satellite data and deep learning to identify abnormal methane levels</li>
                      <li><i className="ri-check-double-line"></i> Local regulators and methane facility owners can use MAD to see when abnormal methane levels are detected in their region, so they can then kick off a more in depth investigation into possible causes.</li>
                    </ul>
                    <a href="#why-us" className="btn-learn-more">Learn More</a>
                  </div> */}
                </div>

              </div>
            </section>
            {/* <!-- End About Us Section --> */}

          </main>
          {/* <!-- End #main --> */}


          {/* <!-- ======= Footer ======= --> */}
          <footer id="footer">
            {/* <div className="footer-top"> */}
              {/* <div className="container">
                <div className="row" style={{justifyContent: 'center'}}> */}
                  {/* <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                    </ul>
                  </div> */}

                  {/* <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                    </ul>
                  </div> */}

                  {/* <div className="col-lg-3 col-md-6 footer-contact">
                    <h4 style={{textAlign: 'center'}}>Contact Us</h4>
                    <p>
                      <strong>Email:</strong> methaneanomalydetector@gmail.com<br/>
                    </p>
                    <p>
                      <strong>Project Repository:</strong> <a href="https://github.com/sanjayms01/methane.git">Github</a><br/>
                    </p>
                  </div> */}

                  {/* <div className="col-lg-3 col-md-6 footer-info">
                    <h3>About Anyar</h3>
                    <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                    <div className="social-links mt-3">
                      <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                      <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                      <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                      <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                      <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                  </div> */}

                {/* </div>
              </div>
            </div> */}

            <div className="container">
              <div className="copyright">
                &copy; Copyright <strong><span>Anyar</span></strong>. All Rights Reserved
              </div>
              <div className="credits">
                {/* <!-- All the links in the footer should remain intact. --> */}
                {/* <!-- You can delete the links only if you purchased the pro version. --> */}
                {/* <!-- Licensing information: https://bootstrapmade.com/license/ --> */}
                {/* <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/anyar-free-multipurpose-one-page-bootstrap-theme/ --> */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </footer>
          {/* <!-- End Footer --> */}

          {/* <div id="preloader"></div> */}
          <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>
      )
  }
}