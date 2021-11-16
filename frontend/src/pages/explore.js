import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import ZoneTableGrid from '../components/zoneTableGrid';
import UserMap from '../components/userMap';
import Header from '../components/header';
import FeatureSelection from '../components/featureSelection'

// Scrollable sections
// https://www.emgoto.com/react-table-of-contents/

export default class Explore extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            vega_spec : {},
            selectedOptionTime: { value: 'methane', label: 'Methane' },
            selectedOptionBar: { value: 'reading_count', label: 'Reading Count' },
            formType: ''
        };
        
        this.get_zone_count_bar = this.get_zone_count_bar.bind(this);
        this.get_ft_dash = this.get_ft_dash.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectOnClick = this.handleSelectOnClick.bind(this);
    }

    componentWillMount() {

        console.log("Component Mounting");
        this.get_zone_count_bar();
        this.get_ft_dash();
        return true;
    }

    get_zone_count_bar = async () => {
        let request = 'http://184.169.234.135/zone_count_bar';
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            
            let {chart} = data;
            console.log('DATA RESP', chart);
            this.setState({vega_spec: chart});

            vegaEmbed('#zone_count_bar', this.state.vega_spec).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }

    get_ft_dash = async () => {
        let request = 'http://184.169.234.135/ft_dash';
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            
            let {chart} = data;
            console.log('DATA RESP', chart);
            this.setState({vega_spec: chart});

            vegaEmbed('#ft_dash', this.state.vega_spec).then(function(result) {
            }).catch(console.error);
        } catch (err) { console.log("error") }
    }

    handleSelect = (feature) => {
        if (this.state.formType == 'time') {
            this.setState({selectedOptionTime: feature});
        } else {
            this.setState({selectedOptionBar: feature});
        }
        console.log(this.state);
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
                            
                            <div id="zone_count_bar" className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                            </div>
                        </div>
                    </div>
                </section>

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
                                <div id='time_select' className="content">
                                    <h5>Line Chart</h5>
                                    <FeatureSelection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionTime}
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                        type='time'
                                    />
                                </div>
                            </div>
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up">
                                <div id='bar_select' className="content">
                                    <h5>Bar Chart</h5>
                                    <FeatureSelection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionBar}
                                        type = 'bar'
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                    />
                                </div>
                            </div>
                        </div>

                        <br/>
                        <div className="row">                            
                            <div className="col-lg-7 d-flex justify-content-center" data-aos="fade-up">
                                <div className="content">
                                    <div id="ft_dash"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>


                {/* Vista CA EDA*/}
                <section id="vista_ca" className="">
                    <div className="container-fluid">
                        
                        <div className="section-title">
                            <h2>Vista CA - Methane Emitters</h2>
                            <p>Understand the spread of known methane emitters in each climate zone</p>
                        </div>

                        <br/>
                        <div className="row">
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up">
                                <div id='vista_ca_choro' className="content">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}

