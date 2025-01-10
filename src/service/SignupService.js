import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/auth";

export const signupService = (credentials) => axios.post(`${REST_API_BASE_URL}/signup`, credentials);