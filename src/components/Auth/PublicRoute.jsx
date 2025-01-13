import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Check if the token is valid (optional)
      navigate('/'); // Redirect authenticated users
    }
  }, [navigate]);

  return <>{children}</>;
};

export default PublicRoute;
