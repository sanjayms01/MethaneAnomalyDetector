import time
import pandas as pd
import warnings
import pickle
import tensorflow as tf
import numpy as np
import math
from datetime import timedelta, date

warnings.filterwarnings("ignore")

class AnomalyDetector:
    
    def __init__(self, DL):
        
        #inputs to class
        self.DL = DL
        self.feature_cols = ['methane_mixing_ratio_bias_corrected_mean',  'reading_count',
                 'air_pressure_at_mean_sea_level_mean',
                 'eastward_wind_at_100_metres_mean',
                 'northward_wind_at_100_metres_mean',
                 'air_temperature_at_2_metres_mean',
                 'surface_air_pressure_mean',
                 'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation_mean',
                 'precipitation_amount_1hour_Accumulation_mean' ,
                 'dew_point_temperature_at_2_metres_mean']  
        
        self.window_length = 7
        
        #pretrained models
        self.model_tracker={
            1: self.load_models(1),
            2: self.load_models(2),
            3: self.load_models(3),
            4: self.load_models(4),
            5: self.load_models(5),
            6: self.load_models(6),
            7: self.load_models(7),
            8: self.load_models(8),
            9: self.load_models(9),
            10: self.load_models(10),
            11: self.load_models(11),
            12: self.load_models(12),
            13: self.load_models(13),
            14: self.load_models(14),
            15: self.load_models(15),
            16: self.load_models(16)
        }        

    #data stats
    def get_missing_stats(self, df_train, df_test):
        missing_df_pct, missing_train_data_pct, missing_test_data_pct = self.missing_data(df_train, df_test)
        return {'missing_df_pct': missing_df_pct , 
                'missing_train_data_pct': missing_train_data_pct,
                'missing_test_data_pct': missing_test_data_pct
                }


    def get_results(self, lat, lon, test_synthetic):
        # RN_Lat_5
        lat = np.round(lat * 2) / 2

        # RN_Lon_5
        lon = np.round(lon * 2) / 2

        print('LAT LON', lat, lon)
        df_train, df_test, zone = self.load_df_processed(lat, lon, test_synthetic)
        print('ZONE', zone)
        loss_tracker, test_score_df, test_anomalies, anomaly_threshold = self.anomaly_model(df_train, df_test, zone)
        print('Finished running models')
        final_dataframes = self.visual_df(df_train, df_test, zone, loss_tracker, test_score_df, test_anomalies, anomaly_threshold)

        # Concat train and test dataframes
        concat_df = final_dataframes[zone]['train'].append(final_dataframes[zone]['test'])
        print('Created final concatenated dataframe')

        # Correct anomaly thresholds
        final_df = self.threshold_correction(concat_df)
        print('Corrected the anomaly thresholds for final dataframe')
        
        return final_df

    ###########################################################    
    ###########################################################        
    def load_df_processed(self, lat, lon, test_synthetic):
        ''' Process dataframe to be model ready'''
        start = time.time()

        df = self.DL.df_all

        #filter by lat/lon 
        col1='rn_lat_5'
        col2='rn_lon_5'
        df_filtered = df[(df[col1]==lat) & (df[col2]==lon)]
        
        #Store most common climate zone
        climate_zone = int(df_filtered.BZone.mode()[0])
        print("CLIMATE_ZONE", climate_zone)
        
        #group data
        df_reduced = df_filtered.groupby('time_utc_hour').agg({'methane_mixing_ratio_bias_corrected': "mean",
                                                 'methane_mixing_ratio': ["count"],
                                                 'air_pressure_at_mean_sea_level': ["mean"],
                                                 'eastward_wind_at_100_metres': ["mean"],
                                                 'northward_wind_at_100_metres': ["mean"],                   
                                                 'air_temperature_at_2_metres': ["mean"],
                                                 'surface_air_pressure': ["mean"],
                                                 'integral_wrt_time_of_surface_direct_downwelling_shortwave_flux_in_air_1hour_Accumulation' : ["mean"],
                                                 'precipitation_amount_1hour_Accumulation': ["mean"],
                                                 'dew_point_temperature_at_2_metres': ["mean"],
                                                })
        df_reduced.columns = ['_'.join(col) for col in df_reduced.columns.values]         #Flatten MultiIndex
        df_reduced = df_reduced.reset_index()
        
        if test_synthetic:
            print('TEST SYNTHETIC')
            print(df_reduced)
            # df_reduced[(df_reduced['BZone']==5) & (df_reduced['time_utc'] == '2021-06-16')]['methane_mixing_ratio_mean']
        
        df_reduced = df_reduced.rename(columns={"methane_mixing_ratio_count": "reading_count"})
        df_reduced.set_index(['time_utc_hour'], inplace=True)


        #also create dataset for last X days
        
        localtime = time.localtime(time.time())
        y = localtime.tm_year
        m = localtime.tm_mon
        d = localtime.tm_mday
        X=180  #Look at last 180 days
        current_date = date(y, m, d)              
        date_treshold = current_date-timedelta(X)        
        
        df_train = df_reduced[df_reduced.index <= str(date_treshold)]
        df_test = df_reduced[df_reduced.index > str(date_treshold)]
        
        end = time.time()
        print("load_df_processed: ", end-start)
        
        return (df_train, df_test, climate_zone)


    # Adjusting anomaly thresholds
    def threshold_correction(self, final_concat_df):
        cur_anomaly_count = final_concat_df['methane_mixing_ratio_bias_corrected_mean_anomaly'].sum()
        total_count = final_concat_df.shape[0]
        cur_anomaly_ratio = cur_anomaly_count / total_count
        
        # Arbitrary 15% anomalies, we will adjust threshold
        if cur_anomaly_ratio > 0.01:
            cur_threshold = final_concat_df.methane_mixing_ratio_bias_corrected_mean_threshold[0]
            max_loss = final_concat_df.methane_mixing_ratio_bias_corrected_mean_loss.max()

            if max_loss - cur_threshold > 2:
                new_threshold = cur_threshold + (math.log(max_loss - cur_threshold))
            else:
                new_threshold = cur_threshold + ((max_loss - cur_threshold) * 0.15)

            final_concat_df['methane_mixing_ratio_bias_corrected_mean_threshold'] = new_threshold
            final_concat_df['methane_mixing_ratio_bias_corrected_mean_anomaly'] = final_concat_df['methane_mixing_ratio_bias_corrected_mean_loss'] > final_concat_df['methane_mixing_ratio_bias_corrected_mean_threshold']

        return final_concat_df

    ###########################################################    
    ########################################################### 
    def missing_data(self, df_train, df_test):
        
        train_days_total = int(str(df_train.index[-1] - df_train.index[0]).split(" ")[0])
        test_days_total = int(str(df_test.index[-1] - df_test.index[0]).split(" ")[0])
        
        train_data_rows = df_train.shape[0]
        test_data_rows = df_test.shape[0]
        
        train_missing =  1- (train_data_rows/train_days_total)
        test_missing = 1- (test_data_rows/test_days_total)
        all_missing = 1- ((train_data_rows+test_data_rows)/(train_days_total+test_days_total))
        
        return (all_missing, train_missing, test_missing)    
    
    ###########################################################    
    ########################################################### 
    def load_models(self, zone):
        ''' Return Standard Scaler and Zone Anomaly Detector Pretrained Models'''
        start = time.time()
        local_path = '/home/ubuntu/models/'

        #PRETRAINED SCALER MODEL
        scaler_file_name = f'ScalerModel_Zone{zone}.pkl'
        scaler_file_path = local_path + scaler_file_name
        # Load pretrained LSTMAE model and Standard Scaler to local sage maker
        scaler_model = pickle.load(open(scaler_file_path, 'rb'))
        
        #PRETRAINED LSTM AE MODEL
        pretrained_file_name = f'LSTMAE_Zone{zone}.h5'
        pretrained_file_path= local_path + pretrained_file_name
        # Load pretrained LSTMAE model to local sage maker
        anomaly_model = tf.keras.models.load_model(pretrained_file_path, compile=False)
        
        end = time.time()
        print("load_models: ", end-start)
        return {'scaler': scaler_model, 'model': anomaly_model}

    ###########################################################    
    ########################################################### 
    def standardize_data(self, df, feature_cols, scaler):
        '''Standard Scaler test data with pretrained model'''
        df_input = df[feature_cols]
        df_scaled = scaler.transform(df_input)

        return df_scaled
    ###########################################################    
    ########################################################### 
    def generate_datasets(self, data, window_size):
        '''Generate trainx and trainy for LSTM AE model'''
        _l = len(data) 
        Xs = []
        Ys = []
        
        for i in range(0, (_l - window_size)):
            # because this is an autoencoder - our Ys are the same as our Xs. No need to pull the next sequence of values
            Xs.append(data[i:i+window_size])
            Ys.append(data[i:i+window_size])

        Xs=np.array(Xs)
        Ys=np.array(Ys)    
        
        return (Xs.shape[2], Xs, Ys)
    ###########################################################    
    ########################################################### 
    def calculate_loss(self, feature_num, model, dataX):
        '''Infer dataset with pretrained model'''
        #Predict data and calculate MSE of the feature (0th feature = methane)    
        pred = model.predict(dataX)[:, :, feature_num]
        truth = dataX[:, :, feature_num]
        mse_loss = np.mean(np.square(pred -  truth), axis=1)     
        
        return mse_loss, pred 
    ###########################################################    
    ########################################################### 
    def generate_anomaly_dataframe(self, train_mse_loss, other_mse_loss, train, other_data):
        '''Create Anomalies Table'''
        upper,lower = np.percentile(train_mse_loss,[75,25])
        ANOMALY_THRESHOLD = 3*(upper-lower)

        other_score_df = pd.DataFrame(index=other_data[self.window_length:].index)
        other_score_df['loss'] = other_mse_loss
        other_score_df['threshold'] = ANOMALY_THRESHOLD
        other_score_df['anomaly'] = other_score_df.loss > other_score_df.threshold

        for feature in self.feature_cols:
            other_score_df[feature] = other_data[self.window_length:][feature]

        other_anomalies = other_score_df[other_score_df.anomaly]

        return other_score_df, other_anomalies, ANOMALY_THRESHOLD
    ###########################################################    
    ########################################################### 
    def anomaly_model(self, df_train, df_test, zone):
        start=time.time()

        #predicting on pretrained model
        print("model inference")
        model_obj = self.model_tracker[int(zone)]
        scaler = model_obj['scaler']
        model = model_obj['model']


        # Track predictions and losses for analysis across different features
        feature_loss_tracker = {zone: {'train':{}, 'val':{}, 'test':{}}}

        #For Modeling
        batch_size = 32
        num_features = len(self.feature_cols)
        epochs = 50
        drop = False

        #Interpolate and dropna if needed
        print("Imputing Data")
        df_train_imputed= df_train.interpolate(method='time')
        df_train_imputed=df_train_imputed.dropna()
        df_test_imputed= df_test.interpolate(method='time')
        df_test_imputed=df_test_imputed.dropna()

        #standardize data
        print("Standardizing Data")
        df_train_scaled = self.standardize_data(df_train_imputed, self.feature_cols, scaler)
        df_test_scaled = self.standardize_data(df_test_imputed, self.feature_cols, scaler)

        #generate trainX and trainY
        print("Generating Datasets")
        num_feats_train, trainX, trainY = self.generate_datasets(df_train_scaled, self.window_length)
        num_feats_test, testX, testY = self.generate_datasets(df_test_scaled, self.window_length)


        feature_number_map = {}    #create feature map for labeling
        for ind, feature in enumerate(self.feature_cols, 0):
            feature_number_map[feature] = ind

        for feature in self.feature_cols:

            #Predict MSE's:
            feature_num = feature_number_map[feature]
            print("Loss: ", feature, feature_num)
            train_mse_loss, X_train_pred = self.calculate_loss(feature_num, model, trainX)
            test_mse_loss, X_test_pred = self.calculate_loss(feature_num, model, testX)
            feature_loss_tracker[zone]['train'].update({feature: {'train_mse_loss': train_mse_loss, 'X_train_pred':X_train_pred }})
            feature_loss_tracker[zone]['test'].update({feature: {'test_mse_loss': test_mse_loss, 'X_test_pred':X_test_pred }})

        # LOOK AT ANOMALIES
        feature = 'methane_mixing_ratio_bias_corrected_mean'
        train_mse_loss = feature_loss_tracker[zone]['train'][feature]['train_mse_loss']
        test_mse_loss = feature_loss_tracker[zone]['test'][feature]['test_mse_loss']
        test_score_df, test_anomalies, ANOMALY_THRESHOLD = self.generate_anomaly_dataframe(train_mse_loss, test_mse_loss, df_train_imputed, df_test_imputed)

        end=time.time()
        print("anomaly_model: ", end-start)
        return (feature_loss_tracker, test_score_df, test_anomalies, ANOMALY_THRESHOLD)
    ###########################################################    
    ###########################################################
    
    def visual_df(self, df_train, df_test, zone, loss_tracker, test_score_df, test_anomalies, anomaly_threshold):
        '''Generate final dataframe for visuals'''
        final_dataframes = {zone: {'train': None, 'test': None}}

        for split, df in zip(['train', 'test'],[df_train, df_test]):

            cur_df = df
            scored_df = pd.DataFrame(index=cur_df[self.window_length:].index)

            for feature in self.feature_cols:
                mse_loss = loss_tracker[zone][split][feature][f'{split}_mse_loss']
                anom_thresh = anomaly_threshold
                scored_df[feature] = cur_df[self.window_length:][feature]
                scored_df[f'{feature}_loss'] = mse_loss
                scored_df[f'{feature}_threshold'] = anom_thresh
                scored_df[f'{feature}_anomaly'] = scored_df[f'{feature}_loss'] > scored_df[f'{feature}_threshold']

            scored_df.index.names = ['time_utc']

            final_dataframes[zone][split] = scored_df
        
        return final_dataframes
