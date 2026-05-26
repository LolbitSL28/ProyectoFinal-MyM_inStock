import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editUsuarios,
  listarUsuarios,
} from "../../redux/actions/usuariosActions";
import { useNavigate, useParams } from "react-router-dom";

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
    console.log(usuario);
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
    <>
      <h2>Formulario</h2>
      <label>
        Nombre(s):{" "}
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Apellido Paterno:{" "}
        <input
          type="text"
          name="apellidoPaterno"
          value={usuario.apellidoPaterno}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Apellido Materno:{" "}
        <input
          type="text"
          name="apellidoMaterno"
          value={usuario.apellidoMaterno}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Username:{" "}
        <input
          type="text"
          name="username"
          value={usuario.username}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Contraseña:{" "}
        <input
          type="password"
          name="password"
          value={usuario.password}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <button type="button" onClick={guardarUser}>
        Modificar Usuario
      </button>
    </>
  );
}

export default EditUsuarios;
