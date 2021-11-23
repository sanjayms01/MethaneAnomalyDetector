import React from 'react';
import Select from 'react-select';

export default class FrequencySelection extends React.Component {

  render() {

    let { selectedOption, handleSelect, onOpen, type} = this.props;

    const options = [
      { value: '1D', label: '1D' },
      { value: '3D', label: '3D' },
      { value: '5D', label: '5D' },
      { value: '7D', label: '7D' },
      { value: '10D', label: '10D' },
    ];

    return (
      <Select
        menuPortalTarget={document.body} 
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        value={selectedOption}
        onChange={handleSelect}
        onMenuOpen={() => onOpen(type)}
        isClearable={false}
        options={options}
      />
    );
  }
}