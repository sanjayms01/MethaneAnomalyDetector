import React, { Component } from 'react'

import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

import zoneData from '../resources/zone-meta.json'

export default class ZoneTableGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Zone', field:'id', width: 75, sortable: true, filter: true},
                {headerName: 'Name', field:'name', width: 150, sortable: true, filter: true},
                {headerName: 'Acreage', field:'acreage', width: 150, sortable: true, filter: true, valueFormatter: params => this.numberFormatter(params.data.acreage)},
                {headerName: 'CenterLat', field:'centerLat', width: 125, sortable: true, filter: true},
                {headerName: 'CenterLon', field:'centerLon', width: 125, sortable: true, filter: true}
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
                className='ag-theme-balham-dark'
                style={{
                    width: 500,
                    height: 475,
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

