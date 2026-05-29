import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarProductos } from "../../redux/actions/productosActions";
import { useNavigate } from "react-router-dom";
import TableProductos from "./TableProductos";
import "./Productos.css";

function GetProductos() {
  const dispatch = useDispatch();
  const { productos } = useSelector((store) => store.productos);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  return (
  <div className="productos-container">
    <h1>Productos</h1>
    <div className="action-bar">
      <button className="btn-action btn-refresh" onClick={() => dispatch(listarProductos())}>Actualizar</button>
      <button className="btn-action btn-add" onClick={() => navigate("/productos/add")}>Agregar Producto</button>
    </div>
    <TableProductos productos={productos} />
  </div>
);
}

export default GetProductos;
