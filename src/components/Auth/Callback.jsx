import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '../../services/spotify';
import { useAuth } from '../../context/AuthContext';

export default function Callback() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(search).get('code');
    if (!code) return navigate('/login');

    (async () => {
      try {
        const { access_token } = await exchangeCodeForToken(code);
        setToken(access_token);
        navigate('/profile');
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      }
    })();
  }, [search]);

  return <div className="min-h-screen flex items-center justify-center">Procesando...</div>;
}