import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
import { TaskProvider } from "./context/TaskContext";
import AlfaPage from "./pages/AlfaPage";
import TaskPage from "./pages/TaskPage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AlfaPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
