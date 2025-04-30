
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='my-very-secret-key',
    SQLALCHEMY_DATABASE_URI='sqlite:///users.db',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

db = SQLAlchemy(app)
login_manager = LoginManager(app)

import backend_core.models
import backend_core.auth
import backend_core.routes

from backend_core.models import User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
