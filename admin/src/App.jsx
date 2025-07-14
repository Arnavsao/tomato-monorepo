// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add.jsx';
import List from './pages/List/Lisgitt.jsx';
import Orders from './pages/Orders/Orders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  
  const url = "https://tomato-backend-weqp.onrender.com"

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="*" element={
              <div style={{ textAlign: "center", margin: "10px", color: "tomato" }}>
                <h2>Page Not Found</h2>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;