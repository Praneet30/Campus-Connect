import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({ _id: "", title: "", price: "" });

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = () => {
    axios.get(`http://localhost:5000/api/products/user/${user._id}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, {
        title: editProduct.title,
        price: editProduct.price,
      });
      setIsModalOpen(false);
      fetchProducts(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <img 
                src={`http://localhost:5000/uploads/${product.image}`} 
                alt={product.title} 
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-bold mt-2">{product.title}</h3>
              <p>Rs{product.price}</p>
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => handleEditClick(product)} 
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <h3 className="text-xl font-bold mb-1">Title</h3>
            <input
              type="text"
              name="title"
              value={editProduct.title}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
              placeholder="Product Title"
            />
            <h3 className="text-xl font-bold mb-1">Price</h3>
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
              placeholder="Product Price"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleEditSubmit} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProducts;
