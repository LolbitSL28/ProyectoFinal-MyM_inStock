import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarCategorias } from "../../redux/actions/categoriasActions";
import { useNavigate } from "react-router-dom";
import TableCategorias from "./TableCategorias";

function GetCategorias() {
  const dispatch = useDispatch();
  const { categorias } = useSelector((store) => store.categorias);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listarCategorias());
  }, [dispatch]);

  return (
    <>
      <h1>Categorias</h1>
      <button onClick={() => dispatch(listarCategorias())}>Actualizar</button>
      <button onClick={() => navigate("/categorias/add")}>
        Agregar Categoria
      </button>
      <TableCategorias categorias={categorias} />
    </>
  );
}

export default GetCategorias;
