import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";

const AddEquipumentPage = () => {
  return (
    <Box p={8}>
      {/* パンくず */}
      <Flex mb={6}>
        <Text fontSize="lg" fontWeight="bold" color="gray.500" mr={2}>
          Admin
        </Text>
        <Text color="gray.400">/ Add Equipment</Text>
      </Flex>

      {/* タイトル */}
      <Heading as="h2" size="md" mb={6}>
        以下の項目を入力してください。
      </Heading>

      {/* 入力フォーム */}
      <Box maxW="600px">
        {/* 物品名 */}
        <Box mb={4}>
          <Text fontWeight="bold" mb={1}>
            物品名：
          </Text>
          <Input placeholder="物品名を入力" />
        </Box>

        {/* Classification */}
        <Box mb={4}>
          <Text fontWeight="bold" mb={1}>
            Classification:
          </Text>
          <Input placeholder="分類を入力" />
        </Box>

        {/* 追加ボタン */}
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

export default AddEquipumentPage;
