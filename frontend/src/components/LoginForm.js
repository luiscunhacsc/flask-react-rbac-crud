
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../api';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      onLogin({ name: res.data.name, role: res.data.role });
    } catch (err) {
      alert('Credenciais inválidas');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" required />
      <Button type="submit" variant="contained" fullWidth>Login</Button>
    </Box>
  );
}

export default LoginForm;
