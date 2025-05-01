import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// 仮データ
const categoryData = [
  { id: 1, name: "カメラ" },
  { id: 2, name: "スマートスピーカ" },
  { id: 3, name: "マイク" },
];

const CategoryListPage = () => {
  return (
    <Box p={8}>
      <Text fontSize="xl" mb={4}>カテゴリ一覧</Text>

      <Box overflowX="auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#4299e1", color: "white" }}>
            <tr>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>カテゴリ名</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((cat) => (
              <tr key={cat.id}>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>
                  <Link
                    to={`/edit_category/${cat.id}`}
                    style={{ color: "#3182ce", textDecoration: "underline" }}
                  >
                    {cat.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default CategoryListPage;
