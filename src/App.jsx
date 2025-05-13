import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { darkTheme } from './component/Theme/DarkTheme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { findUserCart } from './component/State/Cart/Action';
import { getRestaurantByUserId, getRestaurantById } from './component/State/Restaurant/Action';
import process from 'process';
import { Routers } from './component/Routers/Routers';

window.process = process;

function App() {
  const dispatch = useDispatch();
  const storedJwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const token = auth?.jwt || storedJwt;

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
      dispatch(findUserCart(token));
      dispatch(getRestaurantByUserId(token)); // Load restaurant for user
    }
  }, [token, dispatch]);

  // Optional: Load restaurant by known ID
  // useEffect(() => {
  //   const restaurantId = "REPLACE_WITH_ACTUAL_ID";
  //   if (restaurantId && token) {
  //     dispatch(getRestaurantById(restaurantId, { jwt: token }));
  //   }
  // }, [token, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
