import React, { Component } from 'react'

export default class PageDivider extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-1 d-flex justify-content-center" data-aos="fade-up">
                    <span class="dot"></span>
                </div>
                <div className="col-sm-1 d-flex justify-content-center" data-aos="fade-up">
                    <span class="dot"></span>
                </div>
                <div className="col-sm-1 d-flex justify-content-center" data-aos="fade-up">
                    <span class="dot"></span>
                </div>
                <div className="col-sm-1 d-flex justify-content-center" data-aos="fade-up">
                    <span class="dot"></span>
                </div>
                <div className="col-sm-1 d-flex justify-content-center" data-aos="fade-up">
                    <span class="dot"></span>
                </div>
            </div>
        )
    }
}

