import {
    Box,
    Button,
    Heading,
    Input,
    Text,
  } from "@chakra-ui/react";
  import { useParams, useNavigate } from "react-router-dom";
  
  const dummyCategories: Record<string, { name: string }> = {
    "1": { name: "カメラ" },
    "2": { name: "スマートスピーカ" },
    "3": { name: "マイク" },
  };
  
  const EditCategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = dummyCategories[id ?? ""];
  
    if (!data) return <Text p={8}>対象のカテゴリが見つかりません</Text>;
  
    const handleUpdate = () => {
      console.log("カテゴリ更新完了");
      navigate("/admin");
    };
  
    return (
      <Box p={8}>
        <Heading size="md" mb={6}>「{data.name}」を編集</Heading>
  
        <Box maxW="600px">
          <Box mb={4}>
            <Text fontWeight="bold">カテゴリ名</Text>
            <Input defaultValue={data.name} />
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
  
  export default EditCategoryPage;
  