import {Routes, Route, HashRouter } from "react-router-dom";
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
        <HashRouter>
          <Routes>
            <Route path="/" element={<AlfaPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </HashRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
