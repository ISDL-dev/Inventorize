import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import EquipumentsPage from "./pages/EquipumentsPage";
import AdminPage from "./pages/AdminPage";
import ChangepasswordPage from "./pages/ChangepasswordPage";
import SettingsPage from "./pages/SettingsPage";
import MylistPage from "./pages/MylistPage";
import LoginPage from "./pages/LoginPage";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  // ログイン後のページ（Sidebarつき）
  return (
    <Flex minH="100vh" bg="gray.100">
      {/* Sidebar */}
      <Sidebar />

      {/* サイドバーの幅ぶん空けたメイン画面 */}
      <Box ml="250px" flex="1" p={8}>
        <Routes>
          <Route path="/equipuments" element={<EquipumentsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/changepassword" element={<ChangepasswordPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/mylist" element={<MylistPage />} />
        </Routes>
      </Box>
    </Flex>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;