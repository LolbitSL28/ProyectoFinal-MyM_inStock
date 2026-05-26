import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  elimCategorias,
  listarCategorias,
} from "../../redux/actions/categoriasActions";

function TableCategorias({ categorias }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?",
    );
    if (!confirmDelete) {
      return;
    }
    await dispatch(elimCategorias(id)).then(() => alert("Eliminado correcto"));
    await dispatch(listarCategorias());
  }

  const eliminarButton = (props) => {
    return (
      <button onClick={() => handleDelete(props.data.id)}>Eliminar</button>
    );
  };
  function editButton(id) {
    navigate(`/categorias/edit/${id}`);
  }

  const modificarButton = (props) => {
    return <button onClick={() => editButton(props.data.id)}>Modificar</button>;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "modificar", cellRenderer: modificarButton, width: 95 },
    { field: "eliminar", cellRenderer: eliminarButton, width: 90 },
  ];

  return (
    <div style={{ height: "300px", width: "700px" }}>
      <AgGridReact rowData={categorias} columnDefs={columns} />
    </div>
  );
}
export default TableCategorias;
