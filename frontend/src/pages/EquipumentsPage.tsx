import { Box, Heading, Input, Button, Spinner } from "@chakra-ui/react"; // ← Selectもここでimport
import { Table } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  status: string;
  registeredAt: string;
  note: string;
};

const EquipumentsPage = () => {
  const [equipuments, setEquipuments] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8000/items/")
      .then((res) => res.json())
      .then((data) => {
        setEquipuments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("取得失敗:", err);
        setLoading(false);
      });
  }, []);

  /*const equipuments = [
    { id: 1, name: "ノートパソコン", status: "貸出可能", registeredAt: "2024-04-01", note: "バッテリー良好" },
    { id: 2, name: "プロジェクター", status: "貸出中", registeredAt: "2024-03-20", note: "リモコン付き" },
    { id: 3, name: "HDMIケーブル", status: "貸出可能", registeredAt: "2024-02-15", note: "2mの長さ" },
    { id: 4, name: "マウス", status: "貸出中", registeredAt: "2024-03-01", note: "ワイヤレス" },
    { id: 5, name: "キーボード", status: "貸出可能", registeredAt: "2024-02-25", note: "日本語配列" },
    { id: 6, name: "ディスプレイ", status: "貸出中", registeredAt: "2024-01-10", note: "24インチ" },
    { id: 7, name: "Webカメラ", status: "貸出可能", registeredAt: "2024-03-05", note: "フルHD対応" },
    { id: 8, name: "ヘッドセット", status: "貸出可能", registeredAt: "2024-04-02", note: "ノイズキャンセリング" },
    { id: 9, name: "スピーカー", status: "貸出中", registeredAt: "2024-03-15", note: "Bluetooth接続" },
    { id: 10, name: "LANケーブル", status: "貸出可能", registeredAt: "2024-02-20", note: "10m" },
    { id: 11, name: "USBハブ", status: "貸出中", registeredAt: "2024-03-12", note: "4ポート" },
  ];*/

  const filteredEquipuments = equipuments.filter(item =>
    item.name.includes(searchTerm) &&
    (statusFilter === "" || item.status === statusFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEquipuments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEquipuments.length / itemsPerPage);

  return (
    <Box p={8}>
      <Box mb={8}>
        <Heading mb={4}>Equipuments（物品管理）ページ</Heading>
        <p>アイテムの情報を表示します</p>
      </Box>

      {/* 検索バーとフィルター */}
      <Box display="flex" gap={4} mb={6} alignItems="center">
        <Input
          placeholder="物品名で検索"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          width="300px"
        />
        {/* 正しいSelectの使い方 */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{ height: '40px', padding: '0 10px', borderRadius: '5px' }}
        >
          <option value="">すべて</option>
          <option value="貸出可能">貸出可能</option>
          <option value="貸出中">貸出中</option>
        </select>
      </Box>

      {/* テーブル */}
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>名前</Table.ColumnHeader>
                <Table.ColumnHeader>貸出状況</Table.ColumnHeader>
                <Table.ColumnHeader>登録日</Table.ColumnHeader>
                <Table.ColumnHeader>備考</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currentItems.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Link
                      to={`/equipuments/${item.id}`}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {item.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell color={item.status === "貸出中" ? "red.500" : "green.500"}>{item.status}</Table.Cell>
                  <Table.Cell>{item.registeredAt}</Table.Cell>
                  <Table.Cell>{item.note}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {/* ページネーション */}
          <Box mt={6}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                colorScheme={currentPage === index + 1 ? "blue" : "gray"}
                size="sm"
                mx={1}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default EquipumentsPage;
