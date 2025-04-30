
from backend_core import app, db
from backend_core.models import User, Contact
from werkzeug.security import generate_password_hash
from faker import Faker

faker = Faker("pt_PT")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        # Criar admin
        if not User.query.filter_by(email='admin@admin.com').first():
            admin = User(
                name='Admin',
                email='admin@admin.com',
                password=generate_password_hash('admin'),
                role='admin'
            )
            db.session.add(admin)

        # Criar utilizador normal
        if not User.query.filter_by(email='user@user.com').first():
            user = User(
                name='Utilizador',
                email='user@user.com',
                password=generate_password_hash('1234'),
                role='user'
            )
            db.session.add(user)

        # Gerar contactos falsos com Faker
        if Contact.query.count() == 0:
            contactos = [
                Contact(name=faker.name(), phone=faker.phone_number())
                for _ in range(100)
            ]
            db.session.bulk_save_objects(contactos)

        db.session.commit()
        print('✅ Base de dados pronta com admin, utilizador normal e 100 contactos falsos!')

    app.run(debug=True)
