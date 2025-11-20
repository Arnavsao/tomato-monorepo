import logo from './logo.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'

export const assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon
}

/**
 * Backend URL Configuration
 * 
 * Uses VITE_BACKEND_URL from environment variables if set,
 * otherwise defaults to localhost for local development.
 * 
 * Note: This is kept for backward compatibility.
 * The main App.jsx component also defines this URL.
 */
export const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:10000'