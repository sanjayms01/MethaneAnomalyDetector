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
                {headerName: 'ID', field:'id', width: 75, sortable: true, filter: true},
                {headerName: 'Name', field:'name', width: 150, sortable: true, filter: true},
                {headerName: 'Acerage', field:'acerage', width: 150, sortable: true, filter: true},
                {headerName: 'Area', field:'area', width: 100, sortable: true, filter: true},
                {headerName: 'CenterLat', field:'centerLat', width: 125, sortable: true, filter: true},
                {headerName: 'CenterLon', field:'centerLat', width: 125, sortable: true, filter: true}
            ],
            rowData: zoneData 
        };
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

