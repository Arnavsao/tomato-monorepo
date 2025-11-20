/* eslint-disable react/prop-types */
import { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='mt-8'>
            <h2 className="text-[clamp(2vw,24px)] font-semibold">
                Top dishes near you
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-8 gap-8 row-gap-12">
                {food_list.map((item, index) => {
                    if (category === "All" || item.category === category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;