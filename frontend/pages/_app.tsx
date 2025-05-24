import React from "react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import SessionManager from "../components/SessionManager";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <SessionManager />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
