import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaSpotify } from 'react-icons/fa';
import { redirectToSpotifyOAuth } from '../../utils/spotifyAuth';

const LoginButton = ({ icon, text, onClick, bgColor, hoverColor, textColor = 'text-gray-800' }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center py-4 px-6 ${bgColor} ${hoverColor} ${textColor} rounded-xl transition-all duration-300 transform hover:scale-102 hover:shadow-xl shadow-lg font-medium text-base`}
  >
    <span className="flex items-center justify-center w-6 h-6 mr-3">{icon}</span>
    <span className="font-semibold">{text}</span>
  </button>
);

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleGoogle = () => {
    loginWithGoogle()
      .then(() => redirectToSpotifyOAuth())
      .catch(err => console.error('Error:', err));
  };

  const handleSpotifyLogin = () => {
    redirectToSpotifyOAuth();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className={`relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-gray-700 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="mb-10 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <FaSpotify className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-400 to-teal-300">SpotifyConnect</h1>
        </div>

        <div className="space-y-4">
          <LoginButton
            icon={<FcGoogle className="w-6 h-6" />}
            text="Continuar con Google"
            onClick={handleGoogle}
            bgColor="bg-white"
            hoverColor="hover:bg-gray-100"
          />

          <LoginButton
            icon={<FaSpotify className="w-5 h-5 text-white" />}
            text="Continuar con Spotify"
            onClick={handleSpotifyLogin}
            bgColor="bg-green-600"
            hoverColor="hover:bg-green-700"
            textColor="text-white"
          />
        </div>
      </div>
    </div>
  );
}