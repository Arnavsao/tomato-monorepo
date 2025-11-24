/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({url}) => {
  
  const [list,setList]=useState([]);

  const fetchList = useCallback(async()=>{
    // Normalize URL to prevent double slashes
    const apiUrl = `${url.replace(/\/+$/, '')}/api/food/list`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    if (response.data.success){
      setList(response.data.data)
    }
    else
    {
      toast.error("Error")
    }   
  }, [url])


  //to remove the food item
  const removeFood = async(foodId)=>{
    // Normalize URL to prevent double slashes
    const apiUrl = `${url.replace(/\/+$/, '')}/api/food/remove`;
    const response = await axios.post(apiUrl,{id:foodId});
    await fetchList();
    if (response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }



  useEffect(()=>{
      fetchList();
    },[fetchList])  
  return (
    <div className='list-container'>
      <div className="list-card">
        <h1 className="list-title">All Food List</h1>
        
        <div className='list-table-wrapper'>
          {/* Table Header - Desktop */}
          <div className='list-table-header'>
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span style={{ textAlign: 'center' }}>Action</span>
          </div>
          
          {/* Table Rows */}
          <div className="list-table-rows">
            {list.map((item, index) => {
              return (
                <div 
                  key={index} 
                  className='list-table-row'
                >
                  <img 
                    src={`${url.replace(/\/+$/, '')}/images/${item.image}`} 
                    alt={item.name} 
                    className="list-item-image" 
                  />
                  <div className="list-item-info-mobile">
                    <p className="list-item-name-mobile">{item.name}</p>
                    <p className="list-item-category-mobile">{item.category}</p>
                    <p className="list-item-price-mobile">${item.price}</p>
                  </div>
                  <p className="list-item-name">{item.name}</p>
                  <p className="list-item-category">{item.category}</p>
                  <p className="list-item-price">${item.price}</p>
                  <button
                    onClick={() => removeFood(item._id)} 
                    className='list-delete-btn'
                    title="Delete item"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          
          {list.length === 0 && (
            <div className="list-empty">
              <p>No food items found. Add your first item!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List
