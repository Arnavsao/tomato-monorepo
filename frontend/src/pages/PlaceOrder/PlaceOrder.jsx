import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config/api.js';

/**
 * PlaceOrder Component
 * Handles order placement with Razorpay payment integration
 * Captures delivery information and processes payment
 */
const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, setCartItems } = useContext(StoreContext);
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state for delivery information
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Validate form data before proceeding with payment
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

    if (missingFields.length > 0) {
      toast.error(`Please fill in all fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  /**
   * Prepare order items from cart
   * @returns {Array} - Array of order items
   */
  const prepareOrderItems = () => {
    const items = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const foodItem = food_list.find(item => item._id === itemId);
        if (foodItem) {
          items.push({
            itemId: foodItem._id,
            name: foodItem.name,
            price: foodItem.price,
            quantity: cartItems[itemId]
          });
        }
      }
    }
    return items;
  };

  /**
   * Handle Razorpay payment initiation and processing
   * @param {Event} e - Form submit event
   */
  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    console.log('📝 Form submitted - handleRazorpayPayment called');

    // Check if user is signed in
    if (!isSignedIn || !user) {
      console.log('❌ User not signed in');
      toast.error('Please sign in to place an order');
      navigate('/');
      return;
    }

    console.log('✅ User is signed in:', user.id);

    // Validate form
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    console.log('✅ Form validation passed');

    // Check if cart is empty
    const amount = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;
    if (amount === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('💳 Initiating Razorpay payment for amount:', amount);
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      // Create Razorpay order on backend
      // Generate receipt ID - must be max 40 chars, alphanumeric + underscore/hyphen only
      const receiptId = `rcpt_${Date.now()}_${user.id.substring(0, 10)}`.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 40);
      
      const { data } = await axios.post(
        `${API_BASE_URL}/api/order/razorpay`,
        {
          amount,
          currency: 'INR',
          receipt: receiptId,
        },
        {
          headers: { authorization: `Bearer ${token}` }
        }
      );

      console.log('✅ Razorpay order created:', data.orderId);

      // Prepare order data
      const orderItems = prepareOrderItems();
      const orderData = {
        userId: user.id,
        items: orderItems,
        amount: amount,
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone
        }
      };

      // Get Razorpay key from environment
      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      
      if (!razorpayKeyId) {
        console.error('❌ VITE_RAZORPAY_KEY_ID not configured');
        throw new Error('Razorpay key not configured. Please set VITE_RAZORPAY_KEY_ID in your environment variables.');
      }

      console.log('🔑 Razorpay Key ID configured:', razorpayKeyId.substring(0, 10) + '...');

      // Configure Razorpay checkout options
      const options = {
        key: razorpayKeyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Tomato Food Order',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async function (response) {
          console.log('✅ Payment successful:', response);
          setIsProcessing(true);

          try {
            // Verify payment and place order
            const verifyResponse = await axios.post(
              `${API_BASE_URL}/api/order/razorpay/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderData
              },
              {
                headers: { authorization: `Bearer ${token}` }
              }
            );

            if (verifyResponse.data.success) {
              console.log('✅ Order placed successfully:', verifyResponse.data.orderId);
              
              // Clear cart state (backend already cleared it)
              setCartItems({});

              toast.success('Payment successful! Your order has been placed.');
              navigate('/');
            } else {
              throw new Error('Order placement failed');
            }
          } catch (error) {
            console.error('❌ Error verifying payment:', error);
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#F37254' },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed');
            setIsProcessing(false);
          }
        }
      };

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
      }

      // Validate Razorpay key before initializing
      if (!options.key || options.key.trim() === '') {
        throw new Error('Razorpay key is missing. Please configure VITE_RAZORPAY_KEY_ID in your environment variables.');
      }

      console.log('🚀 Opening Razorpay checkout...');
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('❌ Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description || 'Unknown error'}`);
        setIsProcessing(false);
      });

      rzp.open();
    } catch (err) {
      console.error('❌ Error initiating payment:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      // Extract detailed error message
      let errorMessage = 'Failed to initiate payment';
      if (err.response?.data) {
        const errorData = err.response.data;
        errorMessage = errorData.error || errorData.details || errorData.message || errorMessage;
        
        // Show Razorpay-specific errors if available
        if (errorData.razorpayError) {
          console.error('Razorpay error details:', errorData.razorpayError);
          errorMessage = errorData.razorpayError.description || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
      setIsProcessing(false);
    }
  };

  // Calculate totals
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  // Debug logging
  console.log('💰 Cart totals:', { subtotal, deliveryFee, total, cartItemsCount: Object.keys(cartItems).length });

  return (
    <form 
      onSubmit={handleRazorpayPayment}
      className="flex items-start flex-col md:flex-row justify-between gap-[50px] mt-10 md:mt-32 px-3 mb-20 md:mb-32 lg:px-20"
    >
      <div className="w-full max-w-[max(30%,500px)]">
        <p className="text-3xl font-semibold mb-[50px]">Delivery Information</p>
        <div className="flex gap-2.5">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
          required
          className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
        />
        <div className="flex gap-2.5">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          />
        </div>
        <div className="flex gap-2.5">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato"
        />
      </div>
      <div className="w-full max-w-[max(40%,500px)]">
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p>Delivery fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p><b>Total</b></p>
              <p><b>₹{total}</b></p>
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              console.log('🔘 Button clicked');
              console.log('Button state:', { isProcessing, total, disabled: isProcessing || total === 0 });
              console.log('User state:', { isSignedIn, userId: user?.id });
              console.log('Cart state:', { cartItems, cartItemsCount: Object.keys(cartItems).length, food_listLength: food_list.length });
              
              // If button is disabled, prevent default and show message
              if (isProcessing || total === 0) {
                e.preventDefault();
                if (total === 0) {
                  toast.error('Your cart is empty. Please add items to cart first.');
                }
                return;
              }
            }}
            disabled={isProcessing || total === 0}
            className={`mt-8 border-none text-white bg-[#ff6347] w-[max(15vw,200px)] py-3 rounded cursor-pointer hover:bg-[rgb(228,60,30)] disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
              total === 0 ? 'bg-gray-400 cursor-not-allowed' : ''
            }`}
            aria-label={total === 0 ? 'Cart is empty' : 'Pay with Razorpay'}
          >
            {isProcessing ? 'Processing...' : total === 0 ? 'Cart is Empty' : 'Pay with Razorpay'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;