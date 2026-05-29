import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProductos,
  listarProductos,
} from "../../redux/actions/productosActions";
import { listarCategorias } from "../../redux/actions/categoriasActions";
import { listarProveedores } from "../../redux/actions/proveedoresActions";
import { useNavigate, useParams } from "react-router-dom";
import "./Productos.css";

function EditProductos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categorias, proveedores } = useSelector((state) => state.productos);

  const [producto, setProducto] = useState({
    id: "",
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
    cargarProducto();
    dispatch(listarCategorias());
    dispatch(listarProveedores());
  }, [id]);

  async function cargarProducto() {
    const response = await dispatch(listarProductos());
    if (response.type === "productos/listar/fulfilled") {
      const productos = response.payload;
      const foundProducto = productos.find(
        (prod) => prod.Id == id || prod.id == id,
      );
      if (foundProducto) {
        setProducto({
          id: foundProducto.id,
          nombre: foundProducto.nombre,
          descripcion: foundProducto.descripcion || "",
          marca: foundProducto.marca || "",
          stock: foundProducto.stock,
          precioVenta: foundProducto.precioVenta,
          precioCompra: foundProducto.precioCompra,
          categoriaId: foundProducto.categoriaId,
          proveedorId: foundProducto.proveedorId,
        });
      }
    }
  }

  async function guardar() {
    await dispatch(editProductos({ id: producto.id, data: producto })).then(
      () => alert("Modificación correcta"),
    );
    await dispatch(listarProductos());
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
    <h1>Editar Producto</h1>
    <h2 style={{textAlign:"center", color:"#64748b", fontSize:"1.1rem"}}>Modifique los datos:</h2>
    <form className="producto-form" onSubmit={(e) => { e.preventDefault(); guardar(); }}>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={change} />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input type="text" name="descripcion" value={producto.descripcion} onChange={change} />
      </div>
      <div className="form-group">
        <label>Marca</label>
        <input type="text" name="marca" value={producto.marca} onChange={change} />
      </div>
      <div className="form-group">
        <label>Stock</label>
        <input type="number" name="stock" value={producto.stock} onChange={change} />
      </div>
      <div className="form-group">
        <label>Precio Venta</label>
        <input type="number" step="0.01" name="precioVenta" value={producto.precioVenta} onChange={change} />
      </div>
      <div className="form-group">
        <label>Precio Compra</label>
        <input type="number" step="0.01" name="precioCompra" value={producto.precioCompra} onChange={change} />
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <select name="categoriaId" value={producto.categoriaId} onChange={change}>
          <option value="">Seleccione una categoría</option>
          {categorias?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Proveedor</label>
        <select name="proveedorId" value={producto.proveedorId} onChange={change}>
          <option value="">Seleccione un proveedor</option>
          {proveedores?.map((prov) => (
            <option key={prov.id} value={prov.id}>{prov.nombre}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-submit">Modificar Producto</button>
    </form>
  </div>
);
}

export default EditProductos;
