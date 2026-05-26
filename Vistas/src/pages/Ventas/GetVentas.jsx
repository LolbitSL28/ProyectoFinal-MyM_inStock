import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarVentas } from "../../redux/actions/ventasActions";
import { useNavigate } from "react-router-dom";
import TableVentas from "./TableVentas";

function GetVentas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ventas } = useSelector((state) => state.ventas);

  useEffect(() => {
    dispatch(listarVentas());
  }, [dispatch]);

  return (
    <>
      <h1>Ventas</h1>
      <button onClick={() => dispatch(listarVentas())}>Actualizar</button>
      <button onClick={() => navigate("/ventas/add")}>Nueva Venta</button>
      <TableVentas ventas={ventas} />
    </>
  );
}

export default GetVentas;
