import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function GoogleLoginBtn({ closeModal }) {
  const { login } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post(
        "/api/auth/google",
        {
          credential: credentialResponse.credential 
        }
      );

      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      closeModal();

    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err.response?.data || err.message);
      alert("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Google Login Failed")}
      useOneTap={false}
    />
  );
}

export default GoogleLoginBtn;
