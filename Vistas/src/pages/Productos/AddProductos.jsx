import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProductos,
  listarProductos,
} from "../../redux/actions/productosActions";
import { listarCategorias } from "../../redux/actions/categoriasActions";
import { listarProveedores } from "../../redux/actions/proveedoresActions";
import "./Productos.css";

function AddProductos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorias, proveedores } = useSelector((state) => state.productos);

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    marca: "",
    stock: "",
    precioVenta: "",
    precioCompra: "",
    categoriaId: "",
    proveedorId: "",
  });

  useEffect(() => {
    dispatch(listarCategorias());
    dispatch(listarProveedores());
  }, [dispatch]);

  async function guardar() {
    dispatch(addProductos(producto)).then(() => alert("Guardado correcto"));
    await dispatch(listarProductos());
    setProducto({
      nombre: "",
      descripcion: "",
      marca: "",
      stock: "",
      precioVenta: "",
      precioCompra: "",
      categoriaId: "",
      proveedorId: "",
    });
    navigate("/productos");
  }

  function change(e) {
    const { name, value } = e.target;
    setProducto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
  <div className="productos-container">
    <h1>Agregar Producto</h1>
    <h2 style={{textAlign:"center", color:"#64748b", fontSize:"1.1rem"}}>Ingrese los datos:</h2>
    <form className="producto-form" onSubmit={(e) => { e.preventDefault(); guardar(); }}>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" name="nombre" onChange={change} />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input type="text" name="descripcion" onChange={change} />
      </div>
      <div className="form-group">
        <label>Marca</label>
        <input type="text" name="marca" onChange={change} />
      </div>
      <div className="form-group">
        <label>Stock</label>
        <input type="number" name="stock" onChange={change} />
      </div>
      <div className="form-group">
        <label>Precio Venta</label>
        <input type="number" step="0.01" name="precioVenta" onChange={change} />
      </div>
      <div className="form-group">
        <label>Precio Compra</label>
        <input type="number" step="0.01" name="precioCompra" onChange={change} />
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <select name="categoriaId" onChange={change}>
          <option value="">Seleccione una categoría</option>
          {categorias?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Proveedor</label>
        <select name="proveedorId" onChange={change}>
          <option value="">Seleccione un proveedor</option>
          {proveedores?.map((prov) => (
            <option key={prov.id} value={prov.id}>{prov.nombre}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-submit">Añadir Producto</button>
    </form>
  </div>
);
}

export default AddProductos;
