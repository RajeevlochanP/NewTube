import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { authActions, userActions } from "../store";
import { checkAuthCall } from "../apiCalls/Authentication";
import { fetchUserProfile } from "../apiCalls/Profile";

function CheckAuthComp() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await checkAuthCall();
        
        if (response.success && response.user) {
          dispatch(authActions.login());
          dispatch(userActions.setUser({
            userId: response.user._id,
            name: response.user.name,
            email: response.user.email
          }));
          // Fetch full profile details (avatar, joinDate, etc.)
          try {
            const profileData = await fetchUserProfile();
            if (profileData.success && profileData.userDetails) {
              dispatch(userActions.setProfile({
                username: profileData.userDetails.name,
                email: profileData.userDetails.email,
                joinDate: profileData.userDetails.joinDate,
                avatar: profileData.userDetails.avatar
              }));
            }
          } catch (profileErr) {
            console.warn("Could not fetch full profile:", profileErr);
          }
        } else {
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

  return <Outlet />
}

export default CheckAuthComp;
