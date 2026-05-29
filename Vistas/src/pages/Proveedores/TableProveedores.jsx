import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  elimProveedores,
  listarProveedores,
} from "../../redux/actions/proveedoresActions";

function TableProveedores({ proveedores }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este proveedor?",
    );
    if (!confirmDelete) {
      return;
    }
    await dispatch(elimProveedores(id)).then(() => alert("Eliminado correcto"));
    await dispatch(listarProveedores());
  }

  const eliminarButton = (props) => {
    return (
      <button className="grid-btn grid-btn-delete" onClick={() => handleDelete(props.data.id)}>Eliminar</button>
    );
  };
  function editButton(id) {
    navigate(`/proveedores/edit/${id}`);
  }

  const modificarButton = (props) => {
    return <button className="grid-btn grid-btn-edit" onClick={() => editButton(props.data.id)}>Modificar</button>;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "direccion", headerName: "Dirección", flex: 2 },
    { field: "modificar", cellRenderer: modificarButton, width: 110, flex: 1 },
    { field: "eliminar", cellRenderer: eliminarButton, width: 110, flex: 1 },
  ];

  return (
    <div className="table-wrapper">
      <div style={{ height: "300px", width: "100%" }}>
        <AgGridReact rowData={proveedores} columnDefs={columns} />
      </div>
    </div>
  );
}
export default TableProveedores;
