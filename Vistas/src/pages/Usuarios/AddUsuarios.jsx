import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addUsuarios,
  listarUsuarios,
} from "../../redux/actions/usuariosActions";
import { useNavigate } from "react-router-dom";
import "./Usuarios.css";

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
    <div className="usuarios-container">
      <h1>Agregar Usuario</h1>
      <h2>Ingrese los datos:</h2>
      <form className="user-form" onSubmit={(e) => { e.preventDefault(); guardarUsr(); }}>
        <div className="form-group">
          <label>
            Nombre(s):{" "}
            <input type="text" name="nombre" onChange={change}></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Apellido Paterno:{" "}
            <input
              type="text"
              name="apellidoPaterno"
              onChange={change}
            ></input>
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Apellido Materno:{" "}
            <input
              type="text"
              name="apellidoMaterno"
              onChange={change}
            ></input>
          </label>
        </div>
      
        <div className="form-group">
          <label>
            Username:{" "}
            <input type="text" name="username" onChange={change}></input>
          </label>
        </div>
      
        <div className="form-group">
          <label>
            Contraseña:{" "}
            <input
              type="password"
              name="password"
              onChange={change}
            ></input>
          </label>
        </div>
      
        <button type="submit" className="btn-submit">
          Añadir Usuario
        </button>
      </form>      
    </div>
  );
}

export default AddUsuarios;
