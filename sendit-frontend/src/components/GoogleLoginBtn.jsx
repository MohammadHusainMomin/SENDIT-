import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function GoogleLoginBtn({ closeModal }) {
  const { login } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/google",
      { token: credentialResponse.credential }
    );

    localStorage.setItem("token", res.data.token);
    login(res.data.user);
    closeModal();
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
}

export default GoogleLoginBtn;
