import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    name: "田中太郎",
    category: "ノートPC",
    state: "申請中",
    remarks: "至急対応希望",
  },
  {
    name: "佐藤花子",
    category: "プロジェクター",
    state: "承認済",
    remarks: "イベント用",
  },
  {
    name: "鈴木一郎",
    category: "マウス",
    state: "却下",
    remarks: "在庫切れ",
  },
];

const AdminPage = () => {
  const navigate = useNavigate();

  const routes = {
    "ユーザ管理": {
      add: "/admin/add-user",
      edit: "/admin/edit-user",
    },
    "物品管理": {
      add: "/admin/add-equipment",
      edit: "/admin/edit-equipment",
    },
    "ジャンル管理": {
      add: "/admin/add-category",
      edit: "/admin/edit-category",
    },
  };

  return (
    <Box bg="gray.50" minH="100vh" pt={8} pr={8}>
      <Box mb={6}>
        <Heading size="xl" color="gray.800">
          Admin
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        {/* 管理パネル */}
        <VStack gap={6} align="stretch">
          {["ユーザ管理", "物品管理", "ジャンル管理"].map((title) => (
            <Box
              key={title}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="white"
            >
              <Text fontWeight="bold" mb={2}>
                {title}
              </Text>
              <HStack gap={4}>
                <Button
                  bg="teal.500"
                  _hover={{ bg: "teal.600" }}
                  color="white"
                  size="sm"
                  onClick={() => navigate(routes[title].add)}
                >
                  追加
                </Button>
                <Button
                  bg="gray.700"
                  _hover={{ bg: "gray.800" }}
                  color="white"
                  size="sm"
                  onClick={() => navigate(routes[title].edit)}
                >
                  編集
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>

        {/* テーブル表示など（省略 or 実装済） */}
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          overflowX="auto"
        >
          <Text fontWeight="bold" mb={4}>
            申請情報
          </Text>

          {/* 件数 + 検索 */}
          <Flex justify="space-between" mb={4}>
            <Flex align="center">
              <label htmlFor="itemCount" style={{ fontSize: "0.875rem", marginRight: "0.5rem" }}>
                件数:
              </label>
              <select
                id="itemCount"
                name="itemCount"
                defaultValue="10"
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  border: "1px solid #CBD5E0",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </Flex>
            <Flex align="center">
              <Text fontSize="sm" mr={2}>
                検索:
              </Text>
              <Input size="sm" width="200px" placeholder="検索..." />
            </Flex>
          </Flex>

          {/* テーブルヘッダー */}
          <Flex fontWeight="bold" bg="blue.500" color="white" px={4} py={2}>
            <Box flex="1">Name</Box>
            <Box flex="1">Category</Box>
            <Box flex="1">State</Box>
            <Box flex="1">Remarks</Box>
          </Flex>

          {/* データ行 */}
          {dummyData.map((item, index) => (
            <Flex
              key={index}
              px={4}
              py={2}
              borderBottomWidth="1px"
              bg={index % 2 === 0 ? "gray.50" : "white"}
            >
              <Box flex="1">{item.name}</Box>
              <Box flex="1">{item.category}</Box>
              <Box flex="1">{item.state}</Box>
              <Box flex="1">{item.remarks}</Box>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AdminPage;
