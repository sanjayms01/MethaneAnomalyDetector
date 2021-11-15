import React, { Component } from 'react'

export default class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
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
        )
    }
}

