import { Box, Heading, Text, Image, VStack, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

//ダミーデータ
/*const myItems = [
  {
    id: 1,
    name: "ノートパソコン",
    image_path: "/laptop.jpg",
    requestDate: "2025-04-20",
    status: "承認待ち",
  },
  {
    id: 2,
    name: "プロジェクター",
    image_path: "/projector.jpg",
    requestDate: "2025-04-18",
    status: "承認済み",
  },
];*/

// 取引データの型定義
interface Transaction {
  id: number;
  name: string;
  image_path: string;
  transaction_date: string;
  status: string;
}

const MylistPage = () => {
  const location = useLocation();
  const newItem = location.state;
  const [items, setItems] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetchを使用してAPIからデータを取得
    fetch("http://localhost:8000/transactions/?user_id=999")
      .then((response) => {
        if (!response.ok) {
          throw new Error("取引データの取得に失敗しました。");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data); // 取得したデータをitemsに設定
      })
      .catch((err) => {
        setError(err.message);
        console.error("取引データ取得エラー:", err);
      });

    if (newItem) {
      setItems((prev) => {
        if (!prev.find((item) => item.id === newItem.id)) {
          return [...prev, newItem];
        }
        return prev;
      });
    }
  }, [newItem]);

  const handleCancel = (id: number) => {
    const confirmed = window.confirm("本当にキャンセルしてもよろしいですか？");
    if (confirmed) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Mylistページ</Heading>
      <p>自身の申請済み物品一覧</p>
      {error && <Text color="red.500">{error}</Text>} {/* エラーメッセージを表示 */}
      {items.length === 0 ? (
        <Text>申請中の物品はありません。</Text>
      ) : (
        items.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            mb={4}
            boxShadow="sm"
          >
            <VStack align="start">
              <Image
                src={item.image_path}
                alt={item.name}
                boxSize="150px"
                objectFit="cover"
                borderRadius="md"
              />
              <Link
                to={`/items/${item.id}`}
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "#3182ce", // Chakraのblue.600相当
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
              <Text fontSize="sm">申請日: {new Date(item.transaction_date).toLocaleDateString()}</Text>
              <Text color={item.status === "承認待ち" ? "red.500" : "green.500"}>
                {item.status}
              </Text>
              {item.status === "承認待ち" && (
                <Button size="sm" colorScheme="red" onClick={() => handleCancel(item.id)}>
                  キャンセル
                </Button>
              )}
            </VStack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default MylistPage;
