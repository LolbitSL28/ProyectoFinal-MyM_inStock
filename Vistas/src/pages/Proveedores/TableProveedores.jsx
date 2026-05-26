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
    await dispatch(elimProveedores(id)).then(() => alert("Eliminado correcto"));
    await dispatch(listarProveedores());
  }

  const eliminarButton = (props) => {
    return (
      <button onClick={() => handleDelete(props.data.id)}>Eliminar</button>
    );
  };
  function editButton(id) {
    navigate(`/proveedores/edit/${id}`);
  }

  const modificarButton = (props) => {
    return <button onClick={() => editButton(props.data.id)}>Modificar</button>;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre" },
    { field: "telefono", headerName: "Teléfono" },
    { field: "direccion", headerName: "Dirección" },
    { field: "modificar", cellRenderer: modificarButton, width: 95 },
    { field: "eliminar", cellRenderer: eliminarButton, width: 90 },
  ];

  return (
    <div style={{ height: "300px", width: "1070px" }}>
      <AgGridReact rowData={proveedores} columnDefs={columns} />
    </div>
  );
}
export default TableProveedores;
