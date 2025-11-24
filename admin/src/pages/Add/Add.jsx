/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';

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
            // Ensure URL doesn't have trailing slash to prevent double slashes
            const apiUrl = `${url.replace(/\/+$/, '')}/api/food/add`;
            console.log('Making POST request to:', apiUrl);
            const response = await axios.post(apiUrl, formData, {
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
        <div className="add-container">
            <div className="add-card">
                <h1 className="add-title">Add New Product</h1>
                
                <form className="add-form" onSubmit={onSubmitHandler}>
                    {/* Upload Image Section */}
                    <div className="add-upload-section">
                        <p className="add-upload-label-text">Upload Image</p>
                        <label htmlFor="image" className="add-upload-label">
                            <img 
                                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                alt="Upload Area"
                                className="add-upload-image"
                            />
                            {!image && (
                                <span className="add-upload-text">Click to upload</span>
                            )}
                        </label>
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type="file" 
                            id="image" 
                            style={{ display: 'none' }}
                            accept="image/*"
                            required 
                        />
                    </div>

                    {/* Product Name */}
                    <div className="add-form-group">
                        <label className="add-form-label">Product name</label>
                        <input
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            name="name"
                            placeholder="Type here"
                            className="add-form-input"
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className="add-form-group">
                        <label className="add-form-label">Product description</label>
                        <textarea
                            onChange={onChangeHandler}
                            value={data.description}
                            name="description"
                            rows="6"
                            placeholder="Write content here"
                            className="add-form-textarea"
                        ></textarea>
                    </div>

                    {/* Category and Price */}
                    <div className="add-form-grid">
                        <div className="add-form-group">
                            <label className="add-form-label">Product category</label>
                            <select 
                                onChange={onChangeHandler} 
                                name="category" 
                                value={data.category}
                                className="add-form-select"
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
                        <div className="add-form-group">
                            <label className="add-form-label">Product price</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name="price"
                                placeholder="$20"
                                className="add-form-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="add-submit-btn"
                    >
                        Add Product
                    </button>
                </form>

                {/* Success Message */}
                {success && (
                    <div className="add-success-message">
                        <p className="add-success-text">✓ Product added successfully!</p>
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