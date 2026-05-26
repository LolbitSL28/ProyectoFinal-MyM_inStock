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
    console.log(id);
    await dispatch(elimUsuarios(id)).then(() => alert("Eliminado correcto"));
    await dispatch(listarUsuarios());
  }

  const eliminarButton = (props) => {
    return (
      <button onClick={() => handleDelete(props.data.usuarioId)}>
        Eliminar
      </button>
    );
  };
  function editButton(id) {
    console.log(id);
    navigate(`/edit/${id}`);
  }

  const modificarButton = (props) => {
    return (
      <button onClick={() => editButton(props.data.usuarioId)}>
        Modificar
      </button>
    );
  };

  const columns = [
    { field: "usuarioId", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre" },
    { field: "apellidoPaterno", headerName: "Apellido Paterno" },
    { field: "apellidoMaterno", headerName: "Apellido Materno" },
    { field: "nombreUsuario", headerName: "Username" },
    { field: "modificar", cellRenderer: modificarButton, width: 95 },
    { field: "eliminar", cellRenderer: eliminarButton, width: 90 },
  ];

  return (
    <div style={{ height: "300px", width: "1070px" }}>
      <AgGridReact rowData={usuarios} columnDefs={columns} />
    </div>
  );
}
export default TableUsers;
