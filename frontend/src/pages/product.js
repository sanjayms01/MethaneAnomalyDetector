import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

// Components
import AnomalyTableGrid from '../components/anomalyTableGrid';
import ZoneTableGrid from '../components/zoneTableGrid';
import UserMap from '../components/userMap';
import Header from '../components/header';
import AddressModal from '../components/addressModal';
import FeatureSelection from '../components/featureSelection'

// Scrollable sections
// https://www.emgoto.com/react-table-of-contents/

export default class Product extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            radioValue: "custom",
            location: "",
            coordinates: {
                lat: null,
                lng: null
            },
            ca_bottom_left: [], // fill this in
            ca_top_right: [], // fill this in
            validAddress: null,
            selectedOption: null,
            showModal: false,
            lineChart3Months: {},
            choroMap: {},
            lineChartFull: {},
            anomaliesTable: [],
            numOfAnomalies: 0
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleRadioValue = this.handleRadioValue.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getProductVisuals = this.getProductVisuals.bind(this);
    }

    componentDidMount() {
        this.handleShow();
        return true;
    }

    handleShow = () => {
        this.setState({
            showModal: false,
            location: "",
            radioValue: "custom",
            selectedOption: null,
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
        } else {
            this.setState({selectedOption: location});

            if (location) {
                location = location.value;
                console.log("Selected box: ", location);
                this.setState({ location});
            }
        }

        geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            console.log("Success", latLng);
            this.setState({ coordinates: latLng });
        })
        .catch(error => console.error("Error", error));
    }

    handleClose = () => {
        let {lat, lng} = this.state.coordinates;
        if (this.isInCalifornia([lng, lat])) {
            this.setState({showModal: false, validAddress: true});
            this.getProductVisuals();
        } else {
            this.setState({showModal: true, location: "", validAddress: false});
        }
    }

    isInCalifornia(user_point) {
        let { ca_bottom_left, ca_top_right} = this.state;

        if (user_point[0] > ca_bottom_left[0] && user_point[0] < ca_top_right[0] && user_point[1] > ca_bottom_left[1] && user_point[1] < ca_top_right[1]) {
            return true;
        }
        return false;
    }

    getProductVisuals = async () => {
        let request = 'http://35.81.66.193:8080/product-visuals'
        console.log("REQUEST", request);
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {lineChart3Months, choroMap, lineChartFull, anomaliesTable, numOfAnomalies, fail} = data;

            if (fail) {
                this.setState({numOfAnomalies: fail});
            } else {
                this.setState({
                    numOfAnomalies,
                    anomaliesTable,
                    lineChart3Months: JSON.parse(lineChart3Months),
                    choroMap: JSON.parse(choroMap),
                    lineChartFull: JSON.parse(lineChartFull)
                });

                vegaEmbed('#lineChart3Months', this.state.lineChart3Months).then(function(result) {
                }).catch(console.error);
                vegaEmbed('#choroMap', this.state.choroMap).then(function(result) {
                }).catch(console.error);
                vegaEmbed('#lineChartFull', this.state.lineChartFull).then(function(result) {
                }).catch(console.error);
            }
        } catch (err) { console.log("error") }
    }

    render() {
        return (
            <>
                <Header/>

                {
                    this.state.showModal == false ? (
                        <>
                            {/* <section style={{marginTop: 20, width: 700}}>
                                <h1>Methane Anomaly Detector</h1>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                            </section> */}

                            {/* <section>
                                <div className="container-fluid">
                                    <div className="section-title">
                                        <h2>Methane Anomaly Detector</h2>
                                        <p>Locate your zone, understand its size, and the amount of data Sentinel 5p captures with respect to the zone.</p>
                                    </div>
                                </div>
                            </section> */}

                            <section id="" className="">
                                <div className="container-fluid" style={{marginTop: 60, justifyContent: 'center'}}>
                                    <div className="section-title">
                                        <h2>Methane Anomaly Detector</h2>
                                        <p>Locate your zone, understand its size, and the amount of data Sentinel 5p captures with respect to the zone.</p>
                                    </div>

                                    <div className="row" style={{justifyContent: 'center'}}>
                                        <div className="col-md-4 d-flex justify-content-evenly" style={{width: 1200, height: 500}} data-aos="fade-up">
                                            <div className="content" style={{width: 550, height: 500, border: '2px solid red'}}>
                                                Line Chart
                                            </div>
                                            <div className="d-flex" style={{flexDirection: 'column'}} data-aos="fade-up">
                                                <div className="content" style={{width: 500, height: 250, border: '2px solid green'}}>
                                                    Map
                                                </div>
                                                <ZoneTableGrid />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 d-flex" style={{flexDirection: 'column'}} data-aos="fade-up">
                                            <div className="content" style={{width: 500, height: 250, border: '2px solid green'}}>
                                                Map
                                            </div>
                                            <ZoneTableGrid />
                                        </div> */}
                                    </div>
                                    <br></br>
                                    <div className="row" style={{justifyContent: 'center'}}>
                                        <div className="col-md-4 d-flex" style={{width: 1200, height: 200, border: '2px solid blue'}} data-aos="fade-up">
                                            {/* <div className="content"> */}
                                                Line Chart
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </section>
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

