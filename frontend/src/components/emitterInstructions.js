import React, { Component } from 'react'

// Components
import {Tab, Row, Col, Nav} from 'react-bootstrap';

export default class EmitterInstructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let {keepTitle, borderStyle} = this.props;
        return (
            <div style={borderStyle}>
                <br></br>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                { (keepTitle) ? <h4>Instructions</h4>: ''}
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Hover</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Select</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ul>
                                <li>Hover over any of the charts to get a tooltip providing details.</li>
                            </ul>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <ul>
                                <li>Select any tile on the <em>Heatmap</em> to highlight a zone</li>
                                <li>Select multiple tiles by holding <em>SHIFT</em> while clicking on multiple tiles on the <em>Heatmap</em></li>
                                <li>Select a bar in <em>Facility Count Breakdown</em> to highlight a facility type</li>
                                <li>Selection/Multi-Selection can be done on <em>Facility Count Breakdown</em> and <em>Total Facility Counts</em></li>
                            </ul>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        )
    }
}

