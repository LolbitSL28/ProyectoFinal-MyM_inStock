import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editCategorias,
  listarCategorias,
} from "../../redux/actions/categoriasActions";
import { useNavigate, useParams } from "react-router-dom";
import "./Categorias.css";

function EditCategorias() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    cargarCategoria();
  }, [id]);

  async function cargarCategoria() {
    const response = await dispatch(listarCategorias());
    if (response.type === "categorias/listar/fulfilled") {
      const categorias = response.payload;
      const foundCategoria = categorias.find(
        (cat) => cat.Id == id || cat.id == id,
      );
      if (foundCategoria) {
        setCategoria({
          id: foundCategoria.id,
          nombre: foundCategoria.nombre,
          descripcion: foundCategoria.descripcion,
        });
      }
    }
  }

  async function guardar() {
    await dispatch(editCategorias({ id: categoria.id, data: categoria })).then(
      () => alert("Modificación correcta"),
    );
    await dispatch(listarCategorias());
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
      <h1>Editar Categoria</h1>
      <h2>Ingrese los datos:</h2>
      <form className="category-form" onSubmit={(e) => { e.preventDefault(); guardar(); }}>
        <div className="form-group">
          <label>
            Nombre(s):{" "}
            <input
              type="text"
              name="nombre"
              value={categoria.nombre}
              onChange={change}
            ></input>
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Descripción:{" "}
            <input
              type="text"
              name="descripcion"
              value={categoria.descripcion}
              onChange={change}
            ></input>
          </label>
        </div>

        <button type="submit" className="btn-submit">
          Modificar Categoria
        </button>
      </form>
    </div>
  );
}

export default EditCategorias;
