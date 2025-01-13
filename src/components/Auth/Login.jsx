/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import apiClient from './ApiClient';


const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async ({ email, password }) => {
    try {
      const response = await apiClient.post("http://localhost:8080/auth/login", { email, password });
      const accessToken = await response.data.data.accessToken; // Correct destructuring
      console.log("accessToken",accessToken);
      localStorage.setItem('accessToken', accessToken);
      if(accessToken){
      navigate('/'); // Redirect to the home page after successful login
      }
    } catch (error) {
      console.error(error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -left-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
      <div className="absolute -right-4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl relative"
      >
        <div className="backdrop-blur-xl bg-white/[0.02] rounded-3xl shadow-2xl border border-white/[0.05] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-5/12 p-8 lg:p-12 bg-gradient-to-br from-black/50 to-transparent flex flex-col justify-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                  CAREERLY
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">Welcome Back</h2>
                <p className="text-gray-400 text-lg mb-6">
                  Start your professional journey with us today.
                </p>
                <p className="text-gray-300">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </div>

            <div className="lg:w-7/12 p-8 lg:p-12 bg-black/20">
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center mb-6"
                >
                  {error}
                </motion.p>
              )}

              <form onSubmit={handleSubmit(login)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Email</label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:bg-white/[0.05] transition-all duration-200"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Password</label>
                  <input
                    {...register("password", { required: true })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:bg-white/[0.05] transition-all duration-200"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-600/20"
                >
                  Login
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
