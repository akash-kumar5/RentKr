import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../store/auth";

const GoogleLgn = () => {
  const navigate = useNavigate();
  const { storeTokenInLs, setIsAuthenticated } = useAuth();

  const handleSuccess = (credentialResponse) => {
    storeTokenInLs(credentialResponse.credential);
    setIsAuthenticated(true);
    alert("Google Login Successful")
    navigate("/");
  };

  const handleError = (error) => {
    console.error("Google Login Failed:", error);
    // Handle error display or logging as needed
  };

  return (
    <div className="bg-dark text-center">
        <div className="btn btn-outline-dark">
          <GoogleOAuthProvider clientId="416637324816-9lor792ks89srtgsd17ffphr27mpse6p.apps.googleusercontent.com">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </GoogleOAuthProvider>
        </div>
    </div>
  );
};

export default GoogleLgn;
