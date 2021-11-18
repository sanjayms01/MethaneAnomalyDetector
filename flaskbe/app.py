from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
import s3fs
import time
from datetime import datetime
from collections import Counter
import altair as alt
import geopandas as gpd
import geojson
import json

#Local Imports
from explore import get_data_shape, get_bar_zone_split, get_feature_dashboard, get_vista_ca_dashboard

app = Flask(__name__)
alt.data_transformers.disable_max_rows()


#Bring in Data

#DF_ALL

print("DF_ALL LOAD")
start = time.time()
all_file_path = '/home/ubuntu/s3_data/combined-raw-facility-oil-weather.parquet.gzip'
df_all = pd.read_parquet(all_file_path)
df_all['time_utc'] = pd.to_datetime(df_all['time_utc'])
df_all['year_month'] = df_all.year_month.astype(str)
df_all['BZone'] = pd.to_numeric(df_all['BZone'])
print(df_all.shape)
print(df_all.dtypes)
end = time.time()
print("Load time", end-start)
print()

#DF_ZONE
print("DF_ZONE LOAD")
start = time.time()
zone_file_path = '/home/ubuntu/s3_data/data-zone-combined.parquet.gzip'
df_zone = pd.read_parquet(zone_file_path)
df_zone['time_utc'] = pd.to_datetime(df_zone['time_utc'])
df_zone['BZone'] = pd.to_numeric(df_zone['BZone'])
print(df_zone.shape)
print(df_zone.dtypes)
end = time.time()
print("Load time", end-start)


#GPD Data

#Read new file
c_zone_path = '/home/ubuntu/resources/ca_building_climate_zones.geojson'
cl_gdf = gpd.read_file(c_zone_path)
city_rep = {
    '1': 'Arcata',
    '2': 'Santa Rosa',
    '3': 'Oakland',
    '4': 'San Jose-Reid',
    '5': 'Santa Maria',
    '6': 'Torrance',
    '7': 'San Diego-Lindbergh',
    '8': 'Fullerton',
    '9': 'Burbank-Glendale',
    '10':'Riverside',
    '11': 'Red Bluff',
    '12':'Sacramento',
    '13':'Fresno',
    '14':'Palmdale',
    '15':'Palm Spring-Intl',
    '16':'Blue Canyon'
}

cl_gdf.insert(2, 'rep_city', [city_rep[x] for x in cl_gdf['BZone']])
cl_gdf['BZone'] = pd.to_numeric(cl_gdf['BZone'])
cl_gdf['center_lat'] = cl_gdf.geometry.centroid.y
cl_gdf['center_lon'] = cl_gdf.geometry.centroid.x
cl_gdf = cl_gdf.sort_values('BZone', ascending=True)



#VISTA CA
print("NON_OIL_DF LOAD")
non_oil_df = pd.read_parquet('/home/ubuntu/s3_data/non-oil-vista-zone.parquet.gzip')
print(non_oil_df.shape)
print(non_oil_df.dtypes)


#CA GEOJSON
ca_geo_json_path = "/home/ubuntu/resources/california.geojson"
with open(ca_geo_json_path) as json_file:
    geojson_data = geojson.load(json_file)
ca_poly = geojson_data['geometry']
ca_gdf = gpd.read_file(ca_geo_json_path)
ca_choro_json = json.loads(ca_gdf.to_json())
ca_choro_data = alt.Data(values=ca_choro_json['features'])

# Create Base CA Map
ca_base = alt.Chart(ca_choro_data).mark_geoshape(
    color='lightgrey',
    opacity=0.3,
    stroke='black',
    strokeWidth=1
).encode().properties(
    width=500,
    height=500
)


@app.route("/")
def route_homepage():
    return jsonify({"zone": get_data_shape(df_zone),
                    "all" : get_data_shape(df_all),
                    "climate_zones" : get_data_shape(cl_gdf),
                    "ca_geo": get_data_shape(ca_gdf),
                    "non_oil_df" : get_data_shape(non_oil_df)

                    })

@app.route("/get_bar_zone_split")
def route_get_bar_zone_split():
    return jsonify({"chart": get_bar_zone_split(df_all)})


@app.route("/get_feature_dashboard")
def route_get_feature_dashboard():
    
    time_feature = request.args.get("tfeat")
    bar_feature = request.args.get("bfeat")

    #time_feature = req_tf if req_tf else 'reading_count'
    #bar_feature = req_bf if req_bf else 'methane_mixing_ratio_bias_corrected_mean'
   
    return jsonify({"chart": get_feature_dashboard(df_zone, cl_gdf, time_feature, bar_feature)})



@app.route("/get_vista_ca_dashboard")
def route_get_vista_ca_dashboard():

    return jsonify({"chart": get_vista_ca_dashboard(non_oil_df, cl_gdf, ca_base)})





if __name__ == "__main__":
    app.run(host='0.0.0.0')
