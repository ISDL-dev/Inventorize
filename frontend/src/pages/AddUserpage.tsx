import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    Flex,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  
  const AddUserPage = () => {
    const navigate = useNavigate();
  
    const handleAdd = () => {
      console.log("ユーザ追加完了");
      navigate("/admin");
    };
  
    return (
      <Box p={8}>
        <Flex mb={6}>
          <Text fontSize="lg" fontWeight="bold" color="gray.500" mr={2}>
            Admin
          </Text>
          <Text color="gray.400">/ Add User</Text>
        </Flex>
        <Heading as="h2" size="md" mb={6}>
          以下の項目を入力してください。
        </Heading>
  
        <Box maxW="600px">
          <Box mb={4}>
            <Text fontWeight="bold" mb={1}>名前：</Text>
            <Input placeholder="氏名を入力" />
          </Box>
  
          <Box mb={4}>
            <Text fontWeight="bold" mb={1}>学生ID：</Text>
            <Input placeholder="学生IDを入力" />
          </Box>
  
          <Box mb={4}>
            <Text fontWeight="bold" mb={1}>Email：</Text>
            <Input placeholder="メールアドレスを入力" />
          </Box>
  
          <Box mb={4}>
            <Text fontWeight="bold" mb={1}>Password：</Text>
            <Input type="password" placeholder="パスワードを入力" />
          </Box>
  
          <Box mb={4}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Adminuser
            </label>
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
  
  export default AddUserPage;
  