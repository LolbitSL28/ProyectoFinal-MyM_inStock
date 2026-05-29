import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Productos/Productos.css";
import {
  elimProductos,
  listarProductos,
} from "../../redux/actions/productosActions";

function TableProductos({ productos }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?",
    );
    if (!confirmDelete) {
      return;
    }
    await dispatch(elimProductos(id)).then(() => alert("Eliminado correcto"));
    await dispatch(listarProductos());
  }

  const eliminarButton = (props) => {
    return (
      <button className="grid-btn grid-btn-delete" onClick={() => handleDelete(props.data.id)}>Eliminar</button>
    );
  };
  function editButton(id) {
    navigate(`/productos/edit/${id}`);
  }

  const modificarButton = (props) => {
    return <button className="grid-btn grid-btn-edit" onClick={() => editButton(props.data.id)}>Modificar</button>;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre"},
    { field: "descripcion", headerName: "Descripción"},
    { field: "marca", headerName: "Marca"},
    { field: "stock", headerName: "Stock"},
    { field: "precioVenta", headerName: "Precio de Venta"},
    { field: "precioCompra", headerName: "Precio de Compra"},
    { field: "categoriaNombre", headerName: "Categoría"},
    { field: "proveedorNombre", headerName: "Proveedor"},
    { field: "modificar", cellRenderer: modificarButton, width: 110},
    { field: "eliminar", cellRenderer: eliminarButton, width: 110},
  ];

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <AgGridReact rowData={productos} columnDefs={columns} />
    </div>
  </div>
);
}
export default TableProductos;
