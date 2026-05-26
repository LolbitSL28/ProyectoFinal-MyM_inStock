import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProductos,
  listarProductos,
} from "../../redux/actions/productosActions";
import { listarCategorias } from "../../redux/actions/categoriasActions";
import { listarProveedores } from "../../redux/actions/proveedoresActions";

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
    <>
      <h1>Agregar Producto</h1>
      <h2>Formulario</h2>
      <label>
        Nombre: <input type="text" name="nombre" onChange={change} />
      </label>
      <br />
      <label>
        Descripción: <input type="text" name="descripcion" onChange={change} />
      </label>
      <br />
      <label>
        Marca: <input type="text" name="marca" onChange={change} />
      </label>
      <br />
      <label>
        Stock: <input type="number" name="stock" onChange={change} />
      </label>
      <br />
      <label>
        Precio Venta:{" "}
        <input type="number" step="0.01" name="precioVenta" onChange={change} />
      </label>
      <br />
      <label>
        Precio Compra:{" "}
        <input
          type="number"
          step="0.01"
          name="precioCompra"
          onChange={change}
        />
      </label>
      <br />
      <label>
        Categoría:{" "}
        <select name="categoriaId" onChange={change}>
          <option value="">Seleccione una categoría</option>
          {categorias?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Proveedor:{" "}
        <select name="proveedorId" onChange={change}>
          <option value="">Seleccione un proveedor</option>
          {proveedores?.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="button" onClick={guardar}>
        Añadir Producto
      </button>
    </>
  );
}

export default AddProductos;
