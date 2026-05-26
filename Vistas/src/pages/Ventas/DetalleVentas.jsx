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
    <>
      <h1>Detalle de Venta</h1>
      <button onClick={() => navigate("/ventas")}>Volver</button>
      <hr />
      <h2>Información General</h2>
      <p>
        <strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}
      </p>
      <p>
        <strong>Usuario:</strong> {venta.usuarioNombre}
      </p>
      <p>
        <strong>Subtotal:</strong> ${venta.subtotal}
      </p>
      <p>
        <strong>IVA (16%):</strong> ${venta.iva}
      </p>
      <p>
        <strong>Total:</strong> ${venta.total}
      </p>
      <h2>Productos</h2>
      <div>
        <TableDetalleVenta detalles={venta.detalles} />
      </div>
    </>
  );
}

export default DetalleVenta;
