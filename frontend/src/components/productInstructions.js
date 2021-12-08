import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

// Components
import {Tab, Row, Col, Nav} from 'react-bootstrap';

export default class ProductInstructions extends Component {
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
                        <Nav.Link eventKey="second">Click &#38; Drag</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ul>
                                <li>Hover over any of the charts to get a tooltip providing details</li>
                            </ul>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <ul>
                                <li>Click and drag on the line charts to select a time interval</li>
                                <li>There will now be a highlighted time interval present</li>
                                <li>Click and drag the highlighted time interval across time to see the effects on associated charts</li>
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

