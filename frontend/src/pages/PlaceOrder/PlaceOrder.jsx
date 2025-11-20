import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    const amount = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;
    if (amount === 0) return alert('Cart is empty!');
    try {
      // Create order on backend
      const { data } = await axios.post('/api/order/razorpay', {
        amount,
        currency: 'INR',
        receipt: 'order_rcptid_11',
      });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx', // fallback for test
        amount: data.amount,
        currency: data.currency,
        name: 'Tomato Food Order',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          navigate('/');
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: { color: '#F37254' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Failed to initiate payment: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form className="flex items-start flex-col md:flex-row justify-between gap-[50px] mt-10 md:mt-32  px-3 mb-20 md:mb-32 lg:px-20 ">
      <div className="w-full max-w-[max(30%,500px)]">
        <p className="text-3xl font-semibold mb-[50px]">Delivery Information</p>
        <div className="flex gap-2.5">
          <input type="text" placeholder="First name" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
          <input type="text" placeholder="Last name" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
        </div>
        <input type="email" placeholder="Email address" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
        <input type="text" placeholder="Street" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
        <div className="flex gap-2.5">
          <input type="text" placeholder="City" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
          <input type="text" placeholder="State" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
        </div>
        <div className="flex gap-2.5">
          <input type="text" placeholder="Zip code" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
          <input type="text" placeholder="Country" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
        </div>
        <input type="text" placeholder="Phone" className="mb-4 w-full p-2.5 border border-[#c5c5c5] rounded outline-tomato" />
      </div>
      <div className="w-full max-w-[max(40%,500px)]">
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p><b>Total</b></p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleRazorpayPayment}
            className="mt-8 border-none text-white bg-[#ff6347] w-[max(15vw,200px)] py-3 rounded cursor-pointer hover:bg-[rgb(228,60,30)]"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;