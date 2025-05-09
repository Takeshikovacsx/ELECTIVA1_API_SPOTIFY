
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <button 
        onClick={handleLogin}
        className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}