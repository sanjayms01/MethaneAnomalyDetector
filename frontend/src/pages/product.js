import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Loader from 'react-loader-spinner';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Components
import AnomalyTableGrid from '../components/anomalyTableGrid';
import Header from '../components/header';
import Footer from '../components/footer';
import AddressModal from '../components/addressModal';
import TweetCards from '../components/tweetCards';
import ScrollToTop from "react-scroll-to-top";
import ProductInstructions from '../components/productInstructions'

// Scrollable sections
// https://www.emgoto.com/react-table-of-contents/

export default class Product extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            radioValue: "Zone",
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
            validAddress: null,
            showModal: false,
            anomaliesTable: [],
            numOfAnomalies: 0,
            recentLineChart: {},
            methaneMap: {},
            productLineChart: {},
            tweetsData: [],
            zone: null,
        };

        this.use_synthetic = false;
        this.synthetic_data_config = {
            mult_fnc: 'mean',
            mult_factor: 1.05,
            mul_index: 50 //this.generateInterval(50, 7, 5, false)
        };

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

        //Synthetic Data Testing:
        this.generateInterval = this.generateInterval.bind(this);
    }

    componentDidMount() {
        this.handleShow();
        return true;
    }

    generateInterval = (min, val, size = 10, rand = false) => { // min and max included 
        // If rand = false, val = size of list
        // If rand = true, val = max of limit
        if (rand) {

            let result = [];
            for (let i = 0; i < size; i++) {
                let cur_val = Math.floor(Math.random() * (val - min + 1) + min)
                result.push(cur_val);
            }
            return JSON.stringify(result);
        } else {
            return JSON.stringify([...Array(val).keys()].map(i => i + min));
        }
    }

    fetch_anomaly_df = async () => {
        this.setState({isAnomalyDataFetching: true});
        let {zone, radioValue} = this.state;
        let {lat, lng} = this.state.coordinates;

        let queryDetails = `get_anomaly_df?zone=${zone}`;

        if (radioValue == 'Neighborhood') {
            queryDetails = `get_anomaly_df?lat=${lat}&lon=${lng}`;
        }

        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {table} = data;
            table = JSON.parse(table);
            this.setState({anomaliesTable: table, isAnomalyDataFetching: false});
        } catch (err) { console.log("error") }
    }


    fetch_recent_line_chart = async () => {
        this.setState({isRecentLineFetching: true});
        let {zone, radioValue} = this.state;
        let {lat, lng} = this.state.coordinates;
        let queryDetails = `get_recent_line_chart?zone=${zone}`;

        if (radioValue == 'Neighborhood') {

            if (this.use_synthetic) {
                let {mult_fnc, mul_index, mult_factor} = this.synthetic_data_config;
                queryDetails = `get_recent_line_chart?lat=${lat}&lon=${lng}&mult_fnc=${mult_fnc}&mult_factor=${mult_factor}&mul_index=${mul_index}`;
            } else {
                queryDetails = `get_recent_line_chart?lat=${lat}&lon=${lng}`;
            }
        }

        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({isRecentLineFetching: false, recentLineChart: chart});
            vegaEmbed('#recent_line_chart', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }



    fetch_product_line_chart = async () => {
        this.setState({isProductLineFetching: true});
        let {zone, radioValue} = this.state;
        let {lat, lng} = this.state.coordinates;

        let queryDetails = `get_product_line_chart?zone=${zone}`;

        if (radioValue == 'Neighborhood') {
            queryDetails = `get_product_line_chart?lat=${lat}&lon=${lng}`;
        }

        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({isProductLineFetching: false, productLineChart: chart});
            vegaEmbed('#product_line_chart', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }



    fetch_methane_map = async () => {
        this.setState({isMapFetching: true});
        let {location, zone, radioValue} = this.state;
        let {lat, lng} = this.state.coordinates;

        let queryDetails = `get_methane_map?zone=${zone}`;

        if (radioValue == 'Neighborhood') {
            queryDetails = `get_methane_map?lat=${lat}&lon=${lng}&location=${encodeURIComponent(location)}`;
        }

        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {chart} = data;
            chart = JSON.parse(chart);
            this.setState({methaneMap: chart, isMapFetching: false});
            vegaEmbed('#methane_map', chart).then(function(result) {
            }).catch(console.error);

        } catch (err) { console.log("error") }
    }

    fetch_recent_tweets = async () => {
        this.setState({isTweetsFetching: true});
        let queryDetails = `get_recent_tweets`;
        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const tweetData = await response.json();
            let {data, includes} = tweetData;
            let result = [];

            let userLookup = Object.assign({}, ...includes.users.map((x) => ({[x.id]: x.profile_image_url})));

            for (let obj of data) {
                let objDict = {};
                objDict['author_id'] = obj.author_id;
                objDict['id'] = obj.id;
                objDict['created_at'] = obj.created_at;
                objDict['text'] = obj.text;
                objDict['profile_image_url'] = userLookup[obj.author_id];

                result.push(objDict);
            }
            this.setState({tweetsData: result, isTweetsFetching: false});
        } catch (err) { console.log("error") }
    }

    handleShow = () => {
        this.setState({
            showModal: true,
            location: "",
            radioValue: "Zone",
            isAnomalyDataFetching: false,
            isRecentLineFetching: false,
            isProductLineFetching: false,
            isMapFetching: false,
            isTweetsFetching: false,
            validAddress: null
        });
    }

    handleRadioValue = radioValue => {
        this.setState({ radioValue: radioValue.target.value });
    }

    handleTextChange = location => {
        this.setState({ location });
    }

    handleSelect = location => {
        if (typeof location === 'string' || location instanceof String) {
            this.setState({ location });
        }

        geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            this.setState({ coordinates: latLng });
        })
        .catch(error => console.error("Error", error));
    }

    handleClose = () => {
        this.verifyLocation();
    }

    verifyLocation = async () => {
        // check if location is in CA
        let {lat, lng} = this.state.coordinates;
        let queryDetails = `get_location_check?lat=${lat}&lng=${lng}`;
        let request = this.props.secure ? this.props.httpsReq + queryDetails : this.props.httpReq + queryDetails;
        try {
            // GET request using fetch with async/await
            const response = await fetch(request);
            const data = await response.json();
            let {result} = data;
            let {inCali, zone} = result;
            this.setState({validAddress: inCali, zone: zone});

            if (inCali) {
                this.setState({showModal: false});
                this.fetch_recent_line_chart();
                this.fetch_methane_map();
                this.fetch_anomaly_df();
                this.fetch_recent_tweets();
                this.fetch_product_line_chart();
            } else {
                this.setState({showModal: true, location: "", validAddress: false});
            }
        } catch (err) { console.log("error") }
    }

    render() {

        return (
            <>
                <ScrollToTop smooth={true} />
                <Header/>
                {
                    this.state.showModal == false  ? (
                        <>
                            {/* {
                                this.state.isAnomalyDataFetching || this.state.isRecentLineFetching || this.state.isProductLineFetching || this.state.isMapFetching || this.state.isTweetsFetching ? (
                                    <div style={{justifyContent: 'center'}}><Loader
                                        type="Grid"
                                        color="#4AA0B5"
                                        height={100}
                                        width={100}
                                        timeout={20000} />
                                    </div>
                                ) : ( */}
                                    <>
                                        <section id="product" style={{height: 500}}>
                                            <div className="container-fluid" style={{display: 'flex', marginTop: 60, justifyContent: 'center', flexDirection: 'column'}}>
                                                <div className="section-title">
                                                    <h2>Methane Anomaly Detector</h2>
                                                    {/* <p>Locate your zone, understand its size, and the amount of data Sentinel 5P captures with respect to the zone.</p> */}
                                                </div>
                                                <div style={{display: 'flex', justifyContent: 'evenly'}}>
                                                    <div style={{width: '60%', justifyContent: 'evenly'}}>
                                                        <div style={{width: '95%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                                                            <ProductInstructions keepTitle={true} borderStyle={{width:'85%'}}/>
                                                        </div>
                                                    </div>
                                                    <div style={{width: '40%', paddingRight: 30}}>
                                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                                            <Card style={{width: 'auto', backgroundColor: '#D1F1D1', border: '2px solid #11694E'}}>
                                                                <CardContent>
                                                                    <Typography color="textPrimary" align='center' variant='h6' gutterBottom>Details</Typography>
                                                                    <Typography color="textSecondary"><b>Granularity: </b>{this.state.radioValue}</Typography>
                                                                    <Typography color="textSecondary"><b>Location: </b>{this.state.location}</Typography>
                                                                    <Typography color="textSecondary"><b>Climate Zone: </b>{this.state.zone}</Typography>
                                                                    <Typography color="textSecondary"><b>Current Date: </b>{new Date().toLocaleDateString()}</Typography><br />
                                                                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                                                        <Button variant="secondary" onClick={this.handleShow}>Retry</Button>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section id="" style={{padding: 20}}>
                                            <div className="container-fluid" style={{justifyContent: 'center'}}>
                                                <div className="row">
                                                    <div className="col-md-4 d-flex" style={{justifyContent: 'center', alignItems: 'center', width: '65%'}} data-aos="fade-up">
                                                        {/* <div id='recent_line_chart' className="content"></div> */}
                                                        {/* <div id='methane_map'></div> */}
                                                        {
                                                            this.state.isRecentLineFetching ? (<Loader style={{justifyContent: 'right'}}
                                                                type="Grid"
                                                                color="#11694E"
                                                                height={100}
                                                                width={100}
                                                                timeout={20000} //20 secs
                                                            />) : (<div id='recent_line_chart'></div>)
                                                        }
                                                        {/* {
                                                            this.state.isMapFetching ? (<Loader
                                                                type="Grid"
                                                                color="#4AA0B5"
                                                                height={100}
                                                                width={100}
                                                                timeout={20000} //20 secs
                                                            />) : (<div id='methane_map'></div>)
                                                        } */}
                                                    </div>
                                                    <div className="col-md-4 d-flex" style={{justifyContent: 'center', alignItems: 'center', width: '35%'}} data-aos="fade-up">
                                                        {/* <div id='recent_line_chart' className="content"></div> */}
                                                        {/* <div id='methane_map'></div> */}
                                                        {/* {
                                                            this.state.isRecentLineFetching ? (<Loader style={{justifyContent: 'right'}}
                                                                type="Grid"
                                                                color="#4AA0B5"
                                                                height={100}
                                                                width={100}
                                                                timeout={20000} //20 secs
                                                            />) : (<div id='recent_line_chart'></div>)
                                                        } */}
                                                        {
                                                            this.state.isMapFetching ? (<Loader
                                                                type="Grid"
                                                                color="#11694E"
                                                                height={100}
                                                                width={100}
                                                                timeout={20000} //20 secs
                                                            />) : (<div id='methane_map'></div>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section id="" style={{padding: 20, backgroundColor: '#C0DFCD', borderTop:'1px solid black'}}>
                                            <div className="container-fluid" style={{justifyContent: 'center'}}>
                                                <div className="row">
                                                    <div className="col-md-4 d-flex" style={{justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}} data-aos="fade-up">
                                                        <div style={{flexDirection: 'column', justifyContent: 'center'}}>
                                                            <div>
                                                                <h4 style={{textAlign: 'center'}}>Methane Anomalies (ppb)</h4>
                                                                <p style={{textAlign: 'center', fontSize: 14}}>(Refer to visual below)</p>
                                                                <AnomalyTableGrid anomaliesTable={this.state.anomaliesTable} />
                                                            </div>
                                                            {/* <div style={{justifyContent: 'center'}}><Button variant="secondary" style={{width: 'auto'}} onClick="">Download Results</Button></div> */}
                                                        </div>
                                                        <div style={{flexDirection: 'column', justifyContent: 'center'}}>
                                                            <div>
                                                                <h4 style={{textAlign: 'center'}}>Methane Tweets <i className="bx bxl-twitter" style={{color: '#1DA1F2'}}></i></h4>
                                                                <p style={{textAlign: 'center', fontSize: 14}}>(Real-time Twitter Feed)</p>
                                                                <div style={{width: 500, height: 200}}>
                                                                    <TweetCards tweetsData={this.state.tweetsData}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section id="" style={{padding: 20, borderTop:'1px solid black'}}>
                                            <div className="container-fluid" style={{justifyContent: 'center'}}>
                                                <div className="row">
                                                    <div className="col-md-4 d-flex justify-content-center" style={{width: '100%'}} data-aos="fade-up">
                                                        <div id='product_line_chart' data-aos="fade-up"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <Footer/>
                                </>
                                {/* )
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

