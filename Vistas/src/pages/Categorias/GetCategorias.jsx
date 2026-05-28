import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarCategorias } from "../../redux/actions/categoriasActions";
import { useNavigate } from "react-router-dom";
import TableCategorias from "./TableCategorias";
import "./Categorias.css";

function GetCategorias() {
  const dispatch = useDispatch();
  const { categorias } = useSelector((store) => store.categorias);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listarCategorias());
  }, [dispatch]);

  return (
    <div className="categorias-container">
      <h1>Categorias</h1>
      <br/>
      <div className="action-bar">
        <button className="btn-action btn-refresh" onClick={() => dispatch(listarCategorias())}>Actualizar</button>
        <button className="btn-action btn-add" onClick={() => navigate("/categorias/add")}>Agregar Categoria</button>
      </div>
      <TableCategorias categorias={categorias} />
    </div>
  );
}

export default GetCategorias;
