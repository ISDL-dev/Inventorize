import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    Flex,
  } from "@chakra-ui/react";
  
  const AddCategoryPage = () => {
    return (
      <Box p={8}>
        {/* パンくずナビ */}
        <Flex mb={6}>
          <Text fontSize="lg" fontWeight="bold" color="gray.500" mr={2}>
            Admin
          </Text>
          <Text color="gray.400">/ Add Category</Text>
        </Flex>
  
        {/* タイトル */}
        <Heading as="h2" size="md" mb={6}>
          以下の項目を入力してください。
        </Heading>
  
        {/* 入力フォーム */}
        <Box maxW="600px">
          <Box mb={4}>
            <Text fontWeight="bold" mb={1}>
              カテゴリー名：
            </Text>
            <Input placeholder="カテゴリー名を入力" />
          </Box>
  
          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
          >
            追加
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default AddCategoryPage;
  