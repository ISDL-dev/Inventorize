import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [admissionYear, setAdmissionYear] = useState(""); // 年を文字列で受け取る
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !admissionYear || !email || !password) {
      alert("すべての項目を入力してください");
      return;
    }

    const userData = {
      name,
      email,
      password,
      admission_year: parseInt(admissionYear), // 数値として送信
    };

    try {
      const res = await axios.post("http://localhost:8000/users/", userData);

      alert(`サインアップ成功．ようこそ、${res.data.name} さん`);
      navigate("/equipuments");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`サインアップ失敗: ${error.response.data.detail}`);
      } else {
        alert("通信エラー: " + error.message);
      }
    }
  };

  return (
    <Flex width="100vw" height="100vh" justify="center" align="center" bg="gray.700">
      <Box p={10} bg="gray.800" borderRadius="md" boxShadow="2xl" w="full" maxW="400px">
        <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.200">
          サインアップ
        </Heading>
        <form onSubmit={handleSignUp}>
          <VStack spacing={4}>
            <Input
              placeholder="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
            <Input
              placeholder="研究室に配属された年（例: 2023）"
              value={admissionYear}
              onChange={(e) => setAdmissionYear(e.target.value)}
              type="number"
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
            <Input
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.600"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
            <Input
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
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
              登録
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
