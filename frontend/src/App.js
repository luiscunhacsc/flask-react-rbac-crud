
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from './components/LoginForm';
import Phonebook from './components/Phonebook';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom align="center">
          Lista Telefónica
        </Typography>
        {!user ? (
          <LoginForm onLogin={setUser} />
        ) : (
          <Phonebook user={user} />
        )}
      </Box>
    </Container>
  );
}

export default App;
