// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Adjust to your actual reducer file

const store = configureStore({
  reducer: rootReducer,
});
export default store