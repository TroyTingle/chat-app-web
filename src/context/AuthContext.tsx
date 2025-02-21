import axios from "axios";
import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

// AuthProvider will just check if the user is logged in and update the Zustand store.
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => setUser(null));
  }, [setUser]);

  return <>{children}</>;
};

export default AuthProvider;
