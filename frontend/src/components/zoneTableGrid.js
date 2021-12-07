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
                {headerName: 'Zone', field:'id', width: 55, sortable: true, cellStyle: {fontSize: '14px'}},
                {headerName: 'Name', field:'name', width: 120, sortable: true, cellStyle: {fontSize: '14px'}},
                {headerName: 'Acreage', field:'acreage', width: 100, sortable: true, cellStyle: {fontSize: '14px'}, valueFormatter: params => this.numberFormatter(params.data.acreage)},
                {headerName: 'Latitude', field:'centerLat', width: 85, sortable: true, cellStyle: {fontSize: '14px'}},
                {headerName: 'Longitude', field:'centerLon', width: 90, sortable: true, cellStyle: {fontSize: '14px'}}
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
                    width: 450,
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

