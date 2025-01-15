import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);

    if (!token || token === "undefined") {
      // Check for null, undefined, or 'undefined' as a string
      if (window.location.pathname === "/login") {
        navigate("/login");
      } else if (window.location.pathname === "/signup") {
        navigate("/signup");
      }
    } else {
      // Optionally, check the validity of the token
      navigate("/"); // Redirect authenticated users
    }
  }, [navigate]);

  return <>{children}</>;
};

export default PublicRoute;
