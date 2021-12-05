import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import altair as alt
import numpy as np

#Local Imports
from explore import get_data_shape, get_bar_zone_split, \
                    get_feature_dashboard, get_vista_ca_dashboard, \
                    get_missing_data_dashboard

from product import get_anomaly_df, get_recent_line_chart, \
                    get_product_line_chart, get_methane_map, \
                    get_recent_tweets, is_in_california, get_address_chart

from patternPrint import printDiamond
from classes.dataLoader import DataLoader
from classes.chartLoader import ChartLoader
from classes.webapp_anomalyinference import AnomalyDetector

app = Flask(__name__)
CORS(app)

alt.data_transformers.disable_max_rows()

### Pre-Defined Loaders
DL = DataLoader()
CL = ChartLoader(DL)
AD = AnomalyDetector(DL)

zone_id_list = DL.cl_gdf['BZone'].tolist()
region_poly_list = DL.cl_gdf['geometry'].tolist()

printDiamond("READY TO SERVE")

####### UTILITY ROUTES #######

@app.route("/")
def route_homepage():
    '''Health check that data is loaded and Flask server is up'''
    return jsonify({"zone": get_data_shape(DL.df_zone),
                    "all" : get_data_shape(DL.df_all),
                    "climate_zones" : get_data_shape(DL.cl_gdf),
                    "ca_geo": get_data_shape(DL.ca_gdf),
                    "non_oil_df" : get_data_shape(DL.non_oil_df),
                    "miss_time": get_data_shape(DL.miss_time),
                    "all_dates_df": get_data_shape(DL.all_dates_df),
                    })

@app.route("/get_date_range")
def route_get_date_range():
    '''Get start and end date range of data in use'''
    return jsonify({'dates': DL.get_date_range()})


####### EXPLORE ROUTES #######

@app.route("/get_bar_zone_split")
def route_get_bar_zone_split():
    '''Section 1: Bar Chart'''
    return jsonify({"chart": get_bar_zone_split(DL.df_all)})

@app.route("/get_feature_dashboard")
def route_get_feature_dashboard():
    '''Section 2: Data Comparison Dashboard'''
    time_feature = request.args.get("tfeat")
    bar_feature = request.args.get("bfeat")
    return jsonify({"chart": get_feature_dashboard(DL, time_feature, bar_feature)})

@app.route("/get_missing_data_dashboard")
def route_get_missing_data_dashboard():
    '''Section 3: Missing Data Analysis Dashboard'''
    resolution = request.args.get("reso")
    resolution = "Zone" if resolution == "Zone" else float(resolution)
    freq = request.args.get("freq")
    return jsonify({"chart": get_missing_data_dashboard(DL, resolution, freq)})

@app.route("/get_missing_data_line")
def route_get_missing_data_line():
    '''Section 3: Missing Data Line Chart, by resolution'''
    return jsonify({"chart": CL.missing_data_line_chart.to_json()})

@app.route("/get_vista_ca_dashboard")
def route_get_vista_ca_dashboard():
    '''Section 4: Methane Emitters Dashboard'''
    return jsonify({"chart": get_vista_ca_dashboard(DL)})


####### PRODUCT ROUTES #######

@app.route("/get_location_check")
def route_get_location_check():
    '''Check (lat, lng) is in CA'''
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    return jsonify({"result": is_in_california(DL, lat, lng, zone_id_list, region_poly_list)})

@app.route("/get_anomaly_df")
def route_get_anomaly_df():
    '''Get anomalies dataframe by climate zone or address locale'''
    args = request.args

    if 'zone' in args:
        z = int(request.args.get('zone'))
        return jsonify({"table": get_anomaly_df(DL, z=z)})
    elif 'lat' in args and 'lon' in args:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))

        if lat != None and lon != None:
            df = AD.get_results(lat, lon)
            return jsonify({"table": get_anomaly_df(DL, df=df)})
    
    return jsonify({"table": {}})


@app.route("/get_recent_line_chart")
def route_get_recent_line_chart():
    '''Get line chart of methane anomalies last 6 months by zone or address locale'''
    args = request.args
    if 'zone' in args:
        z = int(request.args.get('zone'))
        return jsonify({"chart": get_recent_line_chart(DL, z=z)})
    elif 'lat' in args and 'lon' in args:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))

        if lat != None and lon != None:
            df = AD.get_results(lat, lon)
            return jsonify({"chart": get_recent_line_chart(DL, df=df)})
    
    return jsonify({"chart": {}})

@app.route("/get_product_line_chart")
def route_get_product_line_chart():
    '''Get long tail line chart of methane anomalies last 3 years by zone or address locale'''
    args = request.args
    if 'zone' in args:
        z = int(request.args.get('zone'))
        return jsonify({"chart": get_product_line_chart(DL, z=z)})
    elif 'lat' in args and 'lon' in args:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))

        if lat != None and lon != None:
            df = AD.get_results(lat, lon)
            return jsonify({"chart": get_product_line_chart(DL, df=df)})

    return jsonify({"chart": {}})

@app.route("/get_methane_map")
def route_get_methane_map():
    '''Get map of CA highlighting either zone or address locale with methane averages in last 6 months'''
    args = request.args
    if 'zone' in args:
        z = int(request.args.get('zone'))
        return jsonify({"chart": get_methane_map(DL, z=z)})
    elif 'lat' in args and 'lon' in args:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))

        if lat != None and lon != None:
            return jsonify({"chart": get_methane_map(DL, lat=lat, lon=lon, zone_id_list=zone_id_list, region_poly_list=region_poly_list)})
            
    return jsonify({"chart": {}})

@app.route("/get_recent_tweets")
def route_get_recent_tweets():
    '''Get real time Twitter feed of methane news in CA'''
    return get_recent_tweets()

#@app.route("/get_address_anomalies")
#def route_get_address_anomalies():
#    lat = float(request.args.get('lat'))
#    lon = float(request.args.get('lon'))

#    rounded_lon = np.round(lon * 2) / 2
    # chart = get_address_chart(AD)
#    result = AD.get_results(rounded_lat, rounded_lon)
    # result ===> final_dataframes = {zone: {'train': None, 'test': None}}
#    return jsonify({'data': result})

if __name__ == "__main__":
    app.run(host='0.0.0.0')
