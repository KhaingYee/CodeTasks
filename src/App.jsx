import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import Router from "./routes";
import ThemeProvider from "./theme";
import NetworkStatus from "./components/NetworkStatus";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="874639094735-41nbf1c1n8uc61fjvr8vlqj2ubje24s3.apps.googleusercontent.com">
        <ThemeProvider>
          <NetworkStatus>
            <Router />
          </NetworkStatus>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
