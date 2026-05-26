import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCategorias,
  listarCategorias,
} from "../../redux/actions/categoriasActions";
import { useNavigate } from "react-router-dom";
function AddCategorias() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });

  async function guardar() {
    dispatch(addCategorias(categoria)).then(() => alert("Guardado correcto"));
    await dispatch(listarCategorias());
    setCategoria({
      nombre: "",
      descripcion: "",
      username: "",
    });
    navigate("/categorias");
  }
  function change(e) {
    const { name, value } = e.target;

    setCategoria((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <h1>Agregar Categoria</h1>
      <h2>Formulario</h2>
      <label>
        Nombre(s):{" "}
        <input type="text" name="nombre" onChange={(e) => change(e)}></input>
      </label>
      <br />
      <label>
        Descripción:{" "}
        <input
          type="text"
          name="descripcion"
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <button type="button" onClick={guardar}>
        Añadir Categoria
      </button>
    </>
  );
}

export default AddCategorias;
