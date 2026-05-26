import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editProveedores,
  listarProveedores,
} from "../../redux/actions/proveedoresActions";
import { useNavigate, useParams } from "react-router-dom";

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
    <>
      <h1>Editar Proveedor</h1>
      <h2>Formulario</h2>
      <label>
        Nombre(s):{" "}
        <input
          type="text"
          name="nombre"
          value={proveedor.nombre}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Teléfono:{" "}
        <input
          type="text"
          name="telefono"
          value={proveedor.telefono}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Dirección:{" "}
        <input
          type="text"
          name="direccion"
          value={proveedor.direccion}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <button type="button" onClick={guardar}>
        Modificar Proveedor
      </button>
    </>
  );
}

export default EditProveedores;
