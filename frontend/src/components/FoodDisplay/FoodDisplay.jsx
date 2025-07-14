import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Filter food_list based on category if needed
    const filteredFoodList = category === "All" 
        ? food_list 
        : food_list.filter(item => item.category === category);

    // Sort filteredFoodList by price (ascending)
    const sortedFoodList = filteredFoodList.sort((a, b) => a.price - b.price);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {sortedFoodList.map((item) => (
                    <FoodItem 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        description={item.description} 
                        price={item.price} 
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;