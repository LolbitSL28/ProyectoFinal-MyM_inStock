import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVenta, listarVentas } from "../../redux/actions/ventasActions";
import { listarProductos } from "../../redux/actions/productosActions";
import TableCarrito from "./TableCarrito";

function AddVenta() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productos } = useSelector((state) => state.productos);
  const { user } = useSelector((state) => state.auth);

  const [carrito, setCarrito] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  function agregarAlCarrito() {
    if (!selectedProducto || cantidad <= 0) return;
    const producto = productos.find((p) => p.id == selectedProducto);
    if (!producto) return;
    if (producto.stock < cantidad) {
      alert(`Stock insuficiente`);
      return;
    }
    const existe = carrito.find((item) => item.productoId == producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.productoId == producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        ),
      );
    } else {
      setCarrito([
        ...carrito,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precioVenta,
          cantidad: cantidad,
        },
      ]);
    }
    setSelectedProducto("");
    setCantidad(1);
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

  function calcularSubtotal() {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
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

    const ventaData = {
      usuarioId: user?.id,
      detalles: carrito.map((item) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
      })),
    };

    dispatch(addVenta(ventaData)).then(() =>
      alert("Venta registrada correctamente"),
    );
    await dispatch(listarVentas());
    navigate("/ventas");
  }

  return (
    <>
      <h1>Nueva Venta</h1>
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
              {prod.nombre} - ${prod.precioVenta} (Stock: {prod.stock})
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
      <TableDetallesVenta
        carrito={carrito}
        onEliminar={eliminarDelCarrito}
        onCantidadChange={actualizarCantidad}
      />
      <br />
      <button type="button" onClick={guardar}>
        Registrar Venta
      </button>
    </>
  );
}

export default AddVenta;
