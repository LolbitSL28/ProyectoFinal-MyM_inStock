import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

function TableDetalleVenta({ detalles }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const columns = [
    { field: "productoNombre", headerName: "Producto", width: 200, flex: 1 },
    { field: "precioVenta", headerName: "Precio", flex: 1 },
    { field: "cantidad", headerName: "Cantidad", width: 100, flex: 1 },
    { field: "subtotal", headerName: "Subtotal", flex: 1 },
  ];

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <AgGridReact rowData={detalles} columnDefs={columns} />
    </div>
  );
}

export default TableDetalleVenta;
