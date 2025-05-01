import { Box, VStack, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box w="250px" bg="gray.800" color="white" h="100vh" p={5} position="fixed">
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold"> ISDL物品管理</Text>
        <Link as={RouterLink} to="/equipuments">Equipuments</Link>
        <Link as={RouterLink} to="/mylist">My List</Link>
        <Link as={RouterLink} to="/admin">Admin</Link>
        <Link as={RouterLink} to="/changepassword">Change Password</Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
