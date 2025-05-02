import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/ui/Sidebar";
import EquipumentsPage from "./pages/EquipumentsPage";
import AdminPage from "./pages/AdminPage";
import ChangepasswordPage from "./pages/ChangepasswordPage";
import MylistPage from "./pages/MylistPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import ForgotPasswordPage from "./pages/ForgotPasswordpage";

import AddEquipumentPage from "./pages/AddEquipmentpage";
import EditEquipumentPage from "./pages/EditEquipmentpage";
import AddUserPage from "./pages/AddUserpage";
import EditUserPage from "./pages/EditUserpage";
import AddCategoryPage from "./pages/AddCategorypage";
import EditCategoryPage from "./pages/EditCategorypage";

import EquipmentListPage from "./pages/EquipmentListpage";
import UserListPage from "./pages/UserListPage";
import CategoryListPage from "./pages/CategoryListpage";
import ItemDetailPage from "./pages/ItemDetailPage";

function AppContent() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signin"||
    location.pathname === "/forgot-password";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    );
  }

  return (
    <Flex minH="100vh" bg="gray.100">
      <Sidebar />
      <Box ml="250px" flex="1" p={8}>
        <Routes>
          <Route path="/equipuments" element={<EquipumentsPage />} />
          <Route path="/equipuments/:id" element={<ItemDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/changepassword" element={<ChangepasswordPage />} />
          <Route path="/mylist" element={<MylistPage />} />
          <Route path="/admin/add-equipment" element={<AddEquipumentPage />} />
          <Route path="/edit_equipment/:id" element={<EditEquipumentPage />} />
          <Route path="/admin/add-user" element={<AddUserPage />} />
          <Route path="/edit_user/:id" element={<EditUserPage />} />
          <Route path="/admin/add-category" element={<AddCategoryPage />} />
          <Route path="/edit_category/:id" element={<EditCategoryPage />} />
          <Route path="/list_equipment" element={<EquipmentListPage />} />
          <Route path="/list_user" element={<UserListPage />} />
          <Route path="/list_category" element={<CategoryListPage />} />
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
