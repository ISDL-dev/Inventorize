import { Box, Button, Input, VStack, Text, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      console.log("Sign up successful");
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
          サインアップ
        </Heading>
        <form onSubmit={handleSignIn}>
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
              bg="blue.400"
              _hover={{ bg: "blue.500" }}
              color="white"
              w="full"
            >
              サインイン
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
