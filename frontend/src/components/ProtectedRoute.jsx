import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authActions, userActions } from "../store";
import { checkAuthCall } from "../apiCalls/Authentication";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Call /auth/me to check if user is authenticated
        const response = await checkAuthCall();
        
        if (response.success && response.user) {
          // User is authenticated - set auth state and user data
          dispatch(authActions.login());
          dispatch(userActions.setUser({
            name: response.user.name,
            email: response.user.email
          }));
        } else {
          // User is not authenticated
          dispatch(authActions.logout());
          dispatch(userActions.clearProfile());
        }
      } catch (err) {
        console.warn("Auth check failed:", err);
        dispatch(authActions.logout());
        dispatch(userActions.clearProfile());
      } finally {
        setChecked(true);
      }
    })();
  }, [dispatch]);

  if (!checked) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
