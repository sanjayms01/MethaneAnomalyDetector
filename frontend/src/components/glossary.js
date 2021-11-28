import React, { Component } from 'react'

export default class Glossary extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.glossary = {
                methane_mixing_ratio_bias_corrected_mean: {
                    desc: '',
                    unit: '',
                },

                reading_count : {
                    desc: '',
                    unit: '',
                },
                air_pressure_at_mean_sea_level_mean: {
                    desc: '',
                    unit: '',
                },
                eastward_wind_at_100_metres_mean: {
                    desc: '',
                    unit: '',
                }, 
                northward_wind_at_100_metres_mean: {
                    desc: '',
                    unit: '',
                },
                air_temperature_at_2_metres_mean: {
                    desc: '',
                    unit: '',
                },
                surface_air_pressure_mean: {
                    desc: '',
                    unit: '',
                },
                integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean: {
                    desc: '',
                    unit: '',
                },
                precipitation_amount_1hour_Accumulation_mean: {
                    desc: '',
                    unit: '',
                },
                dew_point_temperature_at_2_metres_mean: {
                    desc: '',
                    unit: '',
                },

        }

    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

