import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

function TableDetallesVenta({ carrito, onEliminar, onCantidadChange }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const eliminarButton = (props) => {
    return (
      <button onClick={() => onEliminar(props.data.productoId)}>
        Eliminar
      </button>
    );
  };

  const cantidadEditor = (props) => {
    return (
      <input
        type="number"
        value={props.value}
        onChange={(e) => {
          const nuevaCantidad = parseInt(e.target.value) || 0;
          if (nuevaCantidad > 0) {
            onCantidadChange(props.data.productoId, nuevaCantidad);
          }
        }}
        min="1"
        style={{ width: "100%", height: "100%" }}
      />
    );
  };

  const columns = [
    { field: "nombre", headerName: "Producto", width: 200 },
    {
      field: "precio",
      headerName: "Precio",
      width: 100,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 120,
      cellRenderer: cantidadEditor,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      width: 120,
      valueGetter: (params) => params.data.precio * params.data.cantidad,
    },
    {
      field: "eliminar",
      headerName: "Acciones",
      width: 100,
      cellRenderer: eliminarButton,
    },
  ];

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <AgGridReact rowData={carrito} columnDefs={columns} />
    </div>
  );
}

export default TableDetallesVenta;
