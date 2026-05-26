import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

function TableCarrito({
  carrito,
  onEliminar,
  onCantidadChange,
  onPrecioChange,
}) {
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

  const precioEditor = (props) => {
    return (
      <input
        type="number"
        step="0.01"
        value={props.value}
        onChange={(e) => {
          const nuevoPrecio = parseFloat(e.target.value) || 0;
          if (nuevoPrecio > 0) {
            onPrecioChange(props.data.productoId, nuevoPrecio);
          }
        }}
        min="0.01"
        style={{ width: "100%", height: "100%" }}
      />
    );
  };

  const columns = [
    { field: "nombre", headerName: "Producto", width: 200 },
    {
      field: "precioCompra",
      headerName: "Precio Compra",
      cellRenderer: precioEditor,
    },
    { field: "cantidad", headerName: "Cantidad", cellRenderer: cantidadEditor },
    {
      field: "subtotal",
      headerName: "Subtotal",
      valueGetter: (params) => params.data.precioCompra * params.data.cantidad,
    },
    { field: "eliminar", headerName: "Acciones", cellRenderer: eliminarButton },
  ];

  return (
    <div style={{ height: "300px", width: "1070px" }}>
      <AgGridReact rowData={carrito} columnDefs={columns} />
    </div>
  );
}

export default TableCarrito;
