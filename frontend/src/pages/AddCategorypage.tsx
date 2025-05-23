import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    Flex,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  
  const AddCategoryPage = () => {
    const navigate = useNavigate();
  
    const handleAdd = () => {
      console.log("カテゴリー追加完了");
      navigate("/admin");
    };
  
    return (
      <Box p={8}>
        <Flex mb={6}>
          <Text fontSize="lg" fontWeight="bold" color="gray.500" mr={2}>
            Admin
          </Text>
          <Text color="gray.400">/ Add Category</Text>
        </Flex>
  
        <Heading as="h2" size="md" mb={6}>
          以下の項目を入力してください。
        </Heading>
  
        <Box maxW="600px">
          <Box mb={4}>
            <Text fontWeight="bold" mb={1}>カテゴリー名：</Text>
            <Input placeholder="カテゴリー名を入力" />
          </Box>
  
          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={handleAdd}
          >
            追加
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default AddCategoryPage;
  