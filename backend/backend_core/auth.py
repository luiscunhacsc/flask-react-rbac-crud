
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user
from backend_core.models import User
from backend_core import app, db

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_pw = generate_password_hash(data['password'], method='sha256')
    new_user = User(name=data['name'], email=data['email'], password=hashed_pw, role=data.get('role', 'user'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully.'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify({'message': 'Logged in successfully.', 'role': user.role, 'name': user.name})
    return jsonify({'message': 'Invalid credentials.'}), 401
