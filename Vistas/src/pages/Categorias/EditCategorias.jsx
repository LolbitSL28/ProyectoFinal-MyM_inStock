import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editCategorias,
  listarCategorias,
} from "../../redux/actions/categoriasActions";
import { useNavigate, useParams } from "react-router-dom";

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
    <>
      <h1>Editar Categoria</h1>
      <h2>Formulario</h2>
      <label>
        Nombre(s):{" "}
        <input
          type="text"
          name="nombre"
          value={categoria.nombre}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <label>
        Descripción:{" "}
        <input
          type="text"
          name="descripcion"
          value={categoria.descripcion}
          onChange={(e) => change(e)}
        ></input>
      </label>
      <br />
      <button type="button" onClick={guardar}>
        Modificar Categoria
      </button>
    </>
  );
}

export default EditCategorias;
