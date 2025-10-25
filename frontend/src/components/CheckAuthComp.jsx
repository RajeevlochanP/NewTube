import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import { authActions } from "../store";

function CheckAuthComp() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        dispatch(authActions.logout());
        setChecked(true);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded && decoded.exp && decoded.exp > currentTime) {
          dispatch(authActions.login());
        } else {
          localStorage.removeItem("token");
          dispatch(authActions.logout());
        }
      } catch (err) {
        console.warn("Invalid JWT:", err);
        localStorage.removeItem("token");
        dispatch(authActions.logout());
      } finally {
        setChecked(true);
      }
    })();
  }, [dispatch]);

  if (!checked) return null;

  return <Outlet />
}

export default CheckAuthComp;
