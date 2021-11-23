import React, { Component } from 'react'

import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

export default class AnomalyTableGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Data', field:'date', width: 75, sortable: true, filter: true},
                {headerName: 'Methane Reading', field:'reading', width: 75, sortable: true, filter: true},
                {headerName: 'Loss', field:'loss', width: 75, sortable: true, filter: true},
                {headerName: 'Severity', field:'severity', width: 75, sortable: true, filter: true}
            ],
            rowData: this.props.anomoliesTable 
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

