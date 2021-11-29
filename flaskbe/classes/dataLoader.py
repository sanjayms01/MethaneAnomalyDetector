import time
import pandas as pd
import geopandas as gpd
import geojson
import json
import altair as alt
import warnings
import boto3
import pickle

warnings.filterwarnings("ignore")
print()

class DataLoader:
    def __init__(self,):
        self.df_all = self.load_df_all()
        self.df_zone = self.load_df_zone()
        self.miss_time, self.min_dict, self.max_dict = self.create_miss_time()
        self.all_dates_df = self.create_all_dates_df()
        self.cl_gdf = self.load_cl_gdf()
        self.non_oil_df = self.load_vista_ca()
        self.ca_base, self.cali_polygon, self.ca_gdf, self.ca_choro_data = self.load_ca_gdf()
        self.final_anomalies_df = self.load_final_anomalies_df()

    def load_df_all(self):
        ''' Load All Features DataFrame'''
        start = time.time()
        all_file_path = '/home/ubuntu/s3_data/combined-raw-facility-oil-weather.parquet.gzip'
        df_all = pd.read_parquet(all_file_path)
        df_all['time_utc'] = pd.to_datetime(df_all['time_utc'])
        df_all['year_month'] = df_all.year_month.astype(str)
        df_all['BZone'] = pd.to_numeric(df_all['BZone'])
        end = time.time()
        print("load_df_all: ", end-start)
        return df_all

    def load_df_zone(self):
        ''' Load Zone DataFrame'''
        start = time.time()
        zone_file_path = '/home/ubuntu/s3_data/data-zone-combined.parquet.gzip'
        df_zone = pd.read_parquet(zone_file_path)
        df_zone['time_utc'] = pd.to_datetime(df_zone['time_utc'])
        df_zone['BZone'] = pd.to_numeric(df_zone['BZone'])
        end = time.time()
        print("load_df_zone: ", end-start)
        return df_zone


    def load_cl_gdf(self):
        ''' Load Climate Zone GeoJSON'''
        start = time.time()
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
        end = time.time()
        print("load_cl_gdf: ", end-start)
        return cl_gdf

    def load_vista_ca(self):
        '''Load Vista CA, non oil wells, DataFrame'''
        start = time.time()
        non_oil_df = pd.read_parquet('/home/ubuntu/s3_data/non-oil-vista-zone.parquet.gzip')        
        end = time.time()
        print("load_vista_ca: ", end-start)
        return non_oil_df


    def load_ca_gdf(self):
        '''Load CA GeoJSON, create CA Base Map and Polygon'''
        start = time.time()
        ca_geo_json_path = "/home/ubuntu/resources/california.geojson"            
        ca_gdf = gpd.read_file(ca_geo_json_path)
        cali_polygon = ca_gdf['geometry'][0]
        ca_choro_json = json.loads(ca_gdf.to_json())
        ca_choro_data = alt.Data(values=ca_choro_json['features'])
        ca_base = alt.Chart(ca_choro_data).mark_geoshape(
            color='lightgrey',
            opacity=0.3,
            stroke='black',
            strokeWidth=1
        ).encode()

        end = time.time()
        print("load_ca_gdf: ", end-start)
        return ca_base, cali_polygon, ca_gdf, ca_choro_data


    def create_miss_time(self):
        start = time.time()
        miss_time = self.df_all[['time_utc', 'year_month', 
                                 'rn_lat_1', 'rn_lon_1', 
                                 'rn_lat_2', 'rn_lon_2', 
                                 'rn_lat_5', 'rn_lon_5', 
                                 'rn_lat', 'rn_lon']]
        miss_time['time_utc'] = miss_time['time_utc'].dt.date.astype(str)
        max_dict = dict(miss_time.max())
        min_dict = dict(miss_time.min())

        end = time.time()
        print("create_miss_time: ", end-start)
        return miss_time, min_dict, max_dict

    def create_all_dates_df(self):
        start = time.time()
        all_dates = pd.period_range(self.min_dict['time_utc'], self.max_dict['time_utc']).to_series().astype(str)
        all_dates_df = pd.DataFrame({'time_utc': all_dates.tolist()})
        end = time.time()
        print("create_miss_time: ", end-start)
        return all_dates_df

    def load_final_anomalies_df(self):
        final_path = '/home/ubuntu/s3_data/final_dataframes.pickle'
        with open(final_path, 'rb') as f:
            final_dataframes = pickle.load(f)

        return final_dataframes


    def get_date_range(self):
        print("GET RANGE")
        start_dt = self.df_all['time_utc'].min().strftime('%Y%M%d')
        end_dt = self.df_all['time_utc'].max().strftime('%Y%M%d')
        print("GET RANGE", start_dt, end_dt)
        result = {'start_dt': start_dt, 'end_dt': end_dt}
        return result




