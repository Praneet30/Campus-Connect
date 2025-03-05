import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Added phone number state
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/api/users/register", { 
      name, 
      email, 
      phone,  // Sending phone number in the request
      password 
    });
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input 
        type="text" 
        placeholder="Name" 
        onChange={(e) => setName(e.target.value)} 
        className="border p-2 w-full" 
      />
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
        className="border p-2 w-full mt-2" 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        onChange={(e) => setPhone(e.target.value)} 
        className="border p-2 w-full mt-2" 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        className="border p-2 w-full mt-2" 
      />
      <button 
        onClick={handleRegister} 
        className="bg-green-500 text-white p-2 mt-2 w-full"
      >
        Register
      </button>
    </div>
  );
}

export default Register;
