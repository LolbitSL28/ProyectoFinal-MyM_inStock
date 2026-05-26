import { useState } from "react";
import { useDispatch } from "react-redux";
import { actLogin } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });

  async function LogOn() {
    const result = await dispatch(actLogin(usuario));
    if (result.payload?.token) {
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
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
      <h1>Login</h1>
      <h2>Formulario</h2>
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
      <button type="button" onClick={LogOn}>
        Login
      </button>
    </>
  );
}

export default Login;
