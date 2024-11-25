import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  username: string;
  exp: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        setUser(jwtDecode<User>(savedToken));
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post<{ access_token: string }>(
        "http://127.0.0.1:8000/token",
        credentials,
      );
      const accessToken = response.data.access_token;
      await AsyncStorage.setItem("token", accessToken);
      setToken(accessToken);
      setUser(jwtDecode<User>(accessToken));
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
