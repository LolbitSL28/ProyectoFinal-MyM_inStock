import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { listarCompraId } from "../../redux/actions/comprasActions";
import TableDetalleCompras from "./TableDetalleCompras";
import "./Compras.css";

function DetalleCompra() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { compra } = useSelector((state) => state.compras);

  useEffect(() => {
    dispatch(listarCompraId(id));
  }, [dispatch, id]);

  return (
  <div className="detalle-card">
    <button className="btn-volver" onClick={() => navigate("/compras")}>← Volver</button>
    <h1>Detalle de Compra #{compra.id}</h1>
    <hr />
    <h2>Información General</h2>
    <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}</p>
    <p><strong>Proveedor:</strong> {compra.proveedorNombre}</p>
    <p><strong>Usuario:</strong> {compra.usuarioNombre}</p>
    <div className="totales-box">
      <p>Subtotal: ${compra.subtotal}</p>
      <p>IVA (16%): ${compra.iva}</p>
      <h3>Total: ${compra.total}</h3>
    </div>
    <h2>Productos</h2>
    <TableDetalleCompras detalles={compra.detalles} />
  </div>
);
}

export default DetalleCompra;
