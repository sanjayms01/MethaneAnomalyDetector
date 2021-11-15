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
                {headerName: 'ID', field:'id', sortable: true, filter: true},
                {headerName: 'Name', field:'name', sortable: true, filter: true},
                {headerName: 'Acerage', field:'acerage', sortable: true, filter: true},
                {headerName: 'Area', field:'area', sortable: true, filter: true},
                {headerName: 'CenterLat', field:'centerLat', sortable: true, filter: true},
                {headerName: 'CenterLon', field:'centerLat', sortable: true, filter: true}
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
                    height: 300
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

