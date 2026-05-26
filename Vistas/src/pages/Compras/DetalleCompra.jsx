import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { listarCompraId } from "../../redux/actions/comprasActions";
import TableDetalleCompras from "./TableDetalleCompras";

function DetalleCompra() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { compra } = useSelector((state) => state.compras);

  useEffect(() => {
    dispatch(listarCompraId(id));
  }, [dispatch, id]);

  return (
    <>
      <h1>Detalle de Compra #{compra.id}</h1>
      <button onClick={() => navigate("/compras")}>Volver</button>
      <hr />
      <h2>Información General</h2>
      <p>
        <strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}
      </p>
      <p>
        <strong>Proveedor:</strong> {compra.proveedorNombre}
      </p>
      <p>
        <strong>Usuario:</strong> {compra.usuarioNombre}
      </p>
      <p>
        <strong>Subtotal:</strong> ${compra.subtotal}
      </p>
      <p>
        <strong>IVA (16%):</strong> ${compra.iva}
      </p>
      <p>
        <strong>Total:</strong> ${compra.total}
      </p>
      <h2>Productos</h2>
      <TableDetalleCompras detalles={compra.detalles} />
    </>
  );
}

export default DetalleCompra;
