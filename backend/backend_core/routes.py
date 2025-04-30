
from flask import request, jsonify
from flask_login import login_required, current_user
from backend_core.models import User, Contact
from backend_core import app, db

@app.route('/api/contacts', methods=['GET'])
@login_required
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'phone': c.phone} for c in contacts])

@app.route('/api/contacts', methods=['POST'])
@login_required
def create_contact():
    if current_user.role != 'admin':
        return jsonify({'message': 'Access denied.'}), 403
    data = request.get_json()
    contact = Contact(name=data['name'], phone=data['phone'])
    db.session.add(contact)
    db.session.commit()
    return jsonify({'id': contact.id, 'name': contact.name, 'phone': contact.phone}), 201

@app.route('/api/contacts/<int:id>', methods=['PUT'])
@login_required
def update_contact(id):
    if current_user.role != 'admin':
        return jsonify({'message': 'Access denied.'}), 403
    data = request.get_json()
    contact = Contact.query.get_or_404(id)
    contact.name = data['name']
    contact.phone = data['phone']
    db.session.commit()
    return jsonify({'id': contact.id, 'name': contact.name, 'phone': contact.phone})

@app.route('/api/contacts/<int:id>', methods=['DELETE'])
@login_required
def delete_contact(id):
    if current_user.role != 'admin':
        return jsonify({'message': 'Access denied.'}), 403
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contact deleted'}), 204
