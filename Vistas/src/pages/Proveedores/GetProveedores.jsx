import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarProveedores } from "../../redux/actions/proveedoresActions";
import { useNavigate } from "react-router-dom";
import TableProveedores from "./TableProveedores";

function GetProveedores() {
  const dispatch = useDispatch();
  const { proveedores } = useSelector((store) => store.proveedores);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listarProveedores());
  }, [dispatch]);

  return (
    <>
      <h1>Proveedores</h1>
      <button onClick={() => dispatch(listarProveedores())}>Actualizar</button>
      <button onClick={() => navigate("/proveedores/add")}>
        Agregar Proveedor
      </button>
      <TableProveedores proveedores={proveedores} />
    </>
  );
}

export default GetProveedores;
