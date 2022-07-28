import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios, { AxiosRequestConfig } from "axios";

export type AuthContextType = {
  isauth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  isauth: false,
  setAuth: () => {},
});

axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = sessionStorage.getItem("access_token");
    if (!config.headers) {
      config.headers = {};
    }
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const [isauth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      // set props data to session storage or local storage
      setAuth(sessionStorage.getItem("access_token") != null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isauth, setAuth }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}

export default MyApp;
