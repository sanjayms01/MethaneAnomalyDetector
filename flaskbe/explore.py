import pandas as pd
import numpy as np
import altair as alt
from shapely.geometry import Point

alt.data_transformers.disable_max_rows()

feature_name_map = {
    'methane_mixing_ratio_bias_corrected_mean': "Methane (ppb)",
    'reading_count': "Reading Count",
    'air_pressure_at_mean_sea_level_mean': "Sea Level Air Pressure (Pa)",
    'eastward_wind_at_100_metres_mean': "Eastward Wind (m/s)",
    'northward_wind_at_100_metres_mean': "Northward Wind (m/s)",
    'air_temperature_at_2_metres_mean': "Air Temperature (K)",
    'surface_air_pressure_mean': "Surface Air Pressure (Pa)",
    'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean': "Solar Radiation (J/m2)",
    'precipitation_amount_1hour_Accumulation_mean': "Precipitation (m)",
    'dew_point_temperature_at_2_metres_mean': "Dew Point Temperature (K)",
    'center_lat': "Latitude",
    'center_lon': "Longitude" 
}

def get_data_shape(df):
    return df.shape

def get_bar_zone_split(df_all):
    df_zone_split = df_all.groupby('BZone').size().reset_index().rename({0:"count"}, axis=1)
    df_zone_split['percent'] = df_zone_split['count']/ df_zone_split['count'].sum()
    df_zone_split = df_zone_split.rename({"BZone": "id", 
                  'count': 'reading_count',
                 }, axis=1).sort_values(by='id', ascending=True)

    zone_count_bar = alt.Chart(df_zone_split).mark_bar(tooltip=True, color='#11694E').encode(y= alt.Y('id:N', title="Zone"),
                                                                        x= alt.X('percent:Q', title="Percent", axis=alt.Axis(format='%')),
                                                                        tooltip=[alt.Tooltip('id', title='Zone'),
                                                                                 alt.Tooltip('percent', title='Percent', format='.1%'),
                                                                                 alt.Tooltip('reading_count', title='Reading Count', format=',d')]
                                                                        )

    zone_count_bar = zone_count_bar.properties(title="Percent of Total Readings", width=425, height= 460).configure_title(
                                                            fontSize=20,
                                                            font='sans-serif',
                                                            anchor='middle',
                                                            color='gray',
                                                        ).configure_axis(
                                                            labelFontSize=12,
                                                            titleFontSize=14
                                                        )
    return zone_count_bar.to_json()

def get_feature_dashboard(DL, time_feature, bar_feature):
    
    df_zone, cl_gdf = DL.df_zone, DL.cl_gdf

    zone_selector = alt.selection_multi(empty='all', fields=['BZone'])
    time_brush = alt.selection_interval(encodings=['x'])
    
    time_agg = 'mean'
    bar_agg = 'mean'    
    
    isSame = time_feature == bar_feature
    
    if isSame:
        if time_feature == 'reading_count':
            time_agg = 'sum'
        dt_zone_by_month = df_zone.set_index("time_utc").groupby([pd.Grouper(freq="M"), 'BZone']) \
                                                    .agg({time_feature: time_agg}) \
                                                    .reset_index() \
                                                    .rename({time_feature: feature_name_map[time_feature] + " " + time_agg.capitalize(),
                                                            }, axis=1)                                           
        df_other = df_zone.set_index("time_utc").groupby([pd.Grouper(freq="M"), 'BZone']) \
                                                    .agg({bar_feature: bar_agg}) \
                                                    .reset_index() \
                                                    .rename({time_feature: feature_name_map[bar_feature] + " " + bar_agg.capitalize(),
                                                            }, axis=1)
        dt_zone_by_month[feature_name_map[bar_feature] + " " + bar_agg.capitalize()] = df_other[feature_name_map[bar_feature] + " " + bar_agg.capitalize()]
    else:
        if time_feature =='reading_count':
            time_agg = 'sum'
        dt_zone_by_month = df_zone.set_index("time_utc").groupby([pd.Grouper(freq="M"), 'BZone']) \
                                                        .agg({time_feature: time_agg,
                                                              bar_feature: bar_agg}) \
                                                        .reset_index() \
                                                        .rename({time_feature: feature_name_map[time_feature],
                                                                 bar_feature: feature_name_map[bar_feature]
                                                                }, axis=1)
    
    
    dt_zone_by_month['time_utc'] = pd.to_datetime(dt_zone_by_month['time_utc'])
    time_suffix = " " + time_agg.capitalize() if isSame else ""
    bar_suffix = " " + bar_agg.capitalize() if isSame else ""
    
    #CA Background
    ca_base = DL.ca_base.properties(
            width=250,
            height=300
        )

    #Scatter Plot for Zone Selector
    scatter_lat_lon = alt.Chart(cl_gdf[['rep_city', 'BZone', 'SHAPE_Area', 'center_lat', 'center_lon']]).mark_point(filled=True, size=200).encode(
                            x= alt.X('center_lon', title = feature_name_map['center_lon'], scale=alt.Scale(zero=False)),
                            y = alt.Y('center_lat', title= feature_name_map['center_lat'], scale=alt.Scale(zero=False)),
                            tooltip=[
                                alt.Tooltip('BZone', title='Zone'),
                                alt.Tooltip('rep_city', title='Name'),
                                alt.Tooltip('center_lat', title='Latitude'),
                                alt.Tooltip('center_lon', title='Longitude')
                            ],
                            color=alt.condition(zone_selector, 'BZone:N', alt.value('lightgray'), legend=None),
                        ).add_selection(zone_selector).properties(title="Zone Selector", 
                                                                  width=250,
                                                                  height= 300)

    #CA Overlay
    scatter_lat_lon = ca_base + scatter_lat_lon

    #Time Series Plot
    region_by_month = alt.Chart(dt_zone_by_month).mark_line(
        point={
              "filled": False,
              "fill": "white"
            }
        ).encode(
            x=alt.X('yearmonth(time_utc):T', title = "Time"),
            y=alt.Y(f'{feature_name_map[time_feature] + time_suffix}:Q', title=f'{feature_name_map[time_feature]}', scale=alt.Scale(zero=False)),
            tooltip=[
                alt.Tooltip('BZone', title='Zone'),
                alt.Tooltip('time_utc:T', title='Time', format='%B %Y'),
                alt.Tooltip(f'{feature_name_map[time_feature] + time_suffix}:Q', title=f'{feature_name_map[time_feature]}', format=",.2f")
            ],
            color=alt.condition(zone_selector | time_brush, 'BZone:N', alt.value('lightgray'), legend=None),
        ).transform_filter(
            zone_selector
            ).add_selection(zone_selector).add_selection(time_brush).properties(title="Plot 2: Monthly " + feature_name_map[time_feature],width=630)


    #Average Bar Chart
    month_avg_bar = alt.Chart(dt_zone_by_month).mark_bar().encode(
        x = alt.X('BZone:N', title='Zone'),
        y = alt.Y(f'mean({feature_name_map[bar_feature] + bar_suffix}):Q', title=f'Average {feature_name_map[bar_feature]}', scale=alt.Scale(zero=False)),
        tooltip=[
            alt.Tooltip('BZone', title='Zone'),
            alt.Tooltip(f'mean({feature_name_map[bar_feature]+ bar_suffix}):Q', title=f'{feature_name_map[bar_feature]}', format=",.2f")
         ],
        color=alt.condition(zone_selector, 'BZone:N', alt.value('lightgray'), legend=None),
    ).transform_filter(
            time_brush
    ).add_selection(zone_selector).properties(title=f'Plot 1: Monthly Average {feature_name_map[bar_feature]}')

    chart = alt.hconcat(scatter_lat_lon, month_avg_bar, region_by_month, center=True)
    chart = chart.configure_title(fontSize=20, font='sans-serif', anchor='middle', color='gray').configure_axis(labelFontSize=12, titleFontSize=14)
    
    return chart.to_json()
        
        
def get_vista_ca_dashboard(DL):

    non_oil_df, ca_base = DL.non_oil_df, DL.ca_base
    non_oil_well = non_oil_df.groupby(["BZone", "vistastype"]).size().reset_index().rename({0:"facility_count"}, axis=1)

    zone_selector = alt.selection_multi(empty='all', fields=['BZone'])
    type_selector = alt.selection_multi(empty='all', fields=['vistastype'])

    #Selection Gate
    cond1 = (type_selector & zone_selector) #AND
    cond2 = (type_selector & ~zone_selector) | (~type_selector & zone_selector) #XOR
    joint_xor = (cond1 & ~cond2) | (~cond1 & cond2)

    #Set Size of CA
    ca_base = ca_base.properties(
            width=500,
            height=500
        )

    vc_bar = alt.Chart(non_oil_well,
                       title='Facility Count Breakdown'
                      ).mark_bar().encode(
                    y=alt.Y('vistastype:N', title="Type"),
                    x=alt.X('sum(facility_count):Q', title='Count'),
                    color=alt.condition(type_selector, alt.Color('vistastype:N',legend=None), alt.value('lightgrey')),
                    tooltip=[alt.Tooltip('sum(facility_count):Q', title='Count')],
                    ).transform_filter(
                        zone_selector
                    ).add_selection(type_selector).properties(width=300, height=370)

    heatmap = alt.Chart(non_oil_well,
                   title='Facility Count Heatmap'
                  ).mark_bar().encode(
                y=alt.Y('vistastype:N', title="Type", axis=alt.Axis(orient='left')),
                x=alt.X('BZone:N', title="Zone"),
                color= alt.condition(joint_xor, alt.Color('sum(facility_count):Q', scale=alt.Scale(type='log', scheme='yellowgreen'), legend=None), alt.value('lightgray')),
                tooltip=[alt.Tooltip('sum(facility_count):Q', title='Count')]
                ).add_selection(zone_selector).properties(width=650)

    non_oil_fac_points = alt.Chart(non_oil_df, title= "Facilities").mark_point(size=10).encode(
                                x=alt.X('longitude:Q', title='Longitude', scale=alt.Scale(zero=False)),
                                y=alt.Y('latitude:Q', title='Latitude', scale=alt.Scale(zero=False)),
                                color=alt.condition(joint_xor,
                                                    alt.Color('vistastype:N', legend=None),
                                                    alt.value('lightgray')),
                                tooltip = [alt.Tooltip('latitude', title='Latitude'),
                                           alt.Tooltip('longitude', title='Longitude'),
                                           alt.Tooltip('vistastype', title='Type')
                                        ]
                            ).properties(
                                width = 400,
                                height = 550
                            )

    zone_g_df = non_oil_df.groupby(["BZone"]).size().reset_index().rename({0:'facility_count'}, axis=1)    
    zone_count_bar = alt.Chart(zone_g_df,
                    title='Total Facility Counts'
                    ).mark_bar().encode(
                y=alt.Y('BZone:N', title='Zone'),
                x=alt.X('facility_count:Q', title='Count'),
                color=alt.condition(zone_selector, alt.Color('facility_count:Q', legend=None, scale=alt.Scale(type='log', scheme='yellowgreen')), alt.value('lightgrey')),
                tooltip=[alt.Tooltip('facility_count:Q', title='Count')]
                ).add_selection(zone_selector).properties(width=300, height=370)
    
    ca_map = (ca_base + non_oil_fac_points) 
    chart = alt.hconcat(ca_map, (heatmap & (vc_bar | zone_count_bar)), center=True)
    chart = chart.configure_title(fontSize=20, font='sans-serif',anchor='middle', color='gray').configure_axis(labelFontSize=12, titleFontSize=14)  
    
    return chart.to_json()


def process_missing_data_map(df, all_dates_df, DL, resolution, time_unit):
    #To flag if zone query
    isZone=False

    if resolution == 0.1:
        lat_str = 'rn_lat_1'
        lon_str = 'rn_lon_1'
        
    elif resolution == 0.2:
        lat_str = 'rn_lat_2'
        lon_str = 'rn_lon_2'
        
    elif resolution == 0.5:
        lat_str = 'rn_lat_5'
        lon_str = 'rn_lon_5'
        
    elif resolution == 1.0:
        lat_str = 'rn_lat'
        lon_str = 'rn_lon'
        
    else:
        isZone = True


    #Use All Dates DF to determine # of unique steps based on time grouping
    cur_all_dates = all_dates_df.copy()
    cur_all_dates['time_utc'] = pd.to_datetime(cur_all_dates['time_utc'])
    cur_all_dates = cur_all_dates.set_index('time_utc').groupby(pd.Grouper(freq=time_unit, origin="start_day")).size().reset_index()
    cur_all_dates['time_utc'] = cur_all_dates['time_utc'].astype(str)
    num_time_steps = cur_all_dates.shape[0]
    
    
    if isZone:
        df_trim = df[['time_utc', 'BZone']]
        df_trim = df_trim.set_index('time_utc').groupby([pd.Grouper(freq=time_unit, origin="start_day"), 'BZone']).size().reset_index()
        df_trim = df_trim.groupby(['BZone']).size().reset_index().rename({0: "coverage"}, axis=1) 
        df_trim['pct_miss'] = (num_time_steps - df_trim['coverage']) / num_time_steps

        df_trim = df_trim.merge(DL.cl_gdf[['BZone', 'center_lat','center_lon']], on='BZone', how='inner')
        new_names = {'center_lat': 'Latitude', 'center_lon': 'Longitude'} 

    else:
        #Aggregate date to see how many days are covered for each unique place
        df_trim = df[['time_utc', lat_str, lon_str]]
        df_trim = df_trim.set_index('time_utc').groupby([pd.Grouper(freq=time_unit, origin="start_day"), lat_str, lon_str]).size().reset_index()
        df_trim = df_trim.groupby([lat_str, lon_str]).size().reset_index().rename({0: "coverage"}, axis=1)    
        df_trim['pct_miss'] = (num_time_steps - df_trim['coverage']) / num_time_steps
    
        new_names = {lat_str: 'Latitude',lon_str: 'Longitude'}
  
    # call rename () method
    df_trim.rename(columns=new_names, inplace=True)
    
    return df_trim


def transform_freq(freq):
    if freq == '1D':
        return '1 Day'
    elif freq == '3D':
        return '3 Day'
    elif freq == '5D':
        return '5 Day'
    elif freq == '7D':
        return '7 Day'
    elif freq == '10D':
        return '10 Day'
    else:
        return freq

def create_missing_data_chart(df, resolution, freq, ca_base):
    scale = alt.Scale(
        domain=[1.0, 0.5, 0],
        range=['darkred', 'orange', 'green'],
        type='linear'
    )
    mult = 1.0 if resolution == "Zone" else resolution
    if resolution == "Zone":
        points = alt.Chart(df, title=f'Resolution: {resolution},  Frequency: {transform_freq(freq)}').mark_circle(size=mult*100*2).encode(longitude='Longitude', latitude='Latitude', tooltip= [alt.Tooltip('BZone', title="Zone"), alt.Tooltip('Latitude'), alt.Tooltip('Longitude'), alt.Tooltip('pct_miss:Q', title= "Percent Missing", format=".1%")], color=alt.Color('pct_miss', title='Percent Missing', scale=scale))
       
    else:
        #Plot all the readings
        points = alt.Chart(df, title=f'Resolution: {resolution},  Frequency: {transform_freq(freq)}').mark_circle(size=mult*100*2).encode(
            longitude='Longitude',
            latitude='Latitude',
            tooltip= [alt.Tooltip('Latitude'),
                    alt.Tooltip('Longitude'),
                    alt.Tooltip('pct_miss:Q', title= "Percent Missing", format=".1%"),
                    ],
            color=alt.Color('pct_miss', title='Percent Missing', scale=scale)
        )

    ca_base = ca_base.properties(
            width=475,
            height=475
        )

    chart = ca_base + points
    return chart


def create_missing_histogram(data):
    pct_missing_hist = alt.Chart(data, title="Histogram: Percent Missing").mark_bar().encode(
                                    x = alt.X("pct_miss:Q", bin=True, title='Percent Missing', axis=alt.Axis(format='%')),
                                    y='count()',
                                    tooltip = [alt.Tooltip('count()', title='Count'), alt.Tooltip("pct_miss:Q", bin=True, title='Bin', format='%')],
                                    color= alt.Color('pct_miss:Q',bin=alt.Bin(extent=[0.0, 1.0], step=0.20),
                                                                    scale=alt.Scale(range=['#77aa54',
                                                                            '#b3b756',
                                                                            '#efb555',
                                                                            '#dc8c50',
                                                                            '#c0684f']),
                                                                    legend=None
                                                    )
                                            ).properties(width=200, height=500)
    return pct_missing_hist


def get_missing_data_dashboard(DL, resolution, freq):
    map_base = DL.climate_regions if resolution == 'Zone' else DL.ca_base
    df_all, all_dates_df =  DL.df_all, DL.all_dates_df
    data = process_missing_data_map(df_all, all_dates_df, DL, resolution, freq)
    map_chart = create_missing_data_chart(data, resolution, freq, map_base)
    histogram = create_missing_histogram(data)
    chart = map_chart | histogram 
    chart = chart.configure_title(fontSize=18, font='sans-serif', anchor='middle', color='gray').configure_axis(labelFontSize=12, titleFontSize=14).configure_legend(orient='top-right')
    return chart.to_json()


def getNumPlacesAndDf(rounded_lats, rounded_lons, lat_str, lon_str, cali_polygon):
    cur_df = pd.DataFrame(columns=[lat_str, lon_str])
    for lat in rounded_lats:
        for lon in rounded_lons:
            p = process_points(lon, lat)
            if cali_polygon.contains(p):
                to_append = [lat, lon]
                a_series = pd.Series(to_append, index = cur_df.columns)
                cur_df = cur_df.append(a_series, ignore_index=True)
    return {'num_places': cur_df.shape[0], 'places_df': cur_df}

def process_points(lon, lat):
    return Point(lon, lat)

def process_missing_data_line(miss_time, df_zone, all_dates_df, min_dict, max_dict, cali_polygon):
    rdf = pd.DataFrame(columns = ['time_utc', 'coverage', 'pct_miss', 'resolution'])
    num_places_track = {
        0.1 : {},
        0.2 : {},
        0.5 : {},
        1.0 : {},
    }
    for resolution in [0.1, 0.2, 0.5, 1.0, 'Zone']:
        if resolution == 'Zone':
            tmp_df_zone = df_zone.copy()
            num_places = 16
            tmp_df_zone['time_utc'] = tmp_df_zone['time_utc'].astype(str)
            cur_df = tmp_df_zone.groupby(['time_utc', 'BZone']).size().reset_index()
        else:
            if resolution == 0.1:
                lat_str = 'rn_lat_1'
                lon_str = 'rn_lon_1'
            elif resolution == 0.2:
                lat_str = 'rn_lat_2'
                lon_str = 'rn_lon_2'
            elif resolution == 0.5:
                lat_str = 'rn_lat_5'
                lon_str = 'rn_lon_5'
            elif resolution == 1.0:
                lat_str = 'rn_lat'
                lon_str = 'rn_lon'

            min_lat = min_dict[lat_str]
            max_lat = max_dict[lat_str]

            min_lon = min_dict[lon_str]
            max_lon = max_dict[lon_str]

            rounded_lats = np.arange(min_lat, max_lat, resolution).tolist()
            rounded_lons = np.arange(min_lon, max_lon, resolution).tolist()

            num_places_track[resolution] = getNumPlacesAndDf(rounded_lats, rounded_lons, lat_str, lon_str, cali_polygon)
            num_places = num_places_track[resolution]['num_places']
            cur_df = miss_time.groupby(['time_utc', lat_str, lon_str]).size().reset_index()

        coverage_df = cur_df.groupby(['time_utc']).size().reset_index().rename({0: "coverage"}, axis=1)
        coverage_df = coverage_df.merge(all_dates_df, on='time_utc', how='right').fillna(0)
        
        cov_list = np.array([min(val, num_places) for val in coverage_df['coverage'].tolist()])
        coverage_df['pct_miss'] = (num_places - cov_list) / num_places
        coverage_df['Resolution'] = [resolution] * len(coverage_df)
        coverage_df['num_places'] = [num_places] * len(coverage_df)
        rdf = pd.concat([rdf, coverage_df], ignore_index=True, sort=False)
    
    return rdf


def create_missing_data_line(df):
    scale = alt.Scale(
       domain=[1.0, .9, .50],
       range=['darkred', 'orange', 'green'],
       type='linear'
    )
    chart = alt.Chart(df).mark_line().encode(
        x=alt.X('yearmonth(time_utc):T', title='Time'),
        y=alt.Y('mean(pct_miss):Q', title = 'Percent Missing', axis=alt.Axis(format='%')),
        color=alt.Color('mean(pct_miss)', title='Percent Missing', scale=scale),
        strokeDash='Resolution:N',
        tooltip='Resolution:N'
    ).properties(title = 'Percent Missing Over Time', width=700, height=400).configure_title(fontSize=20,
                                                        font='sans-serif',
                                                        anchor='middle',
                                                        color='gray',
                                                        ).configure_axis(
                                                            labelFontSize=12,
                                                            titleFontSize=14
                                                        )
    return chart

def get_missing_data_line(miss_time, df_zone, all_dates_df, min_dict, max_dict, cali_polygon):
    data = process_missing_data_line(miss_time, df_zone, all_dates_df, min_dict, max_dict, cali_polygon)
    line_chart = create_missing_data_line(data)
    return line_chart

