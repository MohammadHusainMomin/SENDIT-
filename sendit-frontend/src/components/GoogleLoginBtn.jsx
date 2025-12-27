import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function GoogleLoginBtn({ closeModal }) {
  const { login } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    const res = await api.post(
      "/api/auth/google",
      { token: credentialResponse.credential }
    );

    localStorage.setItem("token", res.data.token);
    login(res.data.user);
    closeModal();
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
}

export default GoogleLoginBtn;
