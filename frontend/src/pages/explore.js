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
            selectedOption: null,
        };
        
        this.getData = this.getData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        this.getData();
        return true;
    }

    getData = async () => {
        try {
            const data = await API.get('exploreAPI', '/explore');
            console.log(data);
            this.setState({vega_spec: data});
            vegaEmbed('#histogram', this.state.vega_spec).then(function(result) {
            }).catch(console.error);
        } catch (err) { console.log("error") }
    }

    handleSelect = feature => {
        this.setState({selectedOption: feature});
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
                            
                            <div id="histogram" className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                            </div>
                        </div>
                    </div>
                </section>

                {/* Zone Feature Comparison  */}
                <section id="zone_compare" className="">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2>Zone Comparison</h2>
                            <p>Compare and contrast trends across various zones with respect to key features of our model.</p>
                        </div>
                        <FeatureSelection
                            {...this.props}
                            selectedOption = {this.state.selectedOption}
                            handleSelect = {this.handleSelect}
                        />

                        <div className="row">
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <div className="content">
                                <UserMap {...this.state}/>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <ZoneTableGrid/>
                            </div>
                            
                            <div className="col-md-4 d-flex justify-content-evenly" data-aos="fade-up">
                                <ZoneTableGrid/>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

