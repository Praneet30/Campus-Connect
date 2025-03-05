import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
 
  const fetchUserDetails = async () => {
    try {
      console.log(product.userId);
      const response = await axios.get(`http://localhost:5000/api/users/${product.userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleOpenModal = () => {
    fetchUserDetails();
    setIsModalOpen(true);
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p>₹{product.price}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleOpenModal}
      >
        Details
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Uploaded By</h2>
            {user ? (
              <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
