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
    if (!code) {
      return navigate('/login', { replace: true });
    }

    (async () => {
      try {
        const { access_token } = await exchangeCodeForToken(code);
        setToken(access_token);
        navigate('/profile', { replace: true });
      } catch (err) {
        console.error('Error exchanging code for token:', err);
        navigate('/login', { replace: true });
      }
    })();
  }, [search]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Autorizando Spotify...
    </div>
  );
}
