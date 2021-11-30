import React, { Component } from 'react'

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let activeTab  = window.location.pathname;
        return (

            <header id="header" className="fixed-top d-flex align-items-center ">
              <div className="container d-flex align-items-center justify-content-between">
                
                {/* <h1 className="logo" style={{fontFamily: 'comfort'}}><a href="/">mad</a></h1> */}

                {/* <!-- Uncomment below if you prefer to use an image logo --> */}
                <a href="/" class="logo"><img src="https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/2cf68f7fa452970e069cbdb072c303950d0bef0a/frontend/src/assets/img/MADLogoWhite.svg" style={{width: 110}} class="img-fluid"/></a>

                <nav id="navbar" className="navbar">
                  <ul>
                    <li><a className={(activeTab == '/') ? "nav-link scrollto active" : "nav-link scrollto"} style={{fontSize: 18}} href="/">Home</a></li>
                    <li><a className={(activeTab == '/model') ? "nav-link scrollto active" : "nav-link scrollto"} style={{fontSize: 18}} href="/model">Model</a></li>
                    <li className="dropdown"><a className={(activeTab == '/explore' || activeTab == '/product') ? "nav-link scrollto active" : "nav-link scrollto"} style={{fontSize: 18}} href="/product"><span>Product</span> <i className="bi bi-chevron-down"></i></a>
                      <ul>
                        <li><a style={{fontSize: 16}} href="/product">Anomaly Detector</a></li>
                        <li><a style={{fontSize: 16}} href="/explore">Data Explorer </a></li>
                        <li><a style={{fontSize: 16}} href="/dataDownload">Data Download </a></li>
                      </ul>
                    </li>
                  </ul>
                  <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
                {/* <!-- .navbar --> */}
              </div>
            </header>
        )
    }
}

