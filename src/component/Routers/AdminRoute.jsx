import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CreateRestaurantForm } from '../../AdminComponent/CreateRestaurantForm/CreateRestaurantForm';
import { Admin } from '../../AdminComponent/Admin/Admin';

export const AdminRoute = () => {
  const  restaurant  = useSelector((store) => store.restaurant);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant?.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        />
      </Routes>
    </div>
  );
};
