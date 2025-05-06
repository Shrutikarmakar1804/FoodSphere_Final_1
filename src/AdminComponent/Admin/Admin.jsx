import React, { useEffect, useState } from 'react';
import { AdminSideBar } from './AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import { RestaurantDashboard } from '../Dashboard/Dashboard';
import { Orders } from '../Orders/Orders';
import { Menu } from '../Menu/Menu';
import FoodCategory from '../FoodCategory/FoodCategory';
import Ingredients from '../Ingredients/Ingredients';
import { Events } from '../Events/Events';
import RestaurantDetails from './RestaurantDetails';
import CreateMenuForm from '../Menu/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantCategory } from '../../component/State/Restaurant/Action';
import { fetchRestaurantsOrder } from '../../component/State/RestaurantOrder/Action';

export const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(state => state.restaurant);
  const restaurantId = restaurant?.usersRestaurant?.id;

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (restaurantId) {
      dispatch(getRestaurantCategory({ jwt, restaurantId }));
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId }));
    }
  }, [restaurantId, dispatch, jwt]);

  return (
    <div className='lg:flex justify-between'>
      <div>
        <AdminSideBar open={open} handleClose={handleClose} />
      </div>

      <div className='lg:w-[80%] w-full'>
        {/* Show menu button only on small screens */}
        <button
          onClick={handleOpen}
          className='lg:hidden m-2 p-2 bg-gray-200 rounded'
        >
           Menu
        </button>

        <Routes>
          <Route path='/' element={<RestaurantDashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/category' element={<FoodCategory />} />
          <Route path='/ingredients' element={<Ingredients />} />
          <Route path='/event' element={<Events />} />
          <Route path='/details' element={<RestaurantDetails />} />
          <Route path='/add-menu' element={<CreateMenuForm />} />
        </Routes>
      </div>
    </div>
  );
};
