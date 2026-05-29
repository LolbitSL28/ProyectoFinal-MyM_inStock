import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarCompras } from "../../redux/actions/comprasActions";
import { useNavigate } from "react-router-dom";
import TableCompras from "./TableCompras";
import "./Compras.css";

function GetCompras() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { compras } = useSelector((state) => state.compras);

  useEffect(() => {
    dispatch(listarCompras());
  }, [dispatch]);

 
return (
  <div className="compras-container">
    <h1>Compras</h1>
    <br/>
    <div className="action-bar">
      <button className="btn-action btn-refresh" onClick={() => dispatch(listarCompras())}>Actualizar</button>
      <button className="btn-action btn-add" onClick={() => navigate("/compras/add")}>Nueva Compra</button>
    </div>
    <TableCompras compras={compras} />
  </div>
);

}

export default GetCompras;
