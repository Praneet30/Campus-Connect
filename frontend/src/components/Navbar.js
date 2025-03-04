import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">Campus Trade</Link>
      <div>
        {user ? (
          <>
            <Link to="/add-product" className="mx-2">Sell Product</Link>
            <button onClick={() => dispatch(logout())} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mx-2">Login</Link>
            <Link to="/register" className="mx-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
