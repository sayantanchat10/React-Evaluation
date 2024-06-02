import React, { useContext, useRef, useState } from 'react';
import { Box, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://api.example.com/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      login(response.data.email, response.data.token);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box p={4}>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Input ref={emailRef} placeholder="Email" mb={4} autoFocus />
      <Input ref={passwordRef} placeholder="Password" type="password" mb={4} />
      <Button onClick={handleSubmit}>Login</Button>
    </Box>
  );
};

export default LoginPage;