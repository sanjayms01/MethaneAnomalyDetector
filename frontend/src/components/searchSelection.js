import React from 'react';
import Select from 'react-select';

export default class SearchSelection extends React.Component {

  render() {

    let { selectedOption, handleSelect} = this.props;

    const options = [
      { value: '233 S Wacker Dr, Chicago, IL 60606', label: 'Willis Tower' },
      { value: '201 E Randolph St, Chicago, IL 60602', label: 'Cloud Gate' },
      { value: '5801 S Ellis Ave, Chicago, IL 60637', label: 'University of Chicago'},
      { value: '1060 W Addison St, Chicago, IL 60613', label: 'Wrigley Field'},
      { value: "10000 W O'Hare Ave, Chicago, IL 60666", label: "O'Hare International Airport"},
      { value: '300 N Central Park Ave, Chicago, IL 60624', label: 'Garfield Park Conservatory'},
      { value: '5700 S Cicero Ave, Chicago, IL 60638', label: 'Chicago Midway International Airport'},
      { value: '11559 S Stony Island Ave, Chicago, IL 60633', label: 'Big Marsh Park'},
    ];

    return (
      <Select
        value={selectedOption}
        onChange={handleSelect}
        isClearable={true}
        options={options}
      />
    );
  }
}