import React, { Component } from 'react'
import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

export default class Explore extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            vega_spec : {},
        };
        
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
        return true;
    }

    getData = async () => {
        try {
            const data = await API.get('explorationAPI', '/explore');
            console.log(data);
            this.setState({vega_spec: data});
            vegaEmbed('#histogram', this.state.vega_spec).then(function(result) {
            }).catch(console.error);
        } catch (err) { console.log("error") }
    }

    render() {
        return (
            <>
                <div id="histogram"/>
            </>
        )
    }
}

