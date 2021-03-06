import React, { Component } from 'react'

import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

export default class AnomalyTableGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Start Date', field:'Anomaly Start Date', width: 110, sortable: true, filter: true, cellStyle: {textAlign: 'center'}},
                {headerName: 'End Date', field:'Anomaly End Date', width: 100, sortable: true, filter: true, cellStyle: {textAlign: 'center'}},
                {headerName: 'Minimum', field:'Minimum Methane', width: 95, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: params => params.data['Minimum Methane'].toFixed(3)},
                {headerName: 'Maximum', field:'Maximum Methane', width: 97, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: params => params.data['Maximum Methane'].toFixed(3)},
                {headerName: 'Average', field:'Average Methane', width: 95, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: params => params.data['Average Methane'].toFixed(3)}
            ]
        };
    }

    render() {
        let rowData = this.props.anomaliesTable;
        return (
            <div 
                className='ag-theme-balham'
                style={{
                    width: 500,
                    height: 200,
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={rowData}
                >
                </AgGridReact>
            </div>
        )
    }
}

