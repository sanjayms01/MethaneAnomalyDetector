import React from 'react';
import Select from 'react-select';

export default class Selection extends React.Component {

  render() {

    let { selectedOption, handleSelect, onOpen, type, options} = this.props;

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