import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarCompras } from "../../redux/actions/comprasActions";
import { useNavigate } from "react-router-dom";
import TableCompras from "./TableCompras";

function GetCompras() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { compras } = useSelector((state) => state.compras);

  useEffect(() => {
    dispatch(listarCompras());
  }, [dispatch]);

  return (
    <>
      <h1>Compras</h1>
      <button onClick={() => dispatch(listarCompras())}>Actualizar</button>
      <button onClick={() => navigate("/compras/add")}>Nueva Compra</button>
      <TableCompras compras={compras} />
    </>
  );
}

export default GetCompras;
