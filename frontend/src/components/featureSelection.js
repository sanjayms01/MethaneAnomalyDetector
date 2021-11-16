import React from 'react';
import Select from 'react-select';

export default class FeatureSelection extends React.Component {

  render() {

    let { selectedOption, handleSelect, onOpen, type} = this.props;

    const options = [
      { value: 'methane', label: 'Methane' },
      { value: 'reading_count', label: 'Reading Count' },
      { value: 'air_pressure_at_mean_sea_level_mean', label: 'Sea Level Air Pressure'},
      { value: 'eastward_wind_at_100_metres_mean', label: 'Eastward Wind'},
      { value: 'northward_wind_at_100_metres_mean', label: 'Northward Wind'},
      { value: 'air_temperature_at_2_metres_mean', label: 'Air Temperature'},
      { value: 'surface_air_pressure_mean', label: 'Surface Air Temperature'},
      { value: 'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean', label: 'Solar Radiation'},
      { value: 'precipitation_amount_1hour_Accumulation_mean', label: 'Precipitation'},
      { value: 'dew_point_temperature_at_2_metres_mean', label: 'Dew Point Temperature'},

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