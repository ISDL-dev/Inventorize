import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Sending password reset to:", email);
      setSent(true);
    };
  
    return (
      <Box p={8}>
        <Heading size="md" mb={6}>パスワード再設定</Heading>
        {sent ? (
          <Text color="green.500">
            再設定用リンクを {email} に送信しました。
          </Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder="登録済みのメールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             <Button
                type="submit"
                bg="teal.400"
                 _hover={{ bg: "teal.500" }}
                color="white"
                >
                メールを送信
            </Button>
              <Button variant="link" onClick={() => navigate("/login")}>
                ログインに戻る
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    );
  };
  
  export default ForgotPasswordPage;
  