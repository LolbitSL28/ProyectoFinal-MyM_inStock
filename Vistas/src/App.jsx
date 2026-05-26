import { useNavigate, Route, Routes } from "react-router-dom";
import { RutasPrivadas } from "./pages/PrivateRoutes";
import Home from "./pages/Home";
import GetUsuarios from "./pages/Usuarios/GetUsuarios";
import "./App.css";
import AddUsuarios from "./pages/Usuarios/AddUsuarios";
import Login from "./pages/Login";
import EditUsuarios from "./pages/Usuarios/EditUsuarios";
import CloseSession from "./pages/CloseSession";
import { useSelector } from "react-redux";
import GetCategorias from "./pages/Categorias/GetCategorias";
import AddCategorias from "./pages/Categorias/AddCategorias";
import EditCategorias from "./pages/Categorias/EditCategorias";
import GetProveedores from "./pages/Proveedores/GetProveedores";
import AddProveedores from "./pages/Proveedores/AddProveedores";
import EditProveedores from "./pages/Proveedores/EditProveedores";

function App() {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/users")}>Users</button>
      <button onClick={() => navigate("/categorias")}>Categorias</button>
      <button onClick={() => navigate("/proveedores")}>Proveedores</button>
      {!token && <button onClick={() => navigate("/login")}>Login</button>}
      {token && <button onClick={() => navigate("/logout")}>Logout</button>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RutasPrivadas />}>
          <Route path="/users" element={<GetUsuarios />} />
          <Route path="/users/add" element={<AddUsuarios />} />
          <Route path="/users/edit/:id" element={<EditUsuarios />} />
          <Route path="/logout" element={<CloseSession />} />
          <Route path="/categorias" element={<GetCategorias />} />
          <Route path="/categorias/add" element={<AddCategorias />} />
          <Route path="/categorias/edit/:id" element={<EditCategorias />} />
          <Route path="/proveedores" element={<GetProveedores />} />
          <Route path="/proveedores/add" element={<AddProveedores />} />
          <Route path="/proveedores/edit/:id" element={<EditProveedores />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
