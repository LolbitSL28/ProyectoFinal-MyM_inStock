import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarProductos } from "../../redux/actions/productosActions";
import { useNavigate } from "react-router-dom";
import TableProductos from "./TableProductos";

function GetProductos() {
  const dispatch = useDispatch();
  const { productos } = useSelector((store) => store.productos);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  return (
    <>
      <h1>Productos</h1>
      <button onClick={() => dispatch(listarProductos())}>Actualizar</button>
      <button onClick={() => navigate("/productos/add")}>
        Agregar Producto
      </button>
      <TableProductos productos={productos} />
    </>
  );
}

export default GetProductos;
