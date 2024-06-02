import React,{useContext} from 'react';
import{Box,Button,Flex,Link,Spacer,Text} from '@chakra-ui/react';
import{ Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthContext from '../Authcontext';
const Navbar = () => {
    const{ authState, logout} =
    useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return(
        <Flex p={4} bg="gray.100">
            {authState.isAuthenticated?(
            <>
            <Text>{authState.email}</Text>
            <Spacer />
            <link as={RouterLink} to="/home"
            mr={4}>
                Home
            </link>
            <Button onClick={handleLogout}>
                Logout
            </Button>
            </>
            ):(
             <Link as={RouterLink} to="/login">
                Login
             </Link>   
            )}
        </Flex>
    );
};
export default Navbar;