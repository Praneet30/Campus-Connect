import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setFormData({
                title: data.title,
                description: data.description,
                price: data.price
            });
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editProduct({ id, updatedData: formData }));
        navigate("/");  // Redirect to home after editing
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-4"
                    required
                />

                <label className="block mb-2">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-4"
                    required
                ></textarea>

                <label className="block mb-2">Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-4"
                    required
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
