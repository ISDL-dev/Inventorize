import { Box, Button, Input, VStack, Text, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    if (email.trim() !== "" && password.trim() !== "") {
      navigate("/equipuments");
    } else {
      alert("Emailとパスワードを入力してください");
    }
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      justify="center"
      align="center"
      bg="gray.700"
    >
      <Box
        p={10}
        bg="gray.800"
        borderRadius="md"
        boxShadow="2xl"
        w="full"
        maxW="400px" 
      >
        <Heading
          mb={6}
          textAlign="center"
          fontSize="2xl"
          color="teal.200"
        >
          物品管理システム
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="student_id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
            <Button
              type="submit"
              bg="red.400"
              _hover={{ bg: "red.500" }}
              color="white"
              w="full"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;