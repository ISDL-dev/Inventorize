import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("Email:", email);
    console.log("Password:", password);
  
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8000/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true, // Cookieが必要な場合
        }
        );
  
        if (response.status === 200) {
          navigate("/equipuments");
        } else {
          alert("ログインに失敗しました");
        }
      } catch (error: any) {
        console.error("Login error:", error);
  
        if (error.response?.status === 400) {
          // 認証失敗（FastAPI 側で 400 を返している場合）
          alert("メールアドレスまたはパスワードが間違っています");
        } else {
          // その他のエラー
          alert("ログイン中に予期しないエラーが発生しました");
        }
      }
    } else {
      alert("Emailとパスワードを入力してください");
    }
  };
  
  

  return (
    <Flex width="100vw" height="100vh" justify="center" align="center" bg="gray.700">
      <Box p={10} bg="gray.800" borderRadius="md" boxShadow="2xl" w="full" maxW="400px">
        <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.200">
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
            {/* リンク追加 */}
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.300">
                サインインがまだの方は{" "}
                <Link color="teal.300" onClick={() => navigate("/signin")}>
                  こちら
                </Link>
              </Text>
              <Text fontSize="sm" color="gray.300" mt={2}>
                パスワードを忘れた方は{" "}
                <Link color="teal.300" onClick={() => navigate("/forgot-password")}>
                  こちら
                </Link>
              </Text>
            </Box>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
