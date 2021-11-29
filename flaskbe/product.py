# FOR WEB APP PRODUCT PAGE
from datetime import date, timedelta
from flask import Blueprint, request
from flask.json import jsonify

import altair as alt
import pandas as pd
import numpy as np
import geopandas as gpd


#Methane
ven_red = '#C91414'
cad_ed ='#E3071D'
amber ='#FF7E01'
flu_orange ='#FFBE00'
bud_green ='#75AD6F'
dark_green ='#1D7044'

feature_names = {
        'methane_mixing_ratio_bias_corrected_mean': "Methane (ppb)",
        'reading_count': "Reading Count",
        'air_pressure_at_mean_sea_level_mean': "Sea Level Air Pressure (Pa)",
        'eastward_wind_at_100_metres_mean': "Eastward Wind (m/s)",
        'northward_wind_at_100_metres_mean': "Northward Wind (m/s)",
        'air_temperature_at_2_metres_mean': "Air Temperature (K)",
        'surface_air_pressure_mean': "Surface Air Pressure (Pa)",  

        'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean': "Solar Radiation (J/m2)",

        'precipitation_amount_1hour_Accumulation_mean': "Precipitation (m)",
        'dew_point_temperature_at_2_metres_mean': "Dew Point Temperature (K)"
        }

# Disable max_rows in altair
alt.data_transformers.disable_max_rows()

##### RETRIEVE DATA #####

def getAnomalyData(DL, zone):
    df = pd.concat([DL.final_anomalies_df[zone]['train'],DL.final_anomalies_df[zone]['val'],DL.final_anomalies_df[zone]['test']])
    return df

# gets last 180 days of data for recent methane anomaly visuals
def getRecentAnomalyData(DL, zone):
    df = getAnomalyData(DL, zone)
    df_last_180 = df.loc[str(date.today() - timedelta(days=180)):str(date.today())]
    
    return df_last_180


##### CREATE VISUALS ######


# returns a chart of recent anomalies
def get_anomaly_df(DL, z):
    df_viz = getAnomalyData(DL, z)
    metric = 'methane_mixing_ratio_bias_corrected_mean'
    metric_a = metric+'_anomaly'

    anomaly_count = 0
    anomaly_cluster_count = 0
    start_date_list = []
    end_date_list = []

    for i in range(len(df_viz)-1):
        if df_viz[metric_a][i] == False:
            continue
        elif df_viz[metric_a][i] == True:
            if anomaly_count == 0:
                anomaly_cluster_count += 1
                start_date_list.append(df_viz.index[i])
                if df_viz[metric_a][i+1] == False:
                    end_date_list.append(df_viz.index[i])
            elif df_viz[metric_a][i-1] == False:
                anomaly_cluster_count += 1
                start_date_list.append(df_viz.index[i])
                if df_viz[metric_a][i+1] == False:
                    end_date_list.append(df_viz.index[i])
            elif df_viz[metric_a][i+1] == False:
                end_date_list.append(df_viz.index[i])
            anomaly_count += 1
            
    if len(end_date_list) < len(start_date_list):
        end_date_list.append(df_viz.index[-1])

            
    a = pd.DataFrame(columns=['Anomaly Start Date', 'Anomaly End Date', 'Minimum Methane', 'Maximum Methane', 'Average Methane'])

    for i in range(len(start_date_list)):
        df_small = df_viz[(df_viz.index >= start_date_list[i]) & (df_viz.index <= end_date_list[i])]
        a = a.append({'Anomaly Start Date': str(start_date_list[i])[:10], 'Anomaly End Date': str(end_date_list[i])[:10],
                  'Minimum Methane': min(df_small[metric]), 'Maximum Methane': max(df_small[metric]),
                 'Average Methane': np.mean(df_small[metric])}, ignore_index = True)

    return a.iloc[::-1].to_json(orient='records')
    


# returns recent methane readings and loss, highlighting anomalies
def get_recent_line_chart(DL, z):

    zone_data = getAnomalyData(DL, z)
    df_viz = zone_data.loc[str(date.today() - timedelta(days=180)):str(date.today())]

    #Time Selection
    brush = alt.selection(type='interval', encodings=['x'])

    # Data
    df_viz = df_viz.reset_index()


    #Flag to include timestamp ticks
    show_ts = True

    #Features
    feature = 'methane_mixing_ratio_bias_corrected_mean'
    feat_loss_col = feature+'_loss'
    feat_anom_col = feature+'_anomaly'
    feat_thresh_col = feature+'_threshold'


    ### ACTUAL READINGS ####

    #Actual Points
    act_points = alt.Chart(df_viz).mark_circle(size=50, tooltip=True).encode(
        x = alt.X('time_utc:T', axis=alt.Axis(labels=show_ts)),
        y= alt.Y(f'{feature}:Q', scale=alt.Scale(zero=False)),    
        color=alt.condition(brush, 
                                alt.Color(f'{feat_anom_col}:N',
                                          title='Anomaly',
                                          scale=alt.Scale(
                                              domain=[False, True],
                                              range=[dark_green, ven_red])),
                                alt.value('lightgray')),
        shape=alt.Shape(f'{feat_anom_col}:N', scale=alt.Scale(range=['cross', 'circle'])),
        size=alt.Size(f'{feat_anom_col}:N', scale=alt.Scale(range=[20,100]), title='Anomaly', 
                      legend = None),
        tooltip=[alt.Tooltip('time_utc', title='Date'),
                 alt.Tooltip(feat_anom_col, title='Anomaly'),
                 alt.Tooltip(feature, title=f'{feature_names[feature]}', format=',.2f')]

        ).add_selection(brush)

    #Actual Line
    act_line = alt.Chart(df_viz).mark_line(color='lightgrey').encode(
        x = alt.X('time_utc:T', title = 'Date', axis=alt.Axis(labels=show_ts)),
        y = alt.Y(f'{feature}:Q', title=feature_names[feature], scale=alt.Scale(zero=False)),
    )
    
    
    act = (act_line+act_points).properties(title = f"Methane", width=800, height= 250)
    
    #### LOSS ####
    
    #Loss Points
    points = alt.Chart(df_viz, title = f"Autoencoder Loss").mark_circle(size=50, tooltip=True).encode(
        x = alt.X('time_utc:T', axis=alt.Axis(labels=show_ts)),
        y= alt.Y(f'{feat_loss_col}:Q'),    
        color=alt.condition(brush, 
                                alt.Color(f'{feat_anom_col}:N',
                                          title='Anomaly',
                                          scale=alt.Scale(
                                              domain=[False, True],
                                              range=[dark_green, ven_red])),
                                alt.value('lightgray')),
        shape=alt.Shape(f'{feat_anom_col}:N', scale=alt.Scale(range=['cross', 'circle'])),
        size=alt.Size(f'{feat_anom_col}:N', scale=alt.Scale(range=[20,70]), title='Anomaly', legend = None),
        tooltip=[alt.Tooltip('time_utc', title='Date'),
                 alt.Tooltip(feat_anom_col, title='Anomaly'),
                 alt.Tooltip(feat_loss_col, title=f'{feature_names[feature]} Loss', format=',.5f')]
        ).add_selection(brush)



    #Loss Line
    line = alt.Chart(df_viz).mark_line(color='lightgrey').encode(
        x = alt.X('time_utc:T', title = 'Date', axis=alt.Axis(labels=show_ts)),
        y = alt.Y(f'{feat_loss_col}:Q', title=feature_names[feature]+' Loss')
    )

    #Anom Thresh
    rule = alt.Chart(df_viz).mark_rule(color=flu_orange, strokeDash=[10], tooltip =True).encode(
            y=alt.Y(f'{feat_thresh_col}:Q'),
            size=alt.value(2),
        tooltip=[alt.Tooltip(feat_thresh_col, title='Anomaly Threshold', format=',.3f')]
    )

    loss = (line + rule+ points).properties(title = f"Model Loss", width=800, height= 150)
    
    
    #### CONFIGURATION HERE ####
    
  
    chart = alt.vconcat(act, loss).configure_title(
                                                            fontSize=20,
                                                            font='sans-serif',
                                                            anchor='middle',
                                                            color='gray',
                                                        ).configure_axis(
                                                            labelFontSize=12,
                                                            titleFontSize=14
                                                        )
    
    return chart.to_json()

    
def get_methane_map(DL, z):

    df = DL.df_all.set_index('time_utc')
    df = df.reset_index()[['time_utc','rn_lat_1', 'rn_lon_1', 'methane_mixing_ratio_bias_corrected']]

    df_meth = df.set_index('time_utc')
    df_meth = df_meth.loc[str(date.today() - timedelta(days=180)):str(date.today())]
    df_meth = df_meth.groupby(['rn_lat_1', 'rn_lon_1']).mean().reset_index()

    scale = alt.Scale(
        domain=[1850, 1900],
        range=[dark_green, flu_orange, ven_red],
        type='linear',
    )

    meth = alt.Chart(df_meth).mark_square(size=20).encode(
        latitude='rn_lat_1',
        longitude='rn_lon_1',
        color=alt.Color('methane_mixing_ratio_bias_corrected', title='Methane (ppb)', scale=scale,
                       legend=alt.Legend(orient='none',
            legendX=280, legendY=20,
            direction='vertical',
            titleAnchor='middle',
            titleFontSize = 12))
    ).properties(
            width=400,
            height=400
        )

    other_zone_shapes = DL.cl_gdf[DL.cl_gdf['BZone']!=z]
    zone_shape = DL.cl_gdf[DL.cl_gdf['BZone']==z]


    ca_base = alt.Chart(DL.ca_choro_data).mark_geoshape(
        color='grey',
        fillOpacity=0,
        stroke='black',
        strokeWidth=2
    ).encode().properties(
        width=400,
        height=400
    )

    other_zone_base = alt.Chart(other_zone_shapes['geometry']).mark_geoshape(
            color='white',
            opacity = 0.7,
            stroke='white',
            strokeWidth=1).encode().properties(
            width=400,
            height=400
        )


    zone_base = alt.Chart(zone_shape['geometry']).mark_geoshape(
            color='white',
            fillOpacity = 0,
            stroke='black',
            strokeWidth=1).encode().properties(
            width=400,
            height=400
        )

    
    #### CONFIGURATION HERE ####

    layer = alt.layer(
        meth,
        other_zone_base,
        zone_base,
        ca_base
    ).properties(
        title=f'Recent Methane Reading Average Across Zone {z}',
    ).configure_title(
                    fontSize=20,
                    font='sans-serif',
                    anchor='middle',
                    color='gray',
                ).configure_axis(
                    labelFontSize=12,
                    titleFontSize=14
                )

    return layer.to_json()



def get_product_line_chart(DL, z):

    df_viz = getAnomalyData(DL, z)

    #Time Selection
    brush = alt.selection(type='interval', encodings=['x'])
    
    
    # Data
    df_viz = df_viz.reset_index()


    #Flag to include timestamp ticks
    show_ts = True

    #Features
    feature = 'methane_mixing_ratio_bias_corrected_mean'
    feat_loss_col = feature+'_loss'
    feat_anom_col = feature+'_anomaly'
    feat_thresh_col = feature+'_threshold'
    
    
    
    full_lines = alt.Chart(df_viz).mark_line(color='lightgrey').encode(
        x = alt.X('time_utc:T', title = 'Date', axis=alt.Axis(labels=show_ts)),
        y = alt.Y(f'{feature}:Q', title=feature_names[feature], scale=alt.Scale(zero=False))
    )
    
    
    full_points = alt.Chart(df_viz).mark_circle(size=50, tooltip=True).encode(
        x = alt.X('time_utc:T', axis=alt.Axis(labels=show_ts)),
        y= alt.Y(f'{feature}:Q', scale=alt.Scale(zero=False)),    
        color=alt.condition(brush, 
                                alt.Color(f'{feat_anom_col}:N',
                                          title='Anomaly',
                                          scale=alt.Scale(
                                              domain=[False, True],
                                              range=[dark_green, ven_red])),
                                alt.value('lightgray')),
        shape=alt.Shape(f'{feat_anom_col}:N', scale=alt.Scale(range=['cross', 'circle'])),
        size=alt.Size(f'{feat_anom_col}:N', scale=alt.Scale(range=[20,100]), title='Anomaly', 
                      legend = None),
        tooltip=[alt.Tooltip('time_utc', title='Date'),
                 alt.Tooltip(feat_anom_col, title='Anomaly'),
                 alt.Tooltip(feature, title=f'{feature_names[feature]} Loss', format=',.5f')]

        )
    
    full = full_lines+ full_points
    full = full.add_selection(alt.selection_single())
    
    full_chart = full.properties(
        height=60, width=1000, title="Select a Time Frame Below to Zoom In"
    ).add_selection(brush)
    
    filter_lines = full_lines.encode(
        alt.X('time_utc:T', title = 'Date', scale=alt.Scale(domain=brush), axis=alt.Axis(labels=show_ts))
    ).properties(
        height=300, width=1000, title = "Methane"
    )
    
    
    filter_points = full_points.encode(
        alt.X('time_utc:T', scale=alt.Scale(domain=brush), axis=alt.Axis(labels=show_ts)),
        tooltip=[alt.Tooltip('time_utc', title='Date'),
                 alt.Tooltip(feat_anom_col, title='Anomaly'),
                 alt.Tooltip(feature, title=f'{feature_names[feature]} Loss', format=',.5f')]
    )
    
    
    
    
    filter_chart = filter_lines+filter_points
    
    
    #### CONFIGURATION HERE ####
    
    chart = alt.vconcat(full_chart, filter_chart).configure_title(
                                                            fontSize=20,
                                                            font='sans-serif',
                                                            anchor='middle',
                                                            color='gray',
                                                        ).configure_axis(
                                                            labelFontSize=12,
                                                            titleFontSize=14
                                                        )
    

    return chart.to_json()
    




