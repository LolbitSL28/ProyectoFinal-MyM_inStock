import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  elimUsuarios,
  listarUsuarios,
} from "../../redux/actions/usuariosActions";

function TableUsers({ usuarios }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?",
    );
    if (!confirmDelete) {
      return;
    }
    await dispatch(elimUsuarios(id)).then(() => alert("Eliminado correcto"));
    await dispatch(listarUsuarios());
  }

  const eliminarButton = (props) => {
    return (
      <button className="grid-btn grid-btn-delete" onClick={() => handleDelete(props.data.id)}>Eliminar</button>
    );
  };
  function editButton(id) {
    navigate(`/users/edit/${id}`);
  }

  const modificarButton = (props) => {
    return <button className="grid-btn grid-btn-edit" onClick={() => editButton(props.data.id)}>Modificar</button>;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellidoPaterno", headerName: "Apellido Paterno", flex: 1 },
    { field: "apellidoMaterno", headerName: "Apellido Materno", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "modificar", cellRenderer: modificarButton, width: 95, flex: 1 },
    { field: "eliminar", cellRenderer: eliminarButton, width: 90, flex: 1 },
  ];

  return (
    <div className="table-wrapper">
      <div className="ag-theme-alpine" style={{ height: "300px", width: "100%" }}>
        <AgGridReact rowData={usuarios} columnDefs={columns} />
      </div>
    </div>
    
  );
}
export default TableUsers;
