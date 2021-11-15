import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './pages/home';
import Explore from './pages/explore';

import Swiper from "swiper";
import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';

import Aos from 'aos';


class App extends React.Component {

    /**
     * Initialize
     */
    constructor(props) {
        super(props);

        this.select = this.select.bind(this);
        this.on = this.on.bind(this);
        this.onscroll = this.onscroll.bind(this);
        this.navbarlinksActive = this.navbarlinksActive.bind(this);
        this.scrollto = this.scrollto.bind(this);

        this.navbarlinks = this.select('#navbar .scrollto', true);
        this.selectHeader = this.select('#header');
        this.selectTopbar = this.select('#topbar');
        this.backtotop = this.select('.back-to-top');
        this.preloader = this.select('#preloader');        

    }

    /**
     * Easy selector helper function
     */
    select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    /**
     * Easy event listener function
     */
    on = (type, el, listener, all = false) => {
      let selectEl = this.select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }

    /**
     * Easy on scroll event listener 
     */
    onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }

    navbarlinksActive = () => {
      let position = window.scrollY + 200
      this.navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = this.select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }


    /**
     * Scrolls to an element with header offset
     */
    scrollto = (el) => {
      let header = this.select('#header')
      let offset = header.offsetHeight

      if (!header.classList.contains('fixed-top')) {
        offset += 70
      }

      let elementPos = this.select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }


    /**
     * Render components
     */
    render() {

        /**
         * Navbar links active state on scroll
         */
        window.addEventListener('load', this.navbarlinksActive)
        this.onscroll(document, this.navbarlinksActive)


        /**
         * Header fixed top on scroll
         */
        if (this.selectHeader) {
          const headerScrolled = () => {
            if (window.scrollY > 100) {
              this.selectHeader.classList.add('header-scrolled')
              if (this.selectTopbar) {
                this.selectTopbar.classList.add('topbar-scrolled')
              }
            } else {
              this.selectHeader.classList.remove('header-scrolled')
              if (this.selectTopbar) {
                this.selectTopbar.classList.remove('topbar-scrolled')
              }
            }
          }
          window.addEventListener('load', headerScrolled)
          this.onscroll(document, headerScrolled)
        }
    
        /**
          * Back to top button
          */
        if (this.backtotop) {
          const toggleBacktotop = () => {
            if (window.scrollY > 100) {
              this.backtotop.classList.add('active')
            } else {
              this.backtotop.classList.remove('active')
            }
          }
          window.addEventListener('load', toggleBacktotop)
          this.onscroll(document, toggleBacktotop)
        }

        /**
         * Mobile nav toggle
         */
        this.on('click', '.mobile-nav-toggle', function(e) {
          this.select('#navbar').classList.toggle('navbar-mobile')
          this.classList.toggle('bi-list')
          this.classList.toggle('bi-x')
        })

        /**
         * Mobile nav dropdowns activate
         */
        this.on('click', '.navbar .dropdown > a', function(e) {
          if (this.select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
          }
        }, true)

        /**
         * Scrool with ofset on links with a class name .scrollto
         */
        this.on('click', '.scrollto', function(e) {
          if (this.select(this.hash)) {
            e.preventDefault()

            let navbar = this.select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
              navbar.classList.remove('navbar-mobile')
              let navbarToggle = this.select('.mobile-nav-toggle')
              navbarToggle.classList.toggle('bi-list')
              navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
          }
        }, true)

        /**
         * Scroll with ofset on page load with hash links in the url
         */
        window.addEventListener('load', () => {
          if (window.location.hash) {
            if (this.select(window.location.hash)) {
              scrollto(window.location.hash)
            }
          }
        });

        /**
         * Preloader
         */
        if (this.preloader) {
          window.addEventListener('load', () => {
            this.preloader.remove()
          });
        }
    
        /**
          * Clients Slider
          */
        new Swiper('.clients-slider', {
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          breakpoints: {
            320: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 60
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 80
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 120
            }
          }
        });
    
        /**
          * Porfolio isotope and filter
          */
        window.addEventListener('load', () => {
          let portfolioContainer = this.select('.portfolio-container');
          if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
              itemSelector: '.portfolio-item',
              layoutMode: 'fitRows'
            });
    
            let portfolioFilters = this.select('#portfolio-flters li', true);
    
            this.on('click', '#portfolio-flters li', function(e) {
              e.preventDefault();
              portfolioFilters.forEach(function(el) {
                el.classList.remove('filter-active');
              });
              this.classList.add('filter-active');
    
              portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
              });
              portfolioIsotope.on('arrangeComplete', function() {
                Aos.refresh()
              });
            }, true);
          }
    
        });
    
        /**
          * Initiate portfolio lightbox 
          */
        const portfolioLightbox = GLightbox({
          selector: '.portfolio-lightbox'
        });
    
        /**
          * Portfolio details slider
          */
        new Swiper('.portfolio-details-slider', {
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        });
    
        /**
          * Animation on scroll
          */
        window.addEventListener('load', () => {
          Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
          })
        });


        return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route path="/explore" render={props => <Explore {...props} />} />
            </Switch>
          </BrowserRouter>
        );
    }
}

/**
 * Default export
 */
export default App;