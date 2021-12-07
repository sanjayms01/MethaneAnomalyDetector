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
                {headerName: 'End Date', field:'Anomaly End Date', width: 110, sortable: true, filter: true, cellStyle: {textAlign: 'center'}},
                {headerName: 'Min', field:'Minimum Methane', width: 100, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: params => params.data['Minimum Methane'].toFixed(3)},
                {headerName: 'Max', field:'Maximum Methane', width: 100, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: params => params.data['Maximum Methane'].toFixed(3)},
                {headerName: 'Avg', field:'Average Methane', width: 100, sortable: true, cellStyle: {textAlign: 'center'}, filter: true, valueFormatter: params => params.data['Average Methane'].toFixed(3)}
            ]
        };
    }

    render() {

        let rowData = this.props.anomaliesTable;
        console.log("ROW Data", rowData);

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

