import { useState } from "react";
import { useDispatch } from "react-redux";
import { actLogin } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <br/>
        </div>
        
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); LogOn(); }}>
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

          <button type="submit" className="btn-login-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
