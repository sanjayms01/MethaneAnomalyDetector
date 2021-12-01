import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Loader from 'react-loader-spinner';

// Components
import AnomalyTableGrid from '../components/anomalyTableGrid';
import Header from '../components/header';
import AddressModal from '../components/addressModal';
import TweetCards from '../components/tweetCards';

// Scrollable sections
// https://www.emgoto.com/react-table-of-contents/

export default class Product extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            radioValue: "zone",
            isAnomalyDataFetching: false,
            isRecentLineFetching: false,
            isProductLineFetching: false,
            isMapFetching: false,
            isTweetsFetching: false,
            location: "",
            coordinates: {
                lat: null,
                lng: null
            },
            // ca_bottom_left: [], // fill this in
            // ca_top_right: [], // fill this in
            validAddress: null,
            showModal: false,
            anomaliesTable: [],
            numOfAnomalies: 0,
            methaneMap: {},
            tweetsData: {}
        };

        this.httpReq = 'http://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/';
        this.httpsReq = 'https://ec2-35-81-66-193.us-west-2.compute.amazonaws.com/';
        this.secure = false;

        this.handleShow = this.handleShow.bind(this);
        this.handleRadioValue = this.handleRadioValue.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.verifyLocation = this.verifyLocation.bind(this);

        // Charts
        this.fetch_anomaly_df = this.fetch_anomaly_df.bind(this);
        this.fetch_recent_line_chart = this.fetch_recent_line_chart.bind(this);
        this.fetch_product_line_chart= this.fetch_product_line_chart.bind(this);
        this.fetch_methane_map = this.fetch_methane_map.bind(this);

        // Twitter Methane Tweets
        this.fetch_recent_tweets = this.fetch_recent_tweets.bind(this);
    }

    componentDidMount() {
        this.handleShow();
        return true;
    }


    fetch_anomaly_df = async () => {
        this.setState({isAnomalyDataFetching: true});
        let queryDetails = `get_anomaly_df?zone=11`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {table} = data;
            // console.log('TABLE', table);
            table = JSON.parse(table);
            console.log("Fetch Anomaly DF", this.state);
            this.setState({anomaliesTable: table, isAnomalyDataFetching: false});
            // this.set(JSON FOR AG GRID HERE)

        } catch (err) { console.log("error") }
    }


    fetch_recent_line_chart = async () => {
        this.setState({isRecentLineFetching: true});
        let queryDetails = `get_recent_line_chart?zone=11`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({isRecentLineFetching: false});
            console.log("Fetch Recent Line", this.state, chart);
            vegaEmbed('#recent_line_chart', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }



    fetch_product_line_chart = async () => {
        this.setState({isProductLineFetching: true});
        let queryDetails = `get_product_line_chart?zone=11`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({isProductLineFetching: false});
            console.log("Fetch Product Line", this.state, chart);
            vegaEmbed('#product_line_chart', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }



    fetch_methane_map = async () => {
        this.setState({isMapFetching: true});
        let queryDetails = `get_methane_map?zone=11`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({methaneMap: chart, isMapFetching: false});
            console.log("Fetch Map", this.state, chart);
            vegaEmbed('#methane_map', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }

    fetch_recent_tweets = async () => {
        this.setState({isTweetsFetching: true});
        let queryDetails = `get_recent_tweets`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const tweetData = await response.json();
            let {data} = tweetData;
            console.log('Twitter Data', data);
            this.setState({tweetsData: data, isTweetsFetching: false});
            console.log("Fetch Tweets", this.state);
        } catch (err) { console.log("error") }
    }

    handleShow = () => {
        this.setState({
            showModal: true,
            location: "",
            radioValue: "zone",
            isAnomalyDataFetching: false,
            isRecentLineFetching: false,
            isProductLineFetching: false,
            isMapFetching: false,
            isTweetsFetching: false,
            validAddress: null
        });
    }

    handleRadioValue = radioValue => {
        console.log(radioValue.target.value);
        this.setState({ radioValue: radioValue.target.value });
    }

    handleTextChange = location => {
        this.setState({ location });
    }

    handleSelect = location => {
        if (typeof location === 'string' || location instanceof String) {
            console.log("Selected autocomplete: ", location);
            this.setState({ location });
        } //else {
        //     this.setState({selectedOption: location});

        //     if (location) {
        //         location = location.value;
        //         console.log("Selected box: ", location);
        //         this.setState({ location});
        //     }
        // }

        geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            console.log("Success", latLng);
            this.setState({ coordinates: latLng });
        })
        .catch(error => console.error("Error", error));
    }

    handleClose = () => {
        this.verifyLocation();

        if (!this.state.validAddress) {
            this.setState({showModal: false});
            this.fetch_anomaly_df();
            this.fetch_recent_line_chart();
            this.fetch_product_line_chart();
            this.fetch_methane_map();
            this.fetch_recent_tweets();
        } else {
            this.setState({showModal: true, location: "", validAddress: false});
        }
    }

    verifyLocation = async () => {
        // check if location is in CA
        let {lat, lng} = this.state.coordinates;
        let queryDetails = `get_location_check?lat=36&lng=-120`;
        let request = this.secure ? this.httpsReq + queryDetails : this.httpReq + queryDetails;
        console.log("REQUEST", request);

        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {locationInCA} = data;
            locationInCA = JSON.parse(locationInCA);
            this.setState({validAddress: locationInCA});
        } catch (err) { console.log("error") }
    }

    render() {
        return (
            <>
                <Header/>

                {
                    this.state.showModal == false  ? (
                        <>
                            {/* {
                                this.state.isAnomalyDataFetching || this.state.isRecentLineFetching || this.state.isProductLineFetching || this.state.isMapFetching || this.state.isTweetsFetching ? (<Loader
                                    type="Grid"
                                    color="#4AA0B5"
                                    height={100}
                                    width={100}
                                    timeout={20000} //20 secs
                                />) : (
                                    <> */}
                                        <section id="product" style={{height: 250}}>
                                            <div className="container-fluid" style={{marginTop: 60, justifyContent: 'center'}}>
                                                <div className="section-title">
                                                    <h2>Methane Anomaly Detector</h2>
                                                    <p>Locate your zone, understand its size, and the amount of data Sentinel 5P captures with respect to the zone.</p>
                                                </div>
                                            </div>
                                        </section>

                                        <section id="" style={{padding: 20}}>
                                            <div className="container-fluid" style={{justifyContent: 'center'}}>
                                                <div className="row">
                                                    <div className="col-md-4 d-flex" style={{justifyContent: 'space-evenly', width: '100%'}} data-aos="fade-up">
                                                        <div id='recent_line_chart' className="content"></div>
                                                        <div id='methane_map'></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section id="" style={{padding: 20, backgroundColor: '#C0DFCD'}}>
                                            <div className="container-fluid" style={{justifyContent: 'center'}}>
                                                <div className="row">
                                                    <div className="col-md-4 d-flex" style={{justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}} data-aos="fade-up">
                                                        <div style={{flexDirection: 'column', justifyContent: 'center'}}>
                                                            <div>
                                                                <h3>Methane Anomalies</h3>
                                                                <AnomalyTableGrid anomaliesTable={this.state.anomaliesTable} />
                                                            </div>
                                                            {/* <div style={{justifyContent: 'center'}}><Button variant="secondary" style={{width: 'auto'}} onClick="">Download Results</Button></div> */}
                                                        </div>
                                                        <div style={{border: '2px solid blue', width: 700, height: 300}}>
                                                            {/* <TweetCards tweetsData={this.tweetsData}/> */}
                                                            {/* {
                                                                this.tweetData ? (<TweetCards tweetsData={this.tweetsData}/>) : (<TweetCards tweetsData={this.tweetsData}/>)
                                                            } */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section id="" style={{padding: 20}}>
                                            <div className="container-fluid" style={{justifyContent: 'center'}}>
                                                <div className="row">
                                                    <div className="col-md-4 d-flex justify-content-center" style={{width: '100%'}} data-aos="fade-up">
                                                        <div id='product_line_chart' data-aos="fade-up"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                {/* </>
                                )
                            } */}
                        </>
                    ) : (<AddressModal
                            {...this.state}
                            handleRadioValue = {this.handleRadioValue}
                            handleSelect = {this.handleSelect}
                            handleTextChange = {this.handleTextChange}
                            handleClose = {this.handleClose}
                    />)
                }

            </>
        )
    }
}

