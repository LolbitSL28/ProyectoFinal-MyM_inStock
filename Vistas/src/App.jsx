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
import GetProductos from "./pages/Productos/GetProductos";
import AddProductos from "./pages/Productos/AddProductos";
import EditProductos from "./pages/Productos/EditProductos";
import GetVentas from "./pages/Ventas/GetVentas";
import AddVenta from "./pages/Ventas/AddVenta";
import DetalleVenta from "./pages/Ventas/DetalleVentas";
import GetCompras from "./pages/Compras/GetCompras";
import AddCompra from "./pages/Compras/AddCompras";
import DetalleCompra from "./pages/Compras/DetalleCompra";

function App() {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  return (
    <div className="app-layout">
      <nav className="navbar">
          <div className="navbar-arriba" onClick={() => navigate("/")}>
            <img src="/Logo_MM_png.png" alt="Logo MyM" className="navbar-logo"/>
            <span>MyM inStock</span>
          </div>
        <div className="navbar-buttons">
          <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/users")}>Users</button>
          <button className="nav-btn" onClick={() => navigate("/categorias")}>Categorias</button>
          <button className="nav-btn" onClick={() => navigate("/proveedores")}>Proveedores</button>
          <button className="nav-btn" onClick={() => navigate("/productos")}>Productos</button>
          <button className="nav-btn" onClick={() => navigate("/ventas")}>Ventas</button>
          <button className="nav-btn" onClick={() => navigate("/compras")}>Compras</button>
        </div>
        <div className="navbar-auth">
          {!token && <button className="nav-btn btn-login" onClick={() => navigate("/login")}>Login</button>}
          {token && <button className="nav-btn btn-logout" onClick={() => navigate("/logout")}>Logout</button>}
        </div>
      </nav>
      
      <main className="main">
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
            <Route path="/productos" element={<GetProductos />} />
            <Route path="/productos/add" element={<AddProductos />} />
            <Route path="/productos/edit/:id" element={<EditProductos />} />
            <Route path="/ventas" element={<GetVentas />} />
            <Route path="/ventas/add" element={<AddVenta />} />
            <Route path="/ventas/:id" element={<DetalleVenta />} />
            <Route path="/compras" element={<GetCompras />} />
            <Route path="/compras/add" element={<AddCompra />} />
            <Route path="/compras/:id" element={<DetalleCompra />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
