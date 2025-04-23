import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { useState } from "react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)
    // ログイン処理をここに
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
    >
      <Box
        p={8}
        maxW="400px"
        w="100%"
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading size="lg" mb={6} textAlign="center">
          ログイン
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="mikilabアカウント"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              ログイン
            </Button>
            <Text fontSize="sm">
              パスワードを忘れた方は{" "}
              <Link color="blue.500" href="/forgot-password">
                こちら
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}

export default LoginPage
