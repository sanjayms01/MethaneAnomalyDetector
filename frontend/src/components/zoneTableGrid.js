import React, { Component } from 'react'

import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import zoneData from '../resources/zone-meta.json'

export default class ZoneTableGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Zone', field:'id', width: 70, sortable: true, filter: true, cellStyle: {fontSize: '14px', textAlign: 'center'}},
                {headerName: 'Name', field:'name', width: 120, sortable: true, filter: true, cellStyle: {fontSize: '14px', textAlign: 'center'}},
                {headerName: 'Acreage', field:'acreage', width: 100, sortable: true, filter: true, cellStyle: {fontSize: '14px', textAlign: 'center'}, valueFormatter: params => this.numberFormatter(params.data.acreage)},
                {headerName: 'Latitude', field:'centerLat', width: 100, sortable: true, filter: true, cellStyle: {fontSize: '14px', textAlign: 'center'}},
                {headerName: 'Longitude', field:'centerLon', width: 100, sortable: true, filter: true, cellStyle: {fontSize: '14px', textAlign: 'center'}}
            ],

            rowData: zoneData 
        };
        this.numberFormatter = this.numberFormatter.bind(this);
    }

    numberFormatter(val) {
        var sansDec = val.toFixed(0);
        var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formatted}`;
    }

    render() {
        return (
            <div 
                className='ag-theme-balham'
                style={{
                    width: 490,
                    height: 500,
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                >
                </AgGridReact>
            </div>
        )
    }
}

