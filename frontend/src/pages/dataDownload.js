import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components

import Header from '../components/header';
import Selection from '../components/selection'
export default class DataDownload extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            app_key: '',
            app_other_key: '',
        };
    }

    render() {

        let {start_dt, end_dt} = this.props.dates;
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                <section id="data_downloader" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Data Downloader</h2>
                            Choose your data, download away!
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}