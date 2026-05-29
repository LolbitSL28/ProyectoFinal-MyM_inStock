import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editUsuarios,
  listarUsuarios,
} from "../../redux/actions/usuariosActions";
import { useNavigate, useParams } from "react-router-dom";
import "./Usuarios.css";

function EditUsuarios() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    username: "",
    password: "",
    habilitado: "1",
  });

  useEffect(() => {
    cargarUsuario();
  }, [id]);

  async function cargarUsuario() {
    const response = await dispatch(listarUsuarios());
    if (response.type === "usuarios/listar/fulfilled") {
      const usuarios = response.payload;
      const foundUser = usuarios.find((user) => user.Id == id || user.id == id);
      if (foundUser) {
        setUsuario({
          id: foundUser.id,
          nombre: foundUser.nombre,
          apellidoPaterno: foundUser.apellidoPaterno,
          apellidoMaterno: foundUser.apellidoMaterno,
          username: foundUser.username,
          password: foundUser.password,
          habilitado: "1",
        });
      }
    }
  }

  async function guardarUser() {
    await dispatch(editUsuarios({ id: usuario.id, data: usuario })).then(() =>
      alert("Modificación correcta"),
    );
    await dispatch(listarUsuarios());
    navigate("/users");
  }
  function change(e) {
    const { name, value } = e.target;

    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="usuarios-container">
      <h1>Editar Usuario</h1>
      <h2>Ingrese los datos:</h2>
      <form className="user-form" onSubmit={(e) => { e.preventDefault(); guardarUser(); }}>
        <div className="form-group">
          <label>
            Nombre(s):{" "}
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={(e) => change(e)}
            ></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Apellido Paterno:{" "}
            <input
              type="text"
              name="apellidoPaterno"
              value={usuario.apellidoPaterno}
              onChange={(e) => change(e)}
            ></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Apellido Materno:{" "}
            <input
              type="text"
              name="apellidoMaterno"
              value={usuario.apellidoMaterno}
              onChange={(e) => change(e)}
            ></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              value={usuario.username}
              onChange={(e) => change(e)}
            ></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Contraseña:{" "}
            <input
              type="password"
              name="password"
              value={usuario.password}
              onChange={(e) => change(e)}
            ></input>
          </label>
        </div>
        <button type="submit" className="btn-submit">
          Modificar Usuario
        </button>
      </form>
    </div>
  );
}

export default EditUsuarios;
