
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import { Delete, Edit, Logout } from '@mui/icons-material';
import api from '../api';

function Phonebook({ user }) {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [search, setSearch] = useState('');

  const fetchContacts = async () => {
    const res = await api.get('/contacts');
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing !== null) {
      await api.put(`/contacts/${editing}`, form);
    } else {
      await api.post('/contacts', form);
    }
    setForm({ name: '', phone: '' });
    setEditing(null);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setForm({ name: contact.name, phone: contact.phone });
    setEditing(contact.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">
          Bem-vindo, {user.name} ({user.role})
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>

      <TextField
        label="Pesquisar por nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />

      {user.role === 'admin' && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 2 }}>
          <TextField label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required sx={{ mr: 1 }} />
          <TextField label="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required sx={{ mr: 1 }} />
          <Button type="submit" variant="contained">{editing !== null ? 'Atualizar' : 'Adicionar'}</Button>
        </Box>
      )}

      <List>
        {filteredContacts.map(c => (
          <ListItem key={c.id} secondaryAction={
            user.role === 'admin' && <>
              <IconButton onClick={() => handleEdit(c)}><Edit /></IconButton>
              <IconButton onClick={() => handleDelete(c.id)}><Delete /></IconButton>
            </>
          }>
            <ListItemText primary={c.name} secondary={c.phone} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Phonebook;
