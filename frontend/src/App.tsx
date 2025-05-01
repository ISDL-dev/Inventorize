import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import EquipumentsPage from "./pages/EquipumentsPage";
import AdminPage from "./pages/AdminPage";
import ChangepasswordPage from "./pages/ChangepasswordPage";
import SettingsPage from "./pages/SettingsPage";
import MylistPage from "./pages/MylistPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";


import AddEquipumentPage from "./pages/AddEquipumentpage";
import EditEquipumentPage from "./pages/EditEquipumentpage";
import AddUserPage from "./pages/AddUserpage";
import EditUserPage from "./pages/EditUserpage";
import AddCategoryPage from "./pages/AddCategorypage";
import EditCategoryPage from "./pages/EditCategorypage";

function AppContent() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signin";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    );
  }

  return (
    <Flex minH="100vh" bg="gray.100">
      <Sidebar />
      <Box ml="250px" flex="1" p={8}>
        <Routes>
          <Route path="/equipuments" element={<EquipumentsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/changepassword" element={<ChangepasswordPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/mylist" element={<MylistPage />} />
          <Route path="/admin/add-equipment" element={<AddEquipumentPage />} />
          <Route path="/admin/edit-equipment" element={<EditEquipumentPage />} />
          <Route path="/admin/add-user" element={<AddUserPage />} />
          <Route path="/admin/edit-user" element={<EditUserPage />} />
          <Route path="/admin/add-category" element={<AddCategoryPage />} />
          <Route path="/admin/edit-category" element={<EditCategoryPage />} />
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
