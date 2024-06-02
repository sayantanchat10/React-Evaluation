import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<PrivateRoute component={HomePage} />} />
            <Route path="/product/:id" element={<PrivateRoute component={ProductDetailsPage} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const { authState } = React.useContext(AuthContext);
  return authState.isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default App;     