import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

export default class Home extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            vega_spec : {},
        };
    }

    render() {
        return (
          <div>

            {/* <!-- ======= Top Bar ======= --> */}
            <div id="topbar" className="fixed-top d-flex align-items-center ">
              <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center">
                  <i className="bi bi-envelope-fill"></i><a href="mailto:contact@example.com">info@example.com</a>
                  <i className="bi bi-phone-fill phone-icon"></i> +1 5589 55488 55
                </div>
                <div className="cta d-none d-md-block">
                  <a href="#about" className="scrollto">Get Started</a>
                </div>
              </div>
            </div>

            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="fixed-top d-flex align-items-center ">
              <div className="container d-flex align-items-center justify-content-between">

                <h1 className="logo"><a href="index.html">Anyar</a></h1>
                {/* <!-- Uncomment below if you prefer to use an image logo --> */}
                {/* <!-- <a href=index.html" className="logo"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>--> */}

                <nav id="navbar" className="navbar">
                  <ul>
                    <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                    <li><a className="nav-link scrollto" href="#about">About</a></li>
                    <li><a className="nav-link scrollto" href="#services">Services</a></li>
                    <li><a className="nav-link scrollto " href="#portfolio">Portfolio</a></li>
                    <li><a className="nav-link scrollto" href="#team">Team</a></li>
                    <li><a className="nav-link scrollto" href="#pricing">Pricing</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                      <ul>
                        <li><a href="#">Drop Down 1</a></li>
                        <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                          <ul>
                            <li><a href="#">Deep Drop Down 1</a></li>
                            <li><a href="#">Deep Drop Down 2</a></li>
                            <li><a href="#">Deep Drop Down 3</a></li>
                            <li><a href="#">Deep Drop Down 4</a></li>
                            <li><a href="#">Deep Drop Down 5</a></li>
                          </ul>
                        </li>
                        <li><a href="#">Drop Down 2</a></li>
                        <li><a href="#">Drop Down 3</a></li>
                        <li><a href="#">Drop Down 4</a></li>
                      </ul>
                    </li>
                    <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                  </ul>
                  <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
                {/* <!-- .navbar --> */}

              </div>
            </header>
            {/* <!-- End Header --> */}

            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero" className="d-flex justify-cntent-center align-items-center">
              <div id="heroCarousel" data-bs-interval="5000" className="container carousel carousel-fade" data-bs-ride="carousel">

                {/* <!-- Slide 1 --> */}
                <div className="carousel-item active">
                  <div className="carousel-container">
                    <h2 className="animate__animated animate__fadeInDown">Welcome to <span>Anyar</span></h2>
                    <p className="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                    <a href="#about" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
                  </div>
                </div>

                {/* <!-- Slide 2 --> */}
                <div className="carousel-item">
                  <div className="carousel-container">
                    <h2 className="animate__animated animate__fadeInDown">Lorem Ipsum Dolor</h2>
                    <p className="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                    <a href="#about" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
                  </div>
                </div>

                {/* <!-- Slide 3 --> */}
                <div className="carousel-item">
                  <div className="carousel-container">
                    <h2 className="animate__animated animate__fadeInDown">Sequi ea ut et est quaerat</h2>
                    <p className="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                    <a href="#about" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
                  </div>
                </div>

                <a className="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
                </a>

                <a className="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                  <span className="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
                </a>

              </div>
            </section>
            {/* <!-- End Hero --> */}

            <main id="main">

              {/* <!-- ======= Icon Boxes Section ======= --> */}
              <section id="icon-boxes" className="icon-boxes">
                <div className="container">

                  <div className="row">
                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up">
                      <div className="icon-box">
                        <div className="icon"><i className="bx bxl-dribbble"></i></div>
                        <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                        <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                      <div className="icon-box">
                        <div className="icon"><i className="bx bx-file"></i></div>
                        <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
                        <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="200">
                      <div className="icon-box">
                        <div className="icon"><i className="bx bx-tachometer"></i></div>
                        <h4 className="title"><a href="">Magni Dolores</a></h4>
                        <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box">
                        <div className="icon"><i className="bx bx-layer"></i></div>
                        <h4 className="title"><a href="">Nemo Enim</a></h4>
                        <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                      </div>
                    </div>

                  </div>

                </div>
              </section>
              {/* <!-- End Icon Boxes Section --> */}

              {/* <!-- ======= About Us Section ======= --> */}
              <section id="about" className="about">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>About Us</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>

                  <div className="row content">
                    <div className="col-lg-6">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <ul>
                        <li><i className="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
                        <li><i className="ri-check-double-line"></i> Duis aute irure dolor in reprehenderit in voluptate velit</li>
                        <li><i className="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0">
                      <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <a href="#" className="btn-learn-more">Learn More</a>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End About Us Section --> */}

              {/* <!-- ======= Clients Section ======= --> */}
              <section id="clients" className="clients">
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
              </section>
              {/* <!-- End Clients Section --> */}

              {/* <!-- ======= Why Us Section ======= --> */}
              <section id="why-us" className="why-us">
                <div className="container-fluid">

                  <div className="row">

                    <div className="col-lg-5 align-items-stretch position-relative video-box" style={{backgroundImage: "assets/img/why-us.jpg"}} data-aos="fade-right">
                      <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
                    </div>

                    <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch" data-aos="fade-left">

                      <div className="content">
                        <h3>Eum ipsam laborum deleniti <strong>velit pariatur architecto aut nihil</strong></h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                        </p>
                      </div>

                      <div className="accordion-list">
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
                      </div>

                    </div>

                  </div>

                </div>
              </section>
              {/* <!-- End Why Us Section --> */}

              {/* <!-- ======= Services Section ======= --> */}
              <section id="services" className="services">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Services</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>


                  <div className="row">
                    <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                      <div className="icon-box">
                        <i className="bi bi-card-checklist"></i>
                        <h4><a href="#">Lorem Ipsum</a></h4>
                        <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                      <div className="icon-box">
                        <i className="bi bi-bar-chart"></i>
                        <h4><a href="#">Dolor Sitema</a></h4>
                        <p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="icon-box">
                        <i className="bi bi-binoculars"></i>
                        <h4><a href="#">Sed ut perspiciatis</a></h4>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="400">
                      <div className="icon-box">
                        <i className="bi bi-brightness-high"></i>
                        <h4><a href="#">Nemo Enim</a></h4>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="500">
                      <div className="icon-box">
                        <i className="bi bi-calendar4-week"></i>
                        <h4><a href="#">Magni Dolore</a></h4>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="600">
                      <div className="icon-box">
                        <i className="bi bi-briefcase"></i>
                        <h4><a href="#">Eiusmod Tempor</a></h4>
                        <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End Services Section --> */}

              {/* <!-- ======= Cta Section ======= --> */}
              <section id="cta" className="cta">
                <div className="container">

                  <div className="row" data-aos="zoom-in">
                    <div className="col-lg-9 text-center text-lg-start">
                      <h3>Call To Action</h3>
                      <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="col-lg-3 cta-btn-container text-center">
                      <a className="cta-btn align-middle" href="#">Call To Action</a>
                    </div>
                  </div>

                </div>
              </section>
              {/* <!-- End Cta Section --> */}

              {/* <!-- ======= Portfoio Section ======= --> */}
              <section id="portfolio" className="portfoio">
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
              </section>
              {/* <!-- End Portfoio Section --> */}

              {/* <!-- ======= Team Section ======= --> */}
              <section id="team" className="team section-bg">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Team</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>

                  <div className="row">

                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                      <div className="member d-flex align-items-start">
                        <div className="pic"><img src="assets/img/team/team-1.jpg" className="img-fluid" alt=""></img></div>
                        <div className="member-info">
                          <h4>Walter White</h4>
                          <span>Chief Executive Officer</span>
                          <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
                          <div className="social">
                            <a href=""><i className="ri-twitter-fill"></i></a>
                            <a href=""><i className="ri-facebook-fill"></i></a>
                            <a href=""><i className="ri-instagram-fill"></i></a>
                            <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="200">
                      <div className="member d-flex align-items-start">
                        <div className="pic"><img src="assets/img/team/team-2.jpg" className="img-fluid" alt=""></img></div>
                        <div className="member-info">
                          <h4>Sarah Jhonson</h4>
                          <span>Product Manager</span>
                          <p>Aut maiores voluptates amet et quis praesentium qui senda para</p>
                          <div className="social">
                            <a href=""><i className="ri-twitter-fill"></i></a>
                            <a href=""><i className="ri-facebook-fill"></i></a>
                            <a href=""><i className="ri-instagram-fill"></i></a>
                            <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mt-4" data-aos="fade-up" data-aos-delay="300">
                      <div className="member d-flex align-items-start">
                        <div className="pic"><img src="assets/img/team/team-3.jpg" className="img-fluid" alt=""></img></div>
                        <div className="member-info">
                          <h4>William Anderson</h4>
                          <span>CTO</span>
                          <p>Quisquam facilis cum velit laborum corrupti fuga rerum quia</p>
                          <div className="social">
                            <a href=""><i className="ri-twitter-fill"></i></a>
                            <a href=""><i className="ri-facebook-fill"></i></a>
                            <a href=""><i className="ri-instagram-fill"></i></a>
                            <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mt-4" data-aos="fade-up" data-aos-delay="400">
                      <div className="member d-flex align-items-start">
                        <div className="pic"><img src="assets/img/team/team-4.jpg" className="img-fluid" alt=""></img></div>
                        <div className="member-info">
                          <h4>Amanda Jepson</h4>
                          <span>Accountant</span>
                          <p>Dolorum tempora officiis odit laborum officiis et et accusamus</p>
                          <div className="social">
                            <a href=""><i className="ri-twitter-fill"></i></a>
                            <a href=""><i className="ri-facebook-fill"></i></a>
                            <a href=""><i className="ri-instagram-fill"></i></a>
                            <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </section>
              {/* <!-- End Team Section --> */}

              {/* <!-- ======= Pricing Section ======= --> */}
              <section id="pricing" className="pricing">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Pricing</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>

                  <div className="row">

                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                      <div className="box">
                        <h3>Free</h3>
                        <h4><sup>$</sup>0<span> / month</span></h4>
                        <ul>
                          <li>Aida dere</li>
                          <li>Nec feugiat nisl</li>
                          <li>Nulla at volutpat dola</li>
                          <li className="na">Pharetra massa</li>
                          <li className="na">Massa ultricies mi</li>
                        </ul>
                        <div className="btn-wrap">
                          <a href="#" className="btn-buy">Buy Now</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                      <div className="box featured">
                        <h3>Business</h3>
                        <h4><sup>$</sup>19<span> / month</span></h4>
                        <ul>
                          <li>Aida dere</li>
                          <li>Nec feugiat nisl</li>
                          <li>Nulla at volutpat dola</li>
                          <li>Pharetra massa</li>
                          <li className="na">Massa ultricies mi</li>
                        </ul>
                        <div className="btn-wrap">
                          <a href="#" className="btn-buy">Buy Now</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="300">
                      <div className="box">
                        <h3>Developer</h3>
                        <h4><sup>$</sup>29<span> / month</span></h4>
                        <ul>
                          <li>Aida dere</li>
                          <li>Nec feugiat nisl</li>
                          <li>Nulla at volutpat dola</li>
                          <li>Pharetra massa</li>
                          <li>Massa ultricies mi</li>
                        </ul>
                        <div className="btn-wrap">
                          <a href="#" className="btn-buy">Buy Now</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                      <div className="box">
                        <span className="advanced">Advanced</span>
                        <h3>Ultimate</h3>
                        <h4><sup>$</sup>49<span> / month</span></h4>
                        <ul>
                          <li>Aida dere</li>
                          <li>Nec feugiat nisl</li>
                          <li>Nulla at volutpat dola</li>
                          <li>Pharetra massa</li>
                          <li>Massa ultricies mi</li>
                        </ul>
                        <div className="btn-wrap">
                          <a href="#" className="btn-buy">Buy Now</a>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </section>
              {/* <!-- End Pricing Section --> */}

              {/* <!-- ======= Frequently Asked Questions Section ======= --> */}
              <section id="faq" className="faq section-bg">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Frequently Asked Questions</h2>
                  </div>

                  <div className="faq-list">
                    <ul>
                      <li data-aos="fade-up" data-aos="fade-up" data-aos-delay="100">
                        <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">Non consectetur a erat nam at lectus urna duis? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                          <p>
                            Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                          </p>
                        </div>
                      </li>

                      <li data-aos="fade-up" data-aos-delay="200">
                        <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2" className="collapsed">Feugiat scelerisque varius morbi enim nunc? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                          <p>
                            Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                          </p>
                        </div>
                      </li>

                      <li data-aos="fade-up" data-aos-delay="300">
                        <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3" className="collapsed">Dolor sit amet consectetur adipiscing elit? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                          <p>
                            Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                          </p>
                        </div>
                      </li>

                      <li data-aos="fade-up" data-aos-delay="400">
                        <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-4" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                          <p>
                            Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.
                          </p>
                        </div>
                      </li>

                      <li data-aos="fade-up" data-aos-delay="500">
                        <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-5" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                          <p>
                            Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                          </p>
                        </div>
                      </li>

                    </ul>
                  </div>

                </div>
              </section>
              {/* <!-- End Frequently Asked Questions Section --> */}

              {/* <!-- ======= Contact Section ======= --> */}
              <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">

                  <div className="section-title">
                    <h2>Contact Us</h2>
                  </div>

                  <div className="row mt-1 d-flex justify-content-end" data-aos="fade-right" data-aos-delay="100">

                    <div className="col-lg-5">
                      <div className="info">
                        <div className="address">
                          <i className="bi bi-geo-alt"></i>
                          <h4>Location:</h4>
                          <p>A108 Adam Street, New York, NY 535022</p>
                        </div>

                        <div className="email">
                          <i className="bi bi-envelope"></i>
                          <h4>Email:</h4>
                          <p>info@example.com</p>
                        </div>

                        <div className="phone">
                          <i className="bi bi-phone"></i>
                          <h4>Call:</h4>
                          <p>+1 5589 55488 55s</p>
                        </div>

                      </div>

                    </div>

                    <div className="col-lg-6 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="100">

                      <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required/>
                          </div>
                          <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required/>
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
                        </div>
                        <div className="form-group mt-3">
                          <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                        </div>
                        <div className="my-3">
                          <div className="loading">Loading</div>
                          <div className="error-message"></div>
                          <div className="sent-message">Your message has been sent. Thank you!</div>
                        </div>
                        <div className="text-center"><button type="submit">Send Message</button></div>
                      </form>

                    </div>

                  </div>

                </div>
              </section>
              {/* <!-- End Contact Section --> */}

            </main>
            {/* <!-- End #main --> */}


            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer">
              <div className="footer-top">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 footer-links">
                      <h4>Useful Links</h4>
                      <ul>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                      </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 footer-links">
                      <h4>Our Services</h4>
                      <ul>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                      </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 footer-contact">
                      <h4>Contact Us</h4>
                      <p>
                        A108 Adam Street <br/>
                        New York, NY 535022<br/>
                        United States <br/>
                        <strong>Phone:</strong> +1 5589 55488 55<br/>
                        <strong>Email:</strong> info@example.com<br/>
                      </p>

                    </div>

                    <div className="col-lg-3 col-md-6 footer-info">
                      <h3>About Anyar</h3>
                      <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                      <div className="social-links mt-3">
                        <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                        <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                        <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                        <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                        <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

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