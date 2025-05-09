import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
        return unsubscribe;
    }, []);

    const loginWithGoogle = () => {
        return signInWithPopup(auth, new GoogleAuthProvider());
    };

    const logout = () => {
        return auth.signOut();
    };

    useEffect(() => {
        if (token) {
            spotifyApi.setAccessToken(token);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ 
      user, 
      token,
      setToken,
      spotifyApi,
      loginWithGoogle, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);