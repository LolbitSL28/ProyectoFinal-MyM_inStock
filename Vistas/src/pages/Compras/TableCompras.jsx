import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

function TableCompras({ compras }) {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);
  const navigate = useNavigate();

  function verDetalle(id) {
    navigate(`/compras/${id}`);
  }

  const detalleButton = (props) => {
    return (
      <button className="grid-btn grid-btn-detalle" onClick={() => verDetalle(props.data.id)}>Ver Detalle</button>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "fecha",
      headerName: "Fecha",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    { field: "proveedorNombre", headerName: "Proveedor", width: 150 },
    { field: "usuarioNombre", headerName: "Usuario", width: 150 },
    { field: "subtotal", headerName: "Subtotal" },
    { field: "iva", headerName: "IVA" },
    { field: "total", headerName: "Total" },
    { field: "detalle", headerName: "Detalle", cellRenderer: detalleButton },
  ];

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <AgGridReact rowData={compras} columnDefs={columns} />
    </div>
  );
}

export default TableCompras;
