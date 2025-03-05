import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// 
function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/products", formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full mt-2" />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full mt-2" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 w-full mt-2" />
      <button onClick={handleAddProduct} className="bg-green-500 text-white p-2 mt-2 w-full">Add Product</button>
    </div>
  );
}

export default AddProduct;
