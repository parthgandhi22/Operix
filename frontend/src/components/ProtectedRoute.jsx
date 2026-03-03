import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/me");
        if (res.data.role === allowedRole) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [allowedRole]);

  if (authorized === null) return <div>Loading...</div>;

  return authorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;