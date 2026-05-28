import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCategorias,
  listarCategorias,
} from "../../redux/actions/categoriasActions";
import { useNavigate } from "react-router-dom";
import "./Categorias.css";

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
    <div className="categorias-container">
      <h1>Agregar Categoria</h1>
      <h2>Ingrese los datos:</h2>
      <form className="categorias-form" onSubmit={(e) => { e.preventDefault(); guardar(); }}>
        <div className="form-group">
          <label>
            Nombre(s):{" "}
            <input type="text" name="nombre" onChange={change}></input>
          </label>
        </div>

        <div className="form-group">
          <label>
            Descripción:{" "}
            <input
              type="text"
              name="descripcion"
              onChange={change}
            ></input>
          </label>
        </div>

        <button type="submit" className="btn-submit">
          Añadir Categoria
        </button>
      </form>     
    </div>
  );
}

export default AddCategorias;
