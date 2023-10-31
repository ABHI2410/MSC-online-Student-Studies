import React, { createContext, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (access_token) => {
    try {
        // Verify the token's signature and get the payload
        const decodedToken = jwt.verify(access_token, 'iwcqrugcheurhuicckefhaskef'); // Replace 'your-secret-key' with your actual secret key
    
        // Check if the token has expired
        if (decodedToken.exp < Date.now() / 1000) {
          // Token has expired
          return { valid: false, error: 'Token has expired' };
        }
    
        // Token is valid
        return { valid: true, payload: decodedToken };
      } catch (error) {
        // Token is invalid or has been tampered with
        return { valid: false, error: 'Invalid token' };
      }
    
    setUser({ token: access_token });
  };

  const logout = () => {
    // Remove tokens from storage and clear user state
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
