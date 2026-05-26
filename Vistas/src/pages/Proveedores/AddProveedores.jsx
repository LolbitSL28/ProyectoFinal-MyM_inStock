import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProveedores,
  listarProveedores,
} from "../../redux/actions/proveedoresActions";
import { useNavigate } from "react-router-dom";
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
    <>
      <h1>Agregar Proveedor</h1>
      <h2>Formulario</h2>
      <label>
        Nombre(s):{" "}
        <input type="text" name="nombre" onChange={(e) => change(e)}></input>
      </label>
      <br />
      <label>
        Teléfono:{" "}
        <input type="text" name="telefono" onChange={(e) => change(e)}></input>
      </label>
      <br />
      <label>
        Dirección:{" "}
        <input type="text" name="direccion" onChange={(e) => change(e)}></input>
      </label>
      <br />
      <button type="button" onClick={guardar}>
        Añadir Proveedor
      </button>
    </>
  );
}

export default AddProveedores;
