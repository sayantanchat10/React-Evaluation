import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, GridItem, Select, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import AuthContext from '../AuthContext';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.example.com/products', {
          headers: { Authorization: Bearer ${authState.token} },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [authState.token]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const sortedFilteredProducts = products
    .filter(product => categoryFilter ? product.category === categoryFilter : true)
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  if (loading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  );

  return (
    <Box p={4}>
      <Box mb={4}>
        <Select placeholder="Sort by Price" onChange={handleSortChange} mb={4}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
        <Select placeholder="Filter by Category" onChange={handleCategoryChange}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Home Decor">Home Decor</option>
        </Select>
      </Box>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {sortedFilteredProducts.map(product => (
          <GridItem key={product.id}>
            <ProductCard product={product} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;