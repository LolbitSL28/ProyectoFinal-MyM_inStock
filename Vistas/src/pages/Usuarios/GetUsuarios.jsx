import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarUsuarios } from "../../redux/actions/usuariosActions";
import { useNavigate } from "react-router-dom";
import TableUsers from "./TableUsers";

function ObtenerUsuarios() {
  const dispatch = useDispatch();
  const { usuarios } = useSelector((store) => store.usuarios);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listarUsuarios());
  }, [dispatch]);

  return (
    <>
      <button onClick={() => dispatch(listarUsuarios())}>Actualizar</button>
      <button onClick={() => navigate("/users/add")}>Agregar Usuario</button>
      <TableUsers usuarios={usuarios} />
    </>
  );
}

export default ObtenerUsuarios;
