import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import ZoneTableGrid from '../components/zoneTableGrid';
import UserMap from '../components/userMap';
import Header from '../components/header';
import Selection from '../components/selection'
import Glossary from '../components/glossary';
import PageDivider from '../components/pageDivider';

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
            selectedOptionFrequency: { value: '1D', label: '1 Day'},
            formType: '',

        };
        this.httpReq = 'http://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/';
        this.httpsReq = 'https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/';
        this.secure = true;

        this.featureOptions = [
            { value: 'methane_mixing_ratio_bias_corrected_mean', label: 'Methane' },
            { value: 'reading_count', label: 'Reading Count' },
            { value: 'air_pressure_at_mean_sea_level_mean', label: 'Sea Level Air Pressure'},
            { value: 'eastward_wind_at_100_metres_mean', label: 'Eastward Wind'},
            { value: 'northward_wind_at_100_metres_mean', label: 'Northward Wind'},
            { value: 'air_temperature_at_2_metres_mean', label: 'Air Temperature'},
            { value: 'surface_air_pressure_mean', label: 'Surface Air Pressure'},
            { value: 'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean', label: 'Solar Radiation'},
            { value: 'precipitation_amount_1hour_Accumulation_mean', label: 'Precipitation'},
            { value: 'dew_point_temperature_at_2_metres_mean', label: 'Dew Point Temperature'},
          ];

        this.resolutionOptions = [
            { value: 0.1, label: '0.1' },
            { value: 0.2, label: '0.2' },
            { value: 0.5, label: '0.5' },
            { value: 1.0, label: '1.0' }
        ];

        this.frequencyOptions = [
            { value: '1D', label: '1 Day' },
            { value: '3D', label: '3 Day' },
            { value: '5D', label: '5 Day' },
            { value: '7D', label: '7 Day' },
            { value: '10D', label: '10 Day' },
        ];

        // Charts
        this.fetch_zone_count_bar = this.fetch_zone_count_bar.bind(this);
        this.fetch_feature_dashboard = this.fetch_feature_dashboard.bind(this);
        this.fetch_vista_ca_dashboard= this.fetch_vista_ca_dashboard.bind(this);
        this.fetch_missing_data_dashboard = this.fetch_missing_data_dashboard.bind(this);
        this.fetch_missing_data_line = this.fetch_missing_data_line.bind(this);

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
        this.fetch_missing_data_line();
        this.fetch_missing_data_dashboard();
        return true;
    }

    fetch_zone_count_bar = async () => {
        let request = this.secure ? this.httpsReq + 'get_bar_zone_split' : this.httpReq + 'get_bar_zone_split';
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

        let queryDetails = `get_feature_dashboard?tfeat=${selectedOptionTime.value}&bfeat=${selectedOptionBar.value}`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;

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
        let request = this.secure ? this.httpsReq + 'get_vista_ca_dashboard' : this.httpReq + 'get_vista_ca_dashboard';
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

        let queryDetails = `get_missing_data_dashboard?reso=${selectedOptionResolution.value}&freq=${selectedOptionFrequency.value}`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;

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
        let request = this.secure ? this.httpsReq + 'get_missing_data_line' : this.httpReq + 'get_missing_data_line';
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
                <br/>
                <br/>
                <section id="data_exploration_intro" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Data Exploration</h2>
                            <p>THE GOAL OF THIS SECTION IS TO INFORM AND EMPOWER OUR USERS TO LEARN ABOUT METHANE</p>
                        </div>
                    </div>
                </section>
                {/* <hr/> */}
                {/* Climate Zone Details */}
                <section id="climate_zone_details" style={{backgroundColor: '#C0DFCD'}}>
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Climate Zone Details</h2>
                            <p>Locate your climate zone to understand its size and contribution towards the amount of methane readings captured by Sentinel 5P. <em>(Nov 2018 - Sept 2021)</em>. Learn more about CA Climate Zones <a href="https://cecgis-caenergy.opendata.arcgis.com/datasets/CAEnergy::california-building-climate-zones/about">here</a>.</p>
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
                            <div id="bar_zone_split" className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up"/>
                        </div>
                    </div>
                </section>
                {/* <hr/> */}


                {/* Data Comparison  */}
                <section id="data_comparison">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Data Comparison</h2>
                            <p>Compare and contrast trends across various climate zones. Discover the nature of each time series input variable provided to the anomaly detection model.</p>
                        </div>
                        <br/>
                        <div className="row justify-content-center">
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                                <div id='bar_select' className="content">
                                    <h4>Plot 1</h4>
                                    <Selection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionBar}
                                        type = 'bar'
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                        options = {this.featureOptions}
                                    />
                                </div>
                                <br/>
                                <div id='time_select' className="content">
                                    <h4>Plot 2</h4>
                                    <Selection
                                        {...this.props}
                                        selectedOption = {this.state.selectedOptionTime}
                                        handleSelect = {this.handleSelect}
                                        onOpen = {this.handleSelectOnClick}
                                        type='time'
                                        options={this.featureOptions}
                                    />
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={this.handleGoClick}>Compare</button>
                                </div>
                            </div>
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                                <Glossary selectedOptionBar = {this.state.selectedOptionBar} selectedOptionTime = {this.state.selectedOptionTime}/>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row justify-content-right">
                            <div className="content">
                                <div className="col-lg-12 d-flex justify-content-right" id='feature_dashboard' data-aos="fade-up"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <hr/> */}

                {/* Missing Data */}
                <section id="missing_data" style={{backgroundColor: '#C0DFCD'}}>
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Missing Data Analysis</h2>
                            <p>Dive deeper into the challenges faced when working with the data collected by Sentinel 5P across California.</p>
                        </div>
                        <br/>

                        <div className="row justify-content-center">
                            <div className="col-md-7 d-flex justify-content-right" data-aos="fade-up">
                                <div id="missing_data_line"/>
                            </div>
                            <div className="col-md-4 d-flex justify-content-right" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                                <div className="col-lg-10">
                                    <p> 
                                        Attaining high quality public data for methane emissions has proven extremeley difficult. Even after parsing hundreds of gigabytes of daily data dumps from Sentinel 5P
                                        when performing a deeper analysis we learned that most of our time series data was still missing. The line chart to the left highlights the percent of missing data over
                                        time at different resolutions. These resolutions allow us to group geo-spatial regions and average the reading values. More on this below.
                                    </p>
                                    <br></br>
                                    <p> Our goal is to minimize percent of missing data, by choosing higher resolutions we are able to average across more raw latitude, longitude pairs which achieves
                                        better data coverage over time. We can see that the <b>1.0</b> resolution and <b>zone level</b> resolution are comparable, due to the known unique trends and patterns
                                        across climate zones we chose to train models partitioned by each climate zone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        {/* <PageDivider/> */}
                        <br/>
                        <div className="row justify-content-center">
                            <div className="col-md-7 d-flex justify-content-right" data-aos="fade-up">
                                <div id="missing_data_dashboard"/>
                            </div>
                            <div className="col-md-4 d-flex justify-content-right" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                                <div className='row'>
                                    <div id='reso_select' className="content">
                                        <h4>Resolution</h4>
                                        <Selection
                                            {...this.props}
                                            selectedOption = {this.state.selectedOptionResolution}
                                            type = 'resolution'
                                            handleSelect = {this.handleSelect}
                                            onOpen = {this.handleSelectOnClick}
                                            options={this.resolutionOptions}
                                        />
                                        <br/>
                                        <p>
                                            <p>
                                                Resolution describes the spatial granularity of rounding applied to the <em>latitude</em> and <em>longitude</em>.
                                                Toggling the resolution will shift the map to reflect the number of unique geo locations. All reading values are grouped in this way 
                                                and averaged by time unit.
                                            </p>
                                            <b>Example:</b> 
                                            <p>38.28813° Latitude</p>
                                            <ul>
                                                <li>0.1 Resolution --&gt; 38.3° Latitude</li>
                                                <li>0.2 Resolution --&gt; 38.2° Latitude</li>
                                                <li>0.5 Resolution --&gt; 38.5° Latitude</li>
                                                <li>1.0 Resolution --&gt; 38.0° Latitude</li>
                                            </ul>
                                        </p>
                                    </div>
                                    <div id='freq_select' className="content">
                                        <h4>Frequency</h4>
                                        <Selection
                                            {...this.props}
                                            selectedOption = {this.state.selectedOptionFrequency}
                                            handleSelect = {this.handleSelect}
                                            onOpen = {this.handleSelectOnClick}
                                            type='frequency'
                                            options={this.frequencyOptions}
                                        />
                                        <br/>
                                        <p>
                                            <p>
                                                Frequency describes the temporal granularity of averaging data for what we would consider a single <b>unit of time</b>.
                                                Toggling the frequency will change the unit of time for which we average data points.
                                            </p>
                                            
                                            Below we describe the frequency, and how many units of time over the span of <b>Nov 2018 - Sept 2021</b>.
                                            <ul>
                                                <li>1 Day --&gt; 1038 units of time</li>
                                                <li>3 Day --&gt; 346 units of time</li>
                                                <li>5 Day --&gt; 207 units of time</li>
                                                <li>7 Day --&gt; 148 units of time</li>
                                                <li>10 Day --&gt; 103 units of time</li>
                                            </ul>
                                        </p>
                                        <button type="button" className="btn btn-primary" onClick={this.handleGoClick}>Plot</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <hr/> */}

                {/* Vista CA EDA*/}
                <section id="vista_ca" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Methane Emitters</h2>
                            <p>Explore and identify the distribution of known methane emitters in each climate zone</p>
                        </div>
                        <br/>

                        <div className="row justify-content-right">                            
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

