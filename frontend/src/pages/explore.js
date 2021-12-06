import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import ZoneTableGrid from '../components/zoneTableGrid';
import UserMap from '../components/userMap';
import Header from '../components/header';
import Selection from '../components/selection'
import Glossary from '../components/glossary';

import ScrollToTop from "react-scroll-to-top";
import Loader from 'react-loader-spinner';

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
            isFetchingMissing: false

        };

        this.featureOptions = [
            { value: 'methane_mixing_ratio_bias_corrected_mean', label: 'Methane' },
            { value: 'air_temperature_at_2_metres_mean', label: 'Air Temperature'},
            { value: 'dew_point_temperature_at_2_metres_mean', label: 'Dew Point Temperature'},
            { value: 'eastward_wind_at_100_metres_mean', label: 'Eastward Wind'},
            { value: 'northward_wind_at_100_metres_mean', label: 'Northward Wind'},
            { value: 'precipitation_amount_1hour_Accumulation_mean', label: 'Precipitation'},
            { value: 'reading_count', label: 'Reading Count' },
            { value: 'air_pressure_at_mean_sea_level_mean', label: 'Sea Level Air Pressure'},
            { value: 'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean', label: 'Solar Radiation'},
            { value: 'surface_air_pressure_mean', label: 'Surface Air Pressure'}
          ];

        this.resolutionOptions = [
            { value: 0.1, label: '0.1' },
            { value: 0.2, label: '0.2' },
            { value: 0.5, label: '0.5' },
            { value: 1.0, label: '1.0' },
            { value: 'Zone', label: 'Zone' }
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
        this.fetch_zone_count_bar();
        this.fetch_feature_dashboard();
        this.fetch_vista_ca_dashboard();
        this.fetch_missing_data_line();
        this.fetch_missing_data_dashboard();
        return true;
    }

    fetch_zone_count_bar = async () => {
        let request = this.props.secure ? this.props.httpsReq + 'get_bar_zone_split' : this.props.httpReq + 'get_bar_zone_split';
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
        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;

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
        let request = this.props.secure ? this.props.httpsReq + 'get_vista_ca_dashboard' : this.props.httpReq + 'get_vista_ca_dashboard';
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
        this.setState({isFetchingMissing: true});
        let {selectedOptionResolution, selectedOptionFrequency} = this.state;
        let queryDetails = `get_missing_data_dashboard?reso=${selectedOptionResolution.value}&freq=${selectedOptionFrequency.value}`;
        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;

        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({isFetchingMissing: false});
            vegaEmbed('#missing_data_dashboard', chart).then(function(result) {
            }).catch(console.error);
        } catch (err) { console.log("error") }
    }


    fetch_missing_data_line = async () => {
        let request = this.props.secure ? this.props.httpsReq + 'get_missing_data_line' : this.props.httpReq + 'get_missing_data_line';
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
    }

    handleGoClick = () => {
        if (this.state.formType == 'time' || this.state.formType == 'bar') {
            this.fetch_feature_dashboard();
        } else {
            this.fetch_missing_data_dashboard();
        }
    }

    handleSelectOnClick = (type) => {
        this.setState({formType: type});
    }
    render() {
        let {start_dt, end_dt} = this.props.dates;
        return (
            <>
                <ScrollToTop smooth={true} />
                <Header/>
                <br/>
                <br/>
                <section id="data_explorer_intro" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Data Explorer</h2>
                            Data Explorer allows users to derive insights by diving into various facets of the data. The dataset built here is a unique synthesis of time series data streams from <a href='https://registry.opendata.aws/sentinel5p/' target='_blank'> Sentinel 5P</a>, <a href='https://registry.opendata.aws/ecmwf-era5/' target='_blank'> ERA 5</a>, and <a href="https://cecgis-caenergy.opendata.arcgis.com/datasets/CAEnergy::california-building-climate-zones/about" target='_blank'> Vista CA</a>.
                            The interactive charts showcased here are built to help supplement contextual understanding of methane emissions in CA with regards to each climate zone. 
                            In addition we hope to highlight the difficulties in data collection and explain why modelling each climate zone was a sensible choice.
                        </div>
                        <em className="d-flex justify-content-evenly">Data Coverage: {start_dt} - {end_dt}</em>
                    </div>
                </section>

                {/* Climate Zone Details */}
                <section id="climate_zone_details" style={{backgroundColor: '#C0DFCD'}}>
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Climate Zone Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <div className="content">
                                    <p><b>1.</b> Locate your climate zone. <em>(Zoom and Drag)</em></p>
                                    <UserMap {...this.state}/>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <div className="content">
                                    <p><b>2.</b> Compare zone land area. <em>(Sort with header)</em></p>
                                    <ZoneTableGrid/>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <div className="content">
                                    <p><b>3.</b> Compare zone contribution to Sentinel 5P readings. <em>(Hover)</em></p> 
                                    <div id="bar_zone_split"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Data Comparison  */}
                <section id="data_comparison">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Data Comparison</h2>
                            <p>Compare and contrast various climate zones with regards to their trends in methane emissions and weather. Discover the behavior of each time series input variable provided to the anomaly detection models.</p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="row justify-content-center">
                            <Glossary featureOptions = {this.featureOptions}/>
                            <div className="col-md-5 justify-content-evenly" data-aos="fade-up" >
                                <p>
                                    <h4>Instructions:</h4>
                                    <p>These steps explain how to interact with the chart below after selecting the variables you'd like to plot.</p>
                                    <ul>
                                        <li><b>Hover</b> 
                                            <ul>
                                                <li>Over any of the charts to get a tooltip describing that chart segment.</li>
                                            </ul>
                                        </li>
                                        <li><b>Select</b>
                                            <ul>
                                                <li>One zone by clicking on a point in <em>Zone Selector</em>.</li>
                                                <li>Multiple zones by holding <em>SHIFT</em> while clicking on multiple points in <em>Zone Selector</em>.</li>
                                                <li>Selection can also be done on <em>Plot 1</em>.</li>
                                            </ul>
                                        </li>
                                        <li><b>Click and Drag</b>
                                            <ul>
                                                <li>On <em>Plot 2</em> click and drag to select a time interval.</li>
                                                <li>There will now be a highlighted time interval present.</li>
                                                <li>Click and drag the highlighted time interval across time to see its effect on <em>Plot 1</em>.</li>
                                            </ul>
                                        </li>

                                        <li><em>NOTE - Interactions can be combined to compare specific zones over time</em></li>
                                    </ul>
                                    Please refer to our tutorial video <a href='https://www.youtube.com/watch?v=rSVWuCop15g' target='_blank'> here</a> for an in-depth walkthrough.
                                </p>
                                <hr/>
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

                        </div>
                        <br/><br/>
                        <div className="d-flex justify-content-center" id='feature_dashboard' data-aos="fade-up"></div>
                    </div>
                </section>

                {/* Missing Data */}
                <section id="missing_data" style={{backgroundColor: '#C0DFCD'}}>
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Missing Data</h2>
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
                        <div className="row justify-content-center">
                            {
                                    this.state.isFetchingMissing ? (
                                    <div className="col-md-7 d-flex justify-content-center" style={{alignItems: 'center'}}>
                                        <Loader
                                            type="Grid"
                                            color="#11694E"
                                            height={200}
                                            width={200}
                                            timeout={20000} //20 secs
                                        />
                                    </div>
                                    ) : (
                                        <div className="col-md-7 d-flex justify-content-right">
                                            <div id='left_miss_side' className="content">
                                                <div id="missing_data_dashboard" style={{height:600}}/>
                                                <hr/>
                                                <div id='miss_selections' className="content">
                                                    <div className='row' id='left_row'> 
                                                        <div className="col-md-5 d-flex justify-content-evenly">
                                                                <h5>Resolution:</h5>
                                                                <Selection
                                                                    {...this.props}
                                                                    selectedOption = {this.state.selectedOptionResolution}
                                                                    type = 'resolution'
                                                                    handleSelect = {this.handleSelect}
                                                                    onOpen = {this.handleSelectOnClick}
                                                                    options={this.resolutionOptions}
                                                                />
                                                        </div>
                                                        <div className="col-md-5 d-flex justify-content-evenly"> 
                                                                <h5>Frequency:</h5>
                                                                <Selection
                                                                    {...this.props}
                                                                    selectedOption = {this.state.selectedOptionFrequency}
                                                                    handleSelect = {this.handleSelect}
                                                                    onOpen = {this.handleSelectOnClick}
                                                                    type='frequency'
                                                                    options={this.frequencyOptions}
                                                                />
                                                        </div>
                                                        <div className="col-md-1 d-flex justify-content-evenly">
                                                            <button type="button" className="btn btn-primary" onClick={this.handleGoClick}>Plot</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            <div className="col-md-4 d-flex justify-content-right" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                                <div className='row'>
                                    <div id='term_desc' className="content">
                                        <h4>Resolution</h4>
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
                                        <hr/>
                                        <h4>Frequency</h4>
                                        <p>
                                            <p>
                                                Frequency describes the temporal granularity of averaging data for what we would consider a single <b>unit of time</b>.
                                                Toggling the frequency will change the unit of time for which we average data points.
                                            </p>
                                            Below we describe the frequency, and how many units of time over the span of <b>{start_dt} - {end_dt}</b>.
                                            <br/>
                                            <ul>
                                                <li>1 Day --&gt; 1038 units of time</li>
                                                <li>3 Day --&gt; 346 units of time</li>
                                                <li>5 Day --&gt; 207 units of time</li>
                                                <li>7 Day --&gt; 148 units of time</li>
                                                <li>10 Day --&gt; 103 units of time</li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vista CA EDA*/}
                <section id="vista_ca" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Methane Emitters</h2>
                            <p>Explore and identify the distribution of known methane emitting facilities in each climate zone</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <ul>
                                <li><b>Hover</b> 
                                    <ul>
                                        <li>Over any of the charts to get a tooltip providing details.</li>
                                    </ul>
                                </li>
                                <li><b>Select</b>
                                    <ul>
                                        <li>Click on any tile on the <em>Heatmap</em> to highlight a zone .</li>
                                        <li>Click on multiple tiles by holding <em>SHIFT</em> while clicking on multiple tiles on the <em>Heatmap</em></li>
                                        <li>Click on a bar in <em>Facility Count Breakdown</em> to highlight a facility type.</li>
                                        <li>Selection/Multi-Selection can be done on <em>Facility Count Breakdown</em> and <em>Total Facility Counts</em>.</li>
                                    </ul>
                                </li>
                            </ul>
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

