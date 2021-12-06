import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import {Tab, Row, Col, Nav} from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';


export default class DataDownload extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        let {start_dt, end_dt} = this.props.dates;
        return (
            <div style={{borderTop:'2px solid #11694E'}}>    
                <br></br>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <h4>Data Download</h4>
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Zone</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Raw </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <p>
                                Dataset includes all methane and weather readings averaged by each California climate zones for each day from <em>{start_dt} - {end_dt}</em>. 
                                To greater understand what climate zones are, and to locate your zone, refer to <Link to="explore#data_explorer_intro">Zone Details</Link>.
                                To greater understand each of the time series columns refer to the gloassary in <HashLink to="explore#data_comparison">Data Comparison</HashLink>.
                                <br/>
                                <br/>
                                <a href='https://methane-capstone.s3.us-west-2.amazonaws.com/public_data/zone-data.csv'><button type="button" className="btn btn-outline-secondary">Download</button></a>
                            </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <p>
                                Dataset includes all raw methane and weather readings for each day from <em>{start_dt} - {end_dt}</em>.
                                To greater understand the rounded resolutions columns, refer to <Link to="explore#missing_data">Missing Data</Link>.
                                To greater understand each of the time series columns refer to the gloassary in <HashLink to="explore#data_comparison">Data Comparison</HashLink>.
                                <br/>
                                <br/>
                                <a href='https://methane-capstone.s3.us-west-2.amazonaws.com/public_data/full-raw-data.csv'><button type="button" className="btn btn-outline-secondary">Download</button></a>
                            </p>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        )
    }
}