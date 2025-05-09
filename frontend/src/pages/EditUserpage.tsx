import {
    Box,
    Button,
    Heading,
    Input,
    Text,
  } from "@chakra-ui/react";
  import { useParams, useNavigate } from "react-router-dom";
  
  type User = {
    name: string;
    studentId: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };
  
  const dummyUsers: Record<string, User> = {
    "1": {
      name: "田中 太郎",
      studentId: "20231234",
      email: "tanaka@example.com",
      password: "dummy1234",
      isAdmin: true,
    },
    "2": {
      name: "佐藤 花子",
      studentId: "20235678",
      email: "sato@example.com",
      password: "pass5678",
      isAdmin: false,
    },
  };
  
  const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = dummyUsers[id ?? ""];
  
    if (!user) return <Text p={8}>対象のユーザが見つかりません</Text>;
  
    const handleUpdate = () => {
      console.log("更新完了");
      navigate("/list_user");
    };
  
    return (
      <Box p={8}>
        <Heading size="md" mb={6}>
          「{user.name}」を編集
        </Heading>
  
        <Box maxW="600px">
          <Box mb={4}>
            <Text fontWeight="bold">名前</Text>
            <Input defaultValue={user.name} />
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">学生ID</Text>
            <Input defaultValue={user.studentId} />
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">Email</Text>
            <Input defaultValue={user.email} />
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">Password</Text>
            <Input type="password" defaultValue={user.password} />
          </Box>
          <Box mb={4}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                defaultChecked={user.isAdmin}
                style={{ marginRight: "8px" }}
              />
              Adminユーザ
            </label>
          </Box>
          <Button
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
            onClick={handleUpdate}
          >
            更新
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default EditUserPage;
  