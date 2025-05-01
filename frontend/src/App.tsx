import { Box } from "@chakra-ui/react";
import Sidebar from "./components/ui/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EquipumentsPage from "./pages/EquipumentsPage"; 
import AdminPage from "./pages/AdminPage";
import ChangepasswordPage from "./pages/ChangepasswordPage";
import SettingsPage from "./pages/SettingsPage";
import MylistPage from "./pages/MylistPage";
import ItemDetailPage from "./pages/ItemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Box display="flex" minH="100vh">
        <Sidebar />
        <Box ml="250px" p={5} flex="1">
          <Routes>
            <Route path="/equipuments" element={<EquipumentsPage />} />
            <Route path="/equipuments/:id" element={<ItemDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/changepassword" element={<ChangepasswordPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/mylist" element={<MylistPage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;