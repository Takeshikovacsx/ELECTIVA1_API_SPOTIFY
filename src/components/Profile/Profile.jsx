import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchUserProfile } from '../../services/spotify';

export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetchUserProfile(token)
      .then(data => setProfile(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) return <div>Necesitas conectar con Spotify</div>;
  if (loading) return <div>Cargando...</div>;
  if (!profile) return <div>Error al cargar el perfil</div>;

  return (
    <div>
      <h1>{profile.display_name}</h1>
      <p>Email: {profile.email}</p>
      <p>Seguidores: {profile.followers.total}</p>
    </div>
  );
}