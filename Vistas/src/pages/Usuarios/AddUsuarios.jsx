import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addUsuarios,
  listarUsuarios,
} from "../../redux/actions/usuariosActions";
import { useNavigate } from "react-router-dom";
function AddUsuarios() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    username: "",
    password: "",
    habilitado: "1",
  });

  async function guardarUsr() {
    dispatch(addUsuarios(usuario)).then(() => alert("Guardado correcto"));
    console.log(usuario);
    await dispatch(listarUsuarios());
    setUsuario({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      username: "",
      password: "",
      habilitado: "1",
    });
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
      <h1>Agregar Usuario</h1>
      <h2>Formulario</h2>
      <label>
        Nombre(s):{" "}
        <input type="text" name="nombre" onChange={(e) => change(e)}></input>
      </label>
      <br />
      <label>
        Apellido Paterno:{" "}
        <input
          type="text"
          name="apellidoPaterno"
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Apellido Materno:{" "}
        <input
          type="text"
          name="apellidoMaterno"
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Username:{" "}
        <input type="text" name="username" onChange={(e) => change(e)}></input>
      </label>
      <br />
      <label>
        Contraseña:{" "}
        <input
          type="password"
          name="password"
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <button type="button" onClick={guardarUsr}>
        Añadir Usuario
      </button>
    </>
  );
}

export default AddUsuarios;
