from explore import get_missing_data_line

class ChartLoader:
    def __init__(self, dataLoader):
        self.dataLoader = dataLoader
        self.missing_data_line_chart = get_missing_data_line(self.dataLoader.miss_time, 
                                                             self.dataLoader.df_zone, 
                                                             self.dataLoader.all_dates_df,
                                                             self.dataLoader.min_dict, 
                                                             self.dataLoader.max_dict,
                                                             self.dataLoader.cali_polygon
                                                            )
