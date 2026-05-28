import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  elimCategorias,
  listarCategorias,
} from "../../redux/actions/categoriasActions";
import "./Categorias.css";

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
      <button className="grid-btn grid-btn-delete" onClick={() => handleDelete(props.data.id)}>Eliminar</button>
    );
  };
  function editButton(id) {
    navigate(`/categorias/edit/${id}`);
  }

  const modificarButton = (props) => {
    return <button className="grid-btn grid-btn-edit" onClick={() => editButton(props.data.id)}>Modificar</button>;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
    { field: "modificar", cellRenderer: modificarButton, width: 110, flex: 1},
    { field: "eliminar", cellRenderer: eliminarButton, width: 110, flex: 1},
  ];

  return (
    <div className="table-wrapper">
      <div className="ag-theme-alpine" style={{ height: "350px", width: "100%" }}>
        <AgGridReact rowData={categorias} columnDefs={columns} />
      </div>
    </div>
    
  );
}
export default TableCategorias;
