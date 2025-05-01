import {
  Box,
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

type Equipment = {
  name: string;
  category: string;
  state: string;
  remarks: string;
};

const dummyData: Record<string, Equipment> = {
  "1": { name: "4 microphone array system_01", category: "カメラ", state: "貸出中", remarks: "テスト" },
  "2": { name: "Amazon echo dot", category: "スマートスピーカ", state: "貸出可能", remarks: "" },
};

const EditEquipumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ← 追加
  const data = dummyData[id ?? ""];

  if (!data) return <Text p={8}>対象の物品が見つかりません</Text>;

  const handleUpdate = () => {
    // ここにAPI連携の更新処理などを入れられる
    console.log("更新完了");

    navigate("/list_equipment");
  };

  return (
    <Box p={8}>
      <Heading size="md" mb={6}>
        「{data.name}」を編集
      </Heading>

      <Box maxW="600px">
        <Box mb={4}>
          <Text fontWeight="bold">物品名</Text>
          <Input defaultValue={data.name} />
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold" mb={1}>
            分類
          </Text>
          <select
            defaultValue={data.category}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #CBD5E0",
              fontSize: "14px",
            }}
          >
            <option value="カメラ">カメラ</option>
            <option value="マイク">マイク</option>
            <option value="スマートスピーカ">スマートスピーカ</option>
            <option value="その他">その他</option>
          </select>
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold" mb={1}>
            状態
          </Text>
          <select
            defaultValue={data.state}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #CBD5E0",
              fontSize: "14px",
            }}
          >
            <option value="貸出可能">貸出可能</option>
            <option value="貸出中">貸出中</option>
            <option value="メンテナンス中">メンテナンス中</option>
          </select>
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold">備考</Text>
          <Input defaultValue={data.remarks} />
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

export default EditEquipumentPage;
