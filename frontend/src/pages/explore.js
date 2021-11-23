import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import ZoneTableGrid from '../components/zoneTableGrid';
import UserMap from '../components/userMap';
import Header from '../components/header';
import FeatureSelection from '../components/featureSelection'
import ResolutionSelection from '../components/resolutionSelection'
import FrequencySelection from '../components/frequencySelection'

// Scrollable sections
// https://www.emgoto.com/react-table-of-contents/

export default class Explore extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            vega_feature_dash: {},
            selectedOptionTime: { value: 'methane_mixing_ratio_bias_corrected_mean', label: 'Methane' },
            selectedOptionBar: { value: 'methane_mixing_ratio_bias_corrected_mean', label: 'Methane' },
            selectedOptionResolution: { value: 0.1, label: 0.1},
            selectedOptionFrequency: { value: '1D', label: '1D'},
            formType: '',
        };


        // Charts
        this.fetch_zone_count_bar = this.fetch_zone_count_bar.bind(this);
        this.fetch_feature_dashboard = this.fetch_feature_dashboard.bind(this);
        this.fetch_vista_ca_dashboard= this.fetch_vista_ca_dashboard.bind(this);
        this.fetch_missing_data_dashboard = this.fetch_missing_data_dashboard.bind(this);
        // this.fetch_missing_data_line = this.fetch_missing_data_line.bind(this);
        
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectOnClick = this.handleSelectOnClick.bind(this);
        this.handleGoClick = this.handleGoClick.bind(this);
    }
å
    componentWillMount() {

        console.log("Component Mounting");
        this.fetch_zone_count_bar();
        this.fetch_feature_dashboard();
        this.fetch_vista_ca_dashboard();
        // this.fetch_missing_data_line();
        this.fetch_missing_data_dashboard();
        return true;
    }

    fetch_zone_count_bar = async () => {
        let request = 'https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/get_bar_zone_split';
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            vegaEmbed('#bar_zone_split', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }

    fetch_feature_dashboard = async () => {

        let {selectedOptionTime, selectedOptionBar} = this.state;

        let request = `https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/get_feature_dashboard?tfeat=${selectedOptionTime.value}&bfeat=${selectedOptionBar.value}`;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;

            chart = JSON.parse(chart);
            this.setState({vega_feature_dash: chart});

            vegaEmbed('#feature_dashboard', this.state.vega_feature_dash).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }


    fetch_vista_ca_dashboard = async () => {
        let request = 'https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/get_vista_ca_dashboard';
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            vegaEmbed('#vista_ca_dashboard', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }


    fetch_missing_data_dashboard = async () => {

        let {selectedOptionResolution, selectedOptionFrequency} = this.state;

        let request = `https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/get_missing_data_dashboard?reso=${selectedOptionResolution.value}&freq=${selectedOptionFrequency.value}`;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            vegaEmbed('#missing_data_dashboard', chart).then(function(result) {
            }).catch(console.error);
        } catch (err) { console.log("error") }
    }


    fetch_missing_data_line = async () => {
        let request = 'https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/get_missing_data_line';
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            vegaEmbed('#missing_data_line', chart).then(function(result) {
            }).catch(console.error);
        } catch (err) { console.log("error") }
    }


    handleSelect = (feature) => {
        if (this.state.formType == 'time') {
            this.setState({selectedOptionTime: feature});
        } else if (this.state.formType == 'bar') {
            this.setState({selectedOptionBar: feature});
        } else if (this.state.formType == 'resolution') {
            this.setState({selectedOptionResolution: feature});
        }
        else {
            this.setState({selectedOptionFrequency: feature});
        }
        console.log(this.state);
    }

    handleGoClick = () => {
        console.log('GO CLICKED');
        if (this.state.formType == 'time' || this.state.formType == 'bar') {
            this.fetch_feature_dashboard();
        } else {
            this.fetch_missing_data_dashboard();
        }
    }

    handleSelectOnClick = (type) => {
        this.setState({formType: type});
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Header/>
                <h1>Data Exploration </h1>

                {/* Zone Meta Info */}
                <section id="zone_info" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Zone Details</h2>
                            <p>Locate your zone, understand its size, and the amount of data Sentinel 5p captures with respect to the zone.</p>
                        </div>

                        <div className="row">
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <div className="content">
                                <UserMap {...this.state}/>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <ZoneTableGrid/>
                            </div>
                            
                            <div id="bar_zone_split" className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                            </div>
                        </div>
                    </div>
                </section>
                <br/>
                <hr/>

                {/* Zone Feature Comparison  */}
                <section id="feature_compare" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Feature Comparison</h2>
                            <p>Compare and contrast trends across various zones with respect to key features of our model.</p>
                        </div>

                        <br/>
                        <div className="row">
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up">
                                <div id='bar_select' className="content">
                                    <h5>Plot 1</h5>
                                    <FeatureSelection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionBar}
                                        type = 'bar'
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                    />
                                </div>

                                <br/>
                                <div id='time_select' className="content">
                                    <h5>Plot 2</h5>
                                    <FeatureSelection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionTime}
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                        type='time'
                                    />
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={this.handleGoClick}>Go</button>
                                </div>
                            </div>
                        </div>

                        <br/>
                        <div className="row">                            
                            <div className="col-lg-12 d-flex justify-content-right" data-aos="fade-up">
                                <div className="content">
                                    <div id="feature_dashboard"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <br/>
                <hr/>


                {/* Missing Data */}
                <section id="missing_data" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Missing Data Analysis</h2>
                            <p>Explain why we had to shift to zone wise analysis, to minimize the percentage of missing data over time</p>
                        </div>
                        <br/>


                        <div className="row">
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up">
                                <div id='reso_select' className="content">
                                    <h5>Resolution</h5>
                                    <ResolutionSelection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionResolution}
                                        type = 'resolution'
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                    />
                                </div>

                                <br/>
                                <div id='freq_select' className="content">
                                    <h5>Frequency</h5>
                                    <FrequencySelection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionFrequency}
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                        type='frequency'
                                    />
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={this.handleGoClick}>Go</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 d-flex justify-content-right" data-aos="fade-up">
                                <div id="missing_data_dashboard"/>
                            </div>

                            {/* <div className="col-md-4 d-flex justify-content-right" data-aos="fade-up">
                                <div className="content">
                                    <div id="missing_data_line"/>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </section>
                <br/>
                <hr/>

                {/* Vista CA EDA*/}
                <section id="vista_ca" className="">
                    <div className="container-fluid">
                        
                        <div className="section-title">
                            <h2>Vista CA - Methane Emitters</h2>
                            <p>Understand the spread of known methane emitters in each climate zone</p>
                        </div>

                        <br/>
                        <div className="row">                            
                            <div className="col-lg-12 d-flex justify-content-right" data-aos="fade-up">
                                <div className="content">
                                    <div id="vista_ca_dashboard"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}

