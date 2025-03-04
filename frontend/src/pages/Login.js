import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
    dispatch(loginSuccess(res.data));
    navigate("/");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mt-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-2 w-full">Login</button>
    </div>
  );
}

export default Login;
