import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

function TableDetalleVenta({ detalles }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const columns = [
    { field: "productoNombre", headerName: "Producto", width: 200 },
    { field: "precioVenta", headerName: "Precio" },
    { field: "cantidad", headerName: "Cantidad", width: 100 },
    { field: "subtotal", headerName: "Subtotal" },
  ];

  return (
    <div style={{ height: "300px", width: "1070px" }}>
      <AgGridReact rowData={detalles} columnDefs={columns} />
    </div>
  );
}

export default TableDetalleVenta;
