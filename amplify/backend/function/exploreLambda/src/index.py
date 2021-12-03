from flask_cors import CORS
from flask import Flask
import awsgi
import boto3
import json

app = Flask(__name__)
CORS(app)

# Constant variable with path prefix
BASE_ROUTE = "/explore"

def handler(event, context):
  return awsgi.response(app, event, context)

@app.route(BASE_ROUTE, methods=['GET'])
def connect_to_s3():
  # PUll down chart json
  s3 = boto3.resource('s3')
  content_object = s3.Object('methane-capstone', 'models/autoencoder/loss_compare_1.json')
  file_content = content_object.get()['Body'].read().decode('utf-8')
  json_content = json.loads(file_content)
  return json_content
