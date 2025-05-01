import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// 仮のデータ
const equipmentData = [
  { id: 1, name: "4 microphone array system_01", category: "カメラ", state: "貸出中", remarks: "テスト" },
  { id: 2, name: "Amazon echo dot", category: "スマートスピーカ", state: "貸出可能", remarks: "" },
];

const EquipmentListPage = () => {
  return (
    <Box p={8}>
      <Text fontSize="xl" mb={4}>Equipment List</Text>

      <Box overflowX="auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#4299e1", color: "white" }}>
            <tr>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>Name</th>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>Category</th>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>State</th>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {equipmentData.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>
                  <Link
                    to={`/edit_equipment/${item.id}`}
                    style={{ color: "#3182ce", textDecoration: "underline" }}
                  >
                    {item.name}
                  </Link>
                </td>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>{item.category}</td>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>{item.state}</td>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default EquipmentListPage;
