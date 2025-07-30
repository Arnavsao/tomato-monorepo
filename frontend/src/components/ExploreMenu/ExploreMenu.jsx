import PropTypes from 'prop-types';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {

  return (
    <div className='flex flex-col gap-5' id='explore-menu'>
        <h1 className="text-[#262626] font-medium text-3xl">
            Explore our menu
        </h1>
        <p className=' text-[#808080] lg:max-w-full text-sm lg:text-md lg:w-[80%]'>
            Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one meal at a time.
        </p>
        <div className="flex justify-start items-center gap-8 text-center my-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {menu_list.map((item, index) => (
                <div 
                    key={index} 
                    onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                    className='flex flex-col items-center cursor-pointer'
                >
                    <img 
                        className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-300 ${category === item.menu_name ? "border-4 border-tomato p-0.5" : ""}`} 
                        src={item.menu_image} 
                        alt={item.menu_name} 
                    />
                    <p className="mt-2.5 text-[#747474] text-[max(0.5vw,14px)] cursor-pointer">
                        {item.menu_name}
                    </p>
                </div>
            ))}
        </div>
        <hr className="my-2.5 h-0.5 bg-[#e2e2e2] border-none" />
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
};

export default ExploreMenu;