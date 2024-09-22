import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './styles/App.scss';
import router from './routing/index.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;