import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarVentas } from "../../redux/actions/ventasActions";
import { useNavigate } from "react-router-dom";
import TableVentas from "./TableVentas";
import "./Ventas.css";

function GetVentas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ventas } = useSelector((state) => state.ventas);

  useEffect(() => {
    dispatch(listarVentas());
  }, [dispatch]);

 return (
  <div className="ventas-container">
    <h1>Ventas</h1>
    <div className="action-bar">
      <button className="btn-action btn-refresh" onClick={() => dispatch(listarVentas())}>Actualizar</button>
      <button className="btn-action btn-add" onClick={() => navigate("/ventas/add")}>Nueva Venta</button>
    </div>
    <TableVentas ventas={ventas} />
  </div>
);
}

export default GetVentas;
