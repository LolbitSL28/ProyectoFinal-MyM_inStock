import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProveedores,
  listarProveedores,
} from "../../redux/actions/proveedoresActions";
import { useNavigate } from "react-router-dom";
import "./Proveedores.css";

function AddProveedores() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState({
    id: "",
    nombre: "",
    telefono: "",
    direccion: "",
  });

  async function guardar() {
    dispatch(addProveedores(proveedor)).then(() => alert("Guardado correcto"));
    await dispatch(listarProveedores());
    setProveedor({
      id: "",
      nombre: "",
      telefono: "",
      direccion: "",
    });
    navigate("/proveedores");
  }
  function change(e) {
    const { name, value } = e.target;

    setProveedor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="proveedores-container">
      <h1>Agregar Proveedor</h1>
      <h2>Ingrese los datos:</h2>
      <form className="proveedor-form" onSubmit={(e) => { e.preventDefault(); guardar(); }}>
        <div className="form-group">
          <label>
            Nombre(s):{" "}
            <input type="text" name="nombre" onChange={change}></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Teléfono:{" "}
            <input type="text" name="telefono" onChange={change}></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Dirección:{" "}
          <input type="text" name="direccion" onChange={(e) => change(e)}></input>
        </label>
        </div>

        <button type="submit" className="btn-submit">
          Añadir Proveedor
        </button>
      </form>
    </div>
  );
}

export default AddProveedores;
