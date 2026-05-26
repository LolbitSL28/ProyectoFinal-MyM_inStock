import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/slices/authSlice";

function CloseSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = useSelector((store) => store.auth.token);

  async function LogOut() {
    dispatch(setToken(null));
  }

  useEffect(() => {
    LogOut();
  }, []);
  return <></>;
}
export default CloseSession;
