import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="mt-10 md:mt-32 px-3 mb-20 md:mb-10 lg:mb-20">
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)] p-2.5 border-b border-[#e2e2e2]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] p-2.5 border-b border-[#e2e2e2]">
                <img src={item.image.startsWith('http') ? item.image : url + "/images/" + item.image} alt="" className="w-[50px] h-auto" />
                <p className="m-0">{item.name}</p>
                <p className="m-0">{item.price}</p>
                <p className="m-0">{cartItems[item._id]}</p>
                <p className="m-0">₹{item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className='cursor-pointer text-red-500 font-bold text-lg text-center'>x</p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="mt-10 flex flex-col md:flex-row justify-between gap-[max(5vw,20px)]">
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr className="my-2.5" />
            <div className="flex justify-between items-center">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr className="my-2.5" />
            <div className="flex justify-between items-center">
              <p><b>Total</b></p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/order')}
            className="border-none text-white bg-[#ff6347] w-[max(15vw,200px)] py-3 rounded cursor-pointer hover:bg-[rgb(228,60,30)]"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex-1 w-full md:w-[80%]">
          <div>
            <p className="text-[#555] mt-5">If you have a promocode, enter it here</p>
            <div className="mt-2.5 flex justify-between items-center rounded">
              <input
                type="text"
                placeholder='promocode'
                className="bg-transparent border-1 outline-none pl-2.5 bg-[rgb(239,239,239)] h-10 rounded w-[70%] mr-5"
              />
              <button className="w-[max(10vw,150px)] py-3 px-1.5 bg-[rgb(54,54,54)] border-none text-white rounded hover:bg-black">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;