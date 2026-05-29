import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { listarVentaId } from "../../redux/actions/ventasActions";
import TableDetalleVenta from "./TableDetalleVenta";

function DetalleVenta() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { venta } = useSelector((state) => state.ventas);

  useEffect(() => {
    dispatch(listarVentaId(id));
  }, [dispatch, id]);

  return (
  <div className="detalle-card">
    <button className="btn-volver" onClick={() => navigate("/ventas")}>← Volver</button>
    <h1>Detalle de Venta</h1>
    <hr />
    <h2>Información General</h2>
    <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>
    <p><strong>Usuario:</strong> {venta.usuarioNombre}</p>
    <div className="totales-box">
      <p>Subtotal: ${venta.subtotal}</p>
      <p>IVA (16%): ${venta.iva}</p>
      <h3>Total: ${venta.total}</h3>
    </div>
    <h2>Productos</h2>
    <TableDetalleVenta detalles={venta.detalles} />
  </div>
);
}

export default DetalleVenta;
