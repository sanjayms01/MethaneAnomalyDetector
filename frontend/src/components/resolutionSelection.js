import React from 'react';
import Select from 'react-select';

export default class ResolutionSelection extends React.Component {

  render() {

    let { selectedOption, handleSelect, onOpen, type} = this.props;

    const options = [
      { value: 0.1, label: '0.1' },
      { value: 0.2, label: '0.2' },
      { value: 0.5, label: '0.5' },
      { value: 1.0, label: '1.0' }
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