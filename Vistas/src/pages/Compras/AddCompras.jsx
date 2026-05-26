import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCompra, listarCompras } from "../../redux/actions/comprasActions";
import { listarProductos } from "../../redux/actions/productosActions";
import { listarProveedores } from "../../redux/actions/proveedoresActions";
import TableCarrito from "./TableCarrito";

function AddCompra() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productos } = useSelector((state) => state.productos);
  const { proveedores } = useSelector((state) => state.productos);
  const { user } = useSelector((state) => state.auth);

  const [carrito, setCarrito] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState("");
  const [selectedProveedor, setSelectedProveedor] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precioCompra, setPrecioCompra] = useState(0);

  useEffect(() => {
    dispatch(listarProductos());
    dispatch(listarProveedores());
  }, [dispatch]);

  function agregarAlCarrito() {
    if (!selectedProducto || cantidad <= 0 || precioCompra <= 0) return;
    const producto = productos.find((p) => p.id == selectedProducto);
    if (!producto) return;
    const existe = carrito.find((item) => item.productoId == producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.productoId == producto.id
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
                precioCompra: precioCompra,
              }
            : item,
        ),
      );
    } else {
      setCarrito([
        ...carrito,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          precioCompra: precioCompra,
          cantidad: cantidad,
        },
      ]);
    }

    setSelectedProducto("");
    setCantidad(1);
    setPrecioCompra(0);
  }

  function eliminarDelCarrito(productoId) {
    setCarrito(carrito.filter((item) => item.productoId !== productoId));
  }

  function actualizarCantidad(productoId, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.productoId === productoId
            ? { ...item, cantidad: nuevaCantidad }
            : item,
        ),
      );
    }
  }

  function actualizarPrecio(productoId, nuevoPrecio) {
    if (nuevoPrecio > 0) {
      setCarrito(
        carrito.map((item) =>
          item.productoId === productoId
            ? { ...item, precioCompra: nuevoPrecio }
            : item,
        ),
      );
    }
  }

  function calcularSubtotal() {
    return carrito.reduce(
      (sum, item) => sum + item.precioCompra * item.cantidad,
      0,
    );
  }

  function calcularIva() {
    return calcularSubtotal() * 0.16;
  }

  function calcularTotal() {
    return calcularSubtotal() + calcularIva();
  }

  async function guardar() {
    if (carrito.length === 0) {
      alert("Agregue mínimo un producto");
      return;
    }

    if (!selectedProveedor) {
      alert("Seleccione un proveedor");
      return;
    }

    const compraData = {
      usuarioId: user?.id,
      proveedorId: selectedProveedor,
      detalles: carrito.map((item) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioCompra: item.precioCompra,
      })),
    };

    dispatch(addCompra(compraData)).then(() =>
      alert("Compra registrada correctamente"),
    );
    await dispatch(listarCompras());
    navigate("/compras");
  }

  return (
    <>
      <h1>Nueva Compra</h1>
      <h2>Seleccionar Proveedor</h2>
      <label>
        Proveedor:{" "}
        <select
          value={selectedProveedor}
          onChange={(e) => setSelectedProveedor(e.target.value)}
        >
          <option value="">Seleccione un proveedor</option>
          {proveedores?.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
          ))}
        </select>
      </label>
      <hr />
      <h2>Seleccionar Producto</h2>
      <label>
        Producto:{" "}
        <select
          value={selectedProducto}
          onChange={(e) => setSelectedProducto(e.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {productos?.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nombre} - Stock actual: {prod.stock}
            </option>
          ))}
        </select>
      </label>
      <label>
        Cantidad:{" "}
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value) || 0)}
          min="1"
        />
      </label>
      <label>
        Precio de Compra:{" "}
        <input
          type="number"
          step="0.01"
          value={precioCompra}
          onChange={(e) => setPrecioCompra(parseFloat(e.target.value) || 0)}
          min="0.01"
        />
      </label>
      <button type="button" onClick={agregarAlCarrito}>
        Agregar
      </button>
      <hr />
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <>
          <div>
            <p>Subtotal: ${calcularSubtotal()}</p>
            <p>IVA (16%): ${calcularIva()}</p>
            <h3>Total: ${calcularTotal()}</h3>
          </div>
        </>
      )}
      <TableCarrito
        carrito={carrito}
        onEliminar={eliminarDelCarrito}
        onCantidadChange={actualizarCantidad}
        onPrecioChange={actualizarPrecio}
      />
      <br />
      <button type="button" onClick={guardar}>
        Registrar Compra
      </button>
    </>
  );
}

export default AddCompra;
