/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { assets } from '../../assets/assets'; // Ensure this path is correct
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='w-full mx-auto rounded-[15px] shadow-[0_0_10px_#00000015] transition-all duration-300 animate-fadeIn'>
            <div className="relative">
                <img className='w-full rounded-t-[15px]' src={url+"/images/"+image} alt={name} />

                {!cartItems[id] ? (
                    <img 
                        className='w-[35px] absolute bottom-4 right-4 cursor-pointer rounded-full' 
                        onClick={() => addToCart(id)} 
                        src={assets.add_icon_white} 
                        alt="Add to cart" 
                    />
                ) : (
                    <div className='absolute bottom-4 right-4 flex items-center gap-2.5 p-1.5 rounded-[50px] bg-white'>
                        <img 
                            onClick={() => removeFromCart(id)} 
                            src={assets.remove_icon_red} 
                            alt="Remove from cart" 
                            className='w-[30px]'
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            onClick={() => addToCart(id)} 
                            src={assets.add_icon_green} 
                            alt="Add more" 
                            className='w-[30px]'
                        />
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex justify-between items-center mb-2.5">
                    <p className="text-xl font-medium">{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" className='w-[70px]' />
                </div>
                <p className="text-[#676767] text-xs">{description}</p>
                <p className='text-tomato text-[22px] font-medium my-2.5'>${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;