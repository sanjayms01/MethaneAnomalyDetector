import React, { Component } from 'react'

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (

            <header id="header" className="fixed-top d-flex align-items-center ">
              <div className="container d-flex align-items-center justify-content-between">
                {/* <a href="/"><img src="./MADLogo.svg"></img></a> */}
                <h1 className="logo"><a href="/">MAD</a></h1>
                {/* <!-- Uncomment below if you prefer to use an image logo --> */}
                {/* <a href="/" className="logo"><img src="./MADLogo.svg" alt="" className="img-fluid"></img></a> */}
                <nav id="navbar" className="navbar">
                  <ul>
                    <li><a className="nav-link scrollto active" style={{fontSize: 18}} href="/">Home</a></li>
                    <li><a className="nav-link scrollto" style={{fontSize: 18}} href="/model">Model</a></li>
                    {/* <li><a href="blog.html">Blog</a></li> */}
                    <li className="dropdown"><a style={{fontSize: 18}} href="/product"><span>Product</span> <i className="bi bi-chevron-down"></i></a>
                      <ul>
                        <li><a style={{fontSize: 16}} href="/product">Anomaly Detector</a></li>
                        <li><a style={{fontSize: 16}} href="/explore">Data Exploration </a></li>
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

