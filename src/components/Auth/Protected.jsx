import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './ApiClient';
import { jwtDecode } from 'jwt-decode';

const Protected = ({ children, authentication }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
  
    const refreshAccessToken = async () => {
      try {
        console.log("refreshAccessToken");
       
        const response = await apiClient.post(`${process.env.BASE_URL}/auth/refresh`, { token: refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        return true;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return false;
      }
    };
  
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('accessToken');
    //   const refreshToken = localStorage.getItem('refreshToken');
  
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
  
          // If the token is expired, try to refresh it
          if (decoded.exp < currentTime) {
            const refreshed = await refreshAccessToken();
            if (!refreshed) {
              navigate('/login');
              return;
            }
          }
  
          // If the token is valid and authentication is not required, redirect to home
          if (!authentication && !token) {
            navigate('/');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          if (authentication) {
            navigate('/login');
          }
        }
      } else if (authentication) {
        // If no token is found, redirect to login page
        navigate('/login');
      }
  
      setLoader(false); // Once auth check is complete, render the children (private route)
    };
  
    useEffect(() => {
      checkAuthStatus();
    }, [navigate, authentication]);
  
    return loader ? <h1>Loading...</h1> : <>{children}</>;
  };
  export default Protected;