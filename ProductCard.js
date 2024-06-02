import React from "react";
import {Box, Text, Button} from '@chakra-ui/react;';
import { Link as RouterLink} from 'react-router-dom';

const ProductCard = ({ product }) => {
    return(
        <Box borderwidth="1px" borderRadius="lg"
        overflow="hidden" p={4}>
        <Text fontWeight="bold">{product.title}</Text>
        <Text>{product.category}</Text>    
        </Box>
    )
}