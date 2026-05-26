import { useNavigate, Route, Routes } from "react-router-dom";
import { RutasPrivadas } from "./pages/PrivateRoutes";
import Home from "./pages/Home";
import GetUsuarios from "./pages/Usuarios/GetUsuarios";
import "./App.css";
import AddUsuarios from "./pages/Usuarios/AddUsuarios";
import Login from "./pages/Login";
import EditUsuarios from "./pages/Usuarios/EditUsuarios";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/users")}>Users</button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RutasPrivadas />}>
          <Route path="/users" element={<GetUsuarios />} />
          <Route path="/users/add" element={<AddUsuarios />} />
          <Route path="/users/edit/:id" element={<EditUsuarios />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
