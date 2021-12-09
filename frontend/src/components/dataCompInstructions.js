import React, { Component } from 'react'

// Components
import {Tab, Row, Col, Nav} from 'react-bootstrap';

export default class DataCompInstructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let {keepTitle, borderStyle} = this.props;
        return (
            <div>
                <br></br>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <h4>Instructions</h4>
                <p>Please refer to our tutorial video <a href='https://youtu.be/bnoXglvw4rA' target='_blank'> here</a> for an in-depth walkthrough.</p>
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Hover</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Select</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Click &#38; Drag</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ul>
                                <li>Hover over charts to get a tooltip describing that chart segment</li>
                            </ul>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <ul>
                                <li>Select one zone by clicking on a point in <em>Zone Selector</em></li>
                                <li>Select multiple zones by holding <em>SHIFT</em> while clicking on multiple points in <em>Zone Selector</em></li>
                                <li>Selection can also be done on <em>Plot 1</em></li>
                            </ul>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <ul>
                                <li>Click and drag on <em>Plot 2</em> click and drag to select a time interval</li>
                                <li>There will now be a highlighted time interval present</li>
                                <li>Click and drag the highlighted time interval across time to see its effect on <em>Plot 1</em></li>
                            </ul>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
                <br></br>
                <em>Interactions can be combined to compare specific zones over time</em>
                <br></br>
            </div>
        )
    }
}
