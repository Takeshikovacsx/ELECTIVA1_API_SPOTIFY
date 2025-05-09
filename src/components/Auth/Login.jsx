import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <button 

        className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}