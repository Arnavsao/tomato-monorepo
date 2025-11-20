/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list,setList]=useState([]);

  const fetchList = useCallback(async()=>{
    const response = await axios.get(`${url}/api/food/list`);
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
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
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
    <div className='max-w-7xl mx-auto'>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Food List</h1>
        
        <div className='overflow-x-auto'>
          {/* Table Header - Desktop */}
          <div className='grid grid-cols-[80px_2fr_1fr_1fr_80px] items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700 hidden md:grid'>
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Action</span>
          </div>
          
          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {list.map((item, index) => {
              return (
                <div 
                  key={index} 
                  className='grid grid-cols-[80px_1fr] md:grid-cols-[80px_2fr_1fr_1fr_80px] items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors'
                >
                  <img 
                    src={`${url}/images/${item.image}`} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
                  />
                  <div className="md:hidden flex flex-col gap-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-sm font-medium text-gray-800">${item.price}</p>
                  </div>
                  <p className="hidden md:block font-medium text-gray-800">{item.name}</p>
                  <p className="hidden md:block text-gray-600">{item.category}</p>
                  <p className="hidden md:block font-medium text-gray-800">${item.price}</p>
                  <button
                    onClick={() => removeFood(item._id)} 
                    className='cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center transition-all justify-self-center'
                    title="Delete item"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          
          {list.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No food items found. Add your first item!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List
