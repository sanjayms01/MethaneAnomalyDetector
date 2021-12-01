import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import Header from '../components/header';
import Selection from '../components/selection';

import Select from 'react-select';
export default class DataDownload extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            downloadResolution: { value: 0.1, label: 0.1},
            downloadFrequency: { value: '1D', label: '1 Day'},
            formType: '',
        };

        this.resoOptions = [
            { value: 0.1, label: '0.1' },
            { value: 0.2, label: '0.2' },
            { value: 0.5, label: '0.5' },
            { value: 1.0, label: '1.0' }
        ];

        this.freqOptions = [
            { value: '1D', label: '1 Day' },
            { value: '3D', label: '3 Day' },
            { value: '5D', label: '5 Day' },
            { value: '7D', label: '7 Day' },
            { value: '10D', label: '10 Day' },
        ];

        this.zones = [
            { value: '1', label: '1 - Arcata' },
            { value: '2', label: '2 - Santa Rosa' },
            { value: '3', label: '3 - Oakland'},
            { value: '4', label: '4 - San Jose-Reid' },
            { value: '5', label: '5 - Santa Maria' },
            { value: '6', label: '6 - Torrance' },
            { value: '7', label: '7 - San Diego' },
            { value: '8', label: '8 - Fullerton' },
            { value: '9', label: '9 - Burbank' },
            { value: '10', label: '10 - Riverside' },
            { value: '11', label: '11 - Red Bluff' },
            { value: '12', label: '12 - Sacramento' },
            { value: '13', label: '13 - Fresno' },
            { value: '14', label: '14 - Palmdale' },
            { value: '15', label: '15 - Palm Springs' },
            { value: '16', label: '16 - Blue Canyon' }
        ];

        this.handleGoClickDD = this.handleGoClickDD.bind(this);
        this.handleSelectOnClickDD = this.handleSelectOnClickDD.bind(this);
        this.handleSelectDD = this.handleSelectDD.bind(this);
    }


    handleGoClickDD = () => {
        console.log("handleGoClickDD");
    }

    handleSelectOnClickDD = (type) => {
        this.setState({formType: type});
    }

    handleSelectDD = (feature) => {
        if (this.state.formType == 'reso') {
            this.setState({downloadResolution: feature});
        } else {
            this.setState({downloadFrequency: feature});
        }
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
                    <div className="row justify-content-center" style={{height:420}}>
                        <div className="col-md-7 justify-content-center" data-aos="fade-up" >
                            <div className="content" data-aos="fade-up">
                                <h5>Resolution:</h5>
                                <Selection
                                    {...this.props}
                                    selectedOption = {this.state.downloadResolution}
                                    type = 'reso'
                                    handleSelect = {this.handleSelectDD}
                                    onOpen = {this.handleSelectOnClickDD}
                                    options={this.resoOptions}
                                />
                            </div>
                            <br/>
                            <div className="content" data-aos="fade-up">
                                <h5>Frequency:</h5>
                                <Selection
                                    {...this.props}
                                    selectedOption = {this.state.downloadFrequency}
                                    handleSelect = {this.handleSelectDD}
                                    onOpen = {this.handleSelectOnClickDD}
                                    type='freq'
                                    options={this.freqOptions}
                                />
                            </div>
                            <br/>
                            <div className="content" data-aos="fade-up">
                                <h5>Zone:</h5>
                                <Select
                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    options={this.zones}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                            <br/>
                            <button type="button" className="btn btn-primary" onClick={this.handleGoClickDD}>Download</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}