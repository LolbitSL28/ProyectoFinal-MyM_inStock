import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarUsuarios } from "../../redux/actions/usuariosActions";
import { useNavigate } from "react-router-dom";
import TableUsers from "./TableUsers";
import "./Usuarios.css";

function GetUsuarios() {
  const dispatch = useDispatch();
  const { usuarios } = useSelector((store) => store.usuarios);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listarUsuarios());
  }, [dispatch]);

  return (
    <div className="usuarios-container">
      <h1>Usuarios</h1>
      <br/>
      <div className="action-bar">
        <button className="btn-action btn-refresh" onClick={() => dispatch(listarUsuarios())}>Actualizar</button>
        <button className="btn-action btn-add" onClick={() => navigate("/users/add")}>Agregar Usuario</button>
      </div>
      <TableUsers usuarios={usuarios} />
    </div>
  );
}

export default GetUsuarios;
