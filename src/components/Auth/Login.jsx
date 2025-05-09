import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaSpotify, FaMusic } from 'react-icons/fa';
import { redirectToSpotifyOAuth } from '../../utils/spotifyAuth';
import { motion } from 'framer-motion';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const LoginButton = ({ icon, text, onClick, bgColor, hoverColor, textColor = 'text-gray-800' }) => (
  <motion.button
    onClick={onClick}
    className={`w-full flex items-center justify-center py-4 px-6 ${bgColor} ${hoverColor} ${textColor} rounded-xl transition-all duration-300 shadow-lg font-medium text-base relative overflow-hidden group`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    variants={itemVariants}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    <span className="flex items-center justify-center w-6 h-6 mr-3 relative z-10">{icon}</span>
    <span className="font-semibold relative z-10">{text}</span>
  </motion.button>
);

export default function Login() {
  const { loginWithGoogle, loginWithFacebook } = useAuth();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    
    // Efecto de notas musicales flotantes
    const notes = ['♪', '♫', '♬', '♩'];
    const container = document.querySelector('.login-container');
    
    const createNote = () => {
      const note = document.createElement('div');
      note.className = 'absolute text-green-400 opacity-20 text-2xl pointer-events-none';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = `${Math.random() * 100}%`;
      note.style.top = `${Math.random() * 100}%`;
      note.style.animation = `floatNote ${Math.random() * 10 + 5}s linear infinite`;
      note.style.animationDelay = `${Math.random() * 2}s`;
      container?.appendChild(note);
    };
    
    const interval = setInterval(createNote, 800);
    return () => clearInterval(interval);
  }, []);

  const handleGoogle = () => {
    loginWithGoogle()
      .then(() => redirectToSpotifyOAuth())
      .catch(err => console.error('Error:', err));
  };

  const handleFacebook = () => {
    loginWithFacebook()
      .then(() => redirectToSpotifyOAuth())
      .catch(err => console.error('Error:', err));
  };

  const handleSpotifyLogin = () => {
    redirectToSpotifyOAuth();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden login-container">
      {/* Efecto de partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-500 opacity-5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 10 + 5}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/90 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-gray-700/40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo animado */}
        <motion.div 
          className="mb-10 text-center"
          variants={itemVariants}
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20"
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaSpotify className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-300 to-teal-300 mb-2"
            whileHover={{ scale: 1.02 }}
          >
            SpotifyConnect
          </motion.h1>
          <motion.p className="text-gray-400 text-lg">
            Inicia sesión para comenzar
          </motion.p>
        </motion.div>

        {/* Botones de login */}
        <motion.div className="space-y-4" variants={containerVariants}>
          <LoginButton
            icon={<FcGoogle className="w-6 h-6" />}
            text="Continuar con Google"
            onClick={handleGoogle}
            bgColor="bg-white"
            hoverColor="hover:bg-gray-50"
          />


          <LoginButton
            icon={<FaSpotify className="w-5 h-5 text-white" />}
            text="Continuar con Spotify"
            onClick={handleSpotifyLogin}
            bgColor="bg-green-600"
            hoverColor="hover:bg-green-700"
            textColor="text-white"
          />
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-8 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>Al continuar, aceptas nuestros Términos y Condiciones</p>
        </motion.div>
      </motion.div>

      {/* Añade esto a tu CSS */}
      <style jsx global>{`
        @keyframes floatNote {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}