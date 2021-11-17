from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment

from blueprints.product import product_bp
from blueprints.explore import explore_bp

app = Flask(__name__)

CORS(app) #comment this on deployment
api = Api(app)

app.register_blueprint(product_bp)
app.register_blueprint(explore_bp)
