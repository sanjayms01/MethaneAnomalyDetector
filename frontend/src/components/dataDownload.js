import React, { Component } from 'react'

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
        let {keepTitle, borderStyle, currentPage} = this.props;

        return (
            <div style={borderStyle}>
                <br></br>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                { (keepTitle) ? <h4>Data Download</h4>: ''}
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Climate Zone</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Full Dataset</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <p id="dwld-box-cz" style={{textAlign: 'left'}}>
                                This dataset includes all methane and weather readings averaged for each California climate zone for each day from <em>{start_dt} - {end_dt}</em>. 
                                To better understand what climate zones are and to locate your zone, refer to {(currentPage == 'Model') ? <a href="./explore#data_explorer_intro" target="_blank">Zone Details</a> : <Link to="/explore#data_explorer_intro">Zone Details</Link>}.
                                To better understand each of the time series columns, refer to the glossary in {(currentPage == 'Model') ? <a href="./explore#data_comparison" target="_blank">Data Comparison</a> : <HashLink to="/explore#data_comparison">Data Comparison</HashLink>}.
                                <br/>
                                <br/>
                                <a href="https://methane-capstone.s3.us-west-2.amazonaws.com/public_data/zone-data.csv" className="btn-get-started">Download</a>
                            </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <p id="dwld-box-full" style={{textAlign: 'left'}}>
                                This cleaned dataset includes methane and weather readings for each day from <em>{start_dt} - {end_dt}</em>.
                                To better understand the rounded resolution columns, refer to {(currentPage == 'Model') ? <a href="./explore#missing_data" target="_blank">Missing Data</a> : <Link to="/explore#missing_data">Missing Data</Link>}.
                                To better understand each of the time series columns, refer to the glossary in {(currentPage == 'Model') ? <a href="./explore#data_comparison" target="_blank">Data Comparison</a> : <HashLink to="/explore#data_comparison">Data Comparison</HashLink>}.
                                <br/>
                                <br/>
                                <a href='https://methane-capstone.s3.us-west-2.amazonaws.com/public_data/full-raw-data.csv' className="btn-get-started">Download</a>
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