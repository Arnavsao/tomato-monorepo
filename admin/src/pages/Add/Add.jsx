/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad', // Default category set to "Salad"
    });
    const [success, setSuccess] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                setSuccess(true);
                // Clear form data except for the category
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: data.category, // Retain the previous category
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                setSuccess(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            setSuccess(false);
            const message = error?.response?.data?.message || 'Error submitting form';
            console.error('Error submitting form:', error);
            toast.error(message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
                
                <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
                    {/* Upload Image Section */}
                    <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition-colors">
                        <p className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Upload Image</p>
                        <label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-2">
                            <img 
                                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                alt="Upload Area"
                                className="w-32 h-32 object-contain"
                            />
                            {!image && (
                                <span className="text-sm text-gray-500">Click to upload</span>
                            )}
                        </label>
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type="file" 
                            id="image" 
                            className="hidden" 
                            accept="image/*"
                            required 
                        />
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Product name</label>
                        <input
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            name="name"
                            placeholder="Type here"
                            className="px-4 py-3 text-base border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-tomato focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Product description</label>
                        <textarea
                            onChange={onChangeHandler}
                            value={data.description}
                            name="description"
                            rows="6"
                            placeholder="Write content here"
                            className="px-4 py-3 text-base border border-gray-300 rounded-lg w-full resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-tomato focus:border-transparent transition-all"
                        ></textarea>
                    </div>

                    {/* Category and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Product category</label>
                            <select 
                                onChange={onChangeHandler} 
                                name="category" 
                                value={data.category}
                                className="px-4 py-3 text-base border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-tomato focus:border-transparent transition-all bg-white"
                            >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Product price</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name="price"
                                placeholder="$20"
                                className="px-4 py-3 text-base border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-tomato focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 text-base rounded-lg cursor-pointer transition-colors shadow-sm hover:shadow-md mt-2"
                    >
                        Add Product
                    </button>
                </form>

                {/* Success Message */}
                {success && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                        <p className="font-medium">✓ Product added successfully!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Add PropTypes validation
Add.propTypes = {
    url: PropTypes.string.isRequired, // Validate that 'url' is a required string
};

export default Add;