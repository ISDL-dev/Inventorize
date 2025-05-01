import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type User = {
  id: number;
  name: string;
  studentId: string;
  email: string;
  isAdmin: boolean;
};

// 仮データ（userData にリネーム）
const userData: User[] = [
  { id: 1, name: "田中 太郎", studentId: "20231234", email: "tanaka@example.com", isAdmin: true },
  { id: 2, name: "佐藤 花子", studentId: "20235678", email: "sato@example.com", isAdmin: false },
];

const UserListPage = () => {
  return (
    <Box p={8}>
      <Text fontSize="xl" mb={4}>User List</Text>

      <Box overflowX="auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#4299e1", color: "white" }}>
            <tr>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>名前</th>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>学生ID</th>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>Email</th>
              <th style={{ padding: "8px", border: "1px solid #CBD5E0" }}>Admin</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user: User) => (
              <tr key={user.id}>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>
                  <Link
                    to={`/edit_user/${user.id.toString()}`}
                    style={{ color: "#3182ce", textDecoration: "underline" }}
                  >
                    {user.name}
                  </Link>
                </td>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>{user.studentId}</td>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>{user.email}</td>
                <td style={{ padding: "8px", border: "1px solid #E2E8F0" }}>
                  {user.isAdmin ? "✔️" : "ー"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default UserListPage;
