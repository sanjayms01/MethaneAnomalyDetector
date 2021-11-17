from flask import Blueprint, request
from flask.json import jsonify
import app
import json
import time
import altair as alt
import pandas as pd
import numpy as np

product_bp = Blueprint('product_bp', __name__)

# Load data
# df = ...

# Disable max_rows in altair
alt.data_transformers.disable_max_rows()

@product_bp.route('/product')
def product():
    example_arg = request.args.get('zone')

    start = time.time()

    data = getFilteredData(example_arg)
    bar_chart = createBarChart(data)

    end = time.time()

    response = {
        'data': data,
        'bar_chart': bar_chart,
        'time_stats': end - start
    }

    return jsonify(response)

def getFilteredData(df):
    # Get the filtered dataframe to create charts
    return

def createBarChart(data):
    # Create the altair bar chart
    barChart = alt.Chart(data)

    return barChart.to_json()