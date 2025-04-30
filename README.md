# 📞 Lista Telefónica – Aplicação Full Stack (Flask + React)

Esta aplicação permite autenticação com diferentes perfis de utilizador (`admin` e `user`) e gestão de uma lista telefónica. Utiliza React com Material UI no frontend e Flask com Flask-Login no backend.

---

## 🧩 Tecnologias Usadas

- **Frontend:** React + Axios + Material UI
- **Backend:** Flask + Flask-Login + Flask-CORS + SQLAlchemy + Faker
- **Base de Dados:** SQLite (armazenada na pasta `instance/`)

---

## 🚀 Como Executar o Projeto

### 1️⃣ Backend (Flask)

#### 📦 Instalação

```bash
cd backend_phonebook
python -m venv venv
venv\Scripts\activate       # no Windows
# ou
source venv/bin/activate      # no macOS/Linux

pip install -r requirements.txt
```

#### ▶️ Execução

```bash
python run.py
```

✔️ Isto irá:
- Criar a base de dados SQLite (`instance/users.db`)
- Criar um utilizador **admin**
- Criar um utilizador **user**
- Gerar 100 contactos falsos com nomes e números portugueses 🇵🇹

---

### 2️⃣ Frontend (React)

#### 📦 Instalação

```bash
cd frontend_phonebook
npm install
```

#### ▶️ Execução

```bash
npm start
```

A aplicação irá abrir em: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Credenciais de Acesso

| Tipo        | Email              | Password |
|-------------|--------------------|----------|
| Administrador | `admin@admin.com` | `admin`  |
| Utilizador normal | `user@user.com`  | `1234`   |

---

## ✨ Funcionalidades

### ✅ Para todos os utilizadores:
- Login com sessão segura (cookies + CORS configurado)
- Visualização da lista de contactos
- Pesquisa dinâmica por nome (case-insensitive, parcial)

### ✅ Para `admin`:
- Adicionar novos contactos
- Editar contactos existentes
- Remover contactos
- Ver todos os contactos com ações visuais (ícones Editar/Apagar)

### 🔓 Logout:
- Botão disponível no topo direito do painel

---

## 📁 Estrutura

```
backend_phonebook/
├── backend_core/
│   ├── __init__.py
│   ├── models.py
│   ├── auth.py
│   ├── routes.py
├── run.py
├── requirements.txt
├── instance/
│   └── users.db

frontend_phonebook/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── api.js
│   └── components/
│       ├── LoginForm.js
│       └── Phonebook.js
├── package.json
```

---

## 🙌 Autor

Desenvolvido com ❤️ para fins didáticos.  
Contactos gerados com a biblioteca `Faker` 🇵🇹.

---

## 📝 Licença

Este projeto está livre para fins educativos e académicos.
