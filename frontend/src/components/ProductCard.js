import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow-lg">
      <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/edit-product/${product._id}`} className="text-blue-500">Edit</Link>
    </div>
  );
}

export default ProductCard;
