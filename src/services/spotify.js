import axios from 'axios';

const ACCOUNTS_API = 'https://accounts.spotify.com';
const API_BASE = 'https://api.spotify.com/v1';

export async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  });

  const response = await axios.post(`${ACCOUNTS_API}/api/token`, params);
  return response.data;
}

export async function fetchUserProfile(token) {
  const response = await axios.get(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}