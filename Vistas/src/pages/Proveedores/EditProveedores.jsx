import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editProveedores,
  listarProveedores,
} from "../../redux/actions/proveedoresActions";
import { useNavigate, useParams } from "react-router-dom";
import "./Proveedores.css";

function EditProveedores() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [proveedor, setProveedor] = useState({
    id: "",
    nombre: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    cargarProveedor();
  }, [id]);

  async function cargarProveedor() {
    const response = await dispatch(listarProveedores());
    if (response.type === "proveedores/listar/fulfilled") {
      const proveedores = response.payload;
      const foundProveedor = proveedores.find(
        (prov) => prov.Id == id || prov.id == id,
      );
      if (foundProveedor) {
        setProveedor({
          id: foundProveedor.id,
          nombre: foundProveedor.nombre,
          telefono: foundProveedor.telefono,
          direccion: foundProveedor.direccion,
        });
      }
    }
  }

  async function guardar() {
    await dispatch(editProveedores({ id: proveedor.id, data: proveedor })).then(
      () => alert("Modificación correcta"),
    );
    await dispatch(listarProveedores());
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
      <h1>Editar Proveedor</h1>
      <h2>Introducir los datos:</h2>
      <form className="proveedor-form" onSubmit={(e) => { e.preventDefault(); guardar(); }}>
        <div className="form-group">
          <label>
            Nombre(s):{" "}
            <input
              type="text"
              name="nombre"
              value={proveedor.nombre}
              onChange={change}
            ></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Teléfono:{" "}
            <input
              type="text"
              name="telefono"
              value={proveedor.telefono}
              onChange={change}
            ></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Dirección:{" "}
            <input
              type="text"
              name="direccion"
              value={proveedor.direccion}
              onChange={change}
            ></input>
          </label>
        </div>

        <button type="submit" className="btn-submit">
          Modificar Proveedor
        </button>
      </form>
    </div>
  );
}

export default EditProveedores;
