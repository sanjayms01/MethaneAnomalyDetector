from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment

from backend.blueprints.product import product_bp
from backend.blueprints.explore import explore_bp

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')

CORS(app) #comment this on deployment
api = Api(app)

app.register_blueprint(product_bp)
app.register_blueprint(explore_bp)
