import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarProveedores } from "../../redux/actions/proveedoresActions";
import { useNavigate } from "react-router-dom";
import TableProveedores from "./TableProveedores";
import "./Proveedores.css";

function GetProveedores() {
  const dispatch = useDispatch();
  const { proveedores } = useSelector((store) => store.proveedores);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listarProveedores());
  }, [dispatch]);

  return (
    <div className="proveedores-container">
      <h1>Proveedores</h1>
      <br/>
      <div className="action-bar">
        <button className="btn-action btn-refresh" onClick={() => dispatch(listarProveedores())}>Actualizar</button>
        <button className="btn-action btn-add" onClick={() => navigate("/proveedores/add")}>
          Agregar Proveedor
        </button>
      </div>
      <TableProveedores proveedores={proveedores} />
    </div>
  );
}

export default GetProveedores;
