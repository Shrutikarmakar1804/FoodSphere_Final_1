import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "John Doe",
  email: "john@example.com",
  address: ["123 Main Street, NY"],
  notifications: {
    email: true,
    sms: false,
  },
  subscription: "Premium",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    addAddress: (state, action) => {
      state.address.push(action.payload);
    },
    toggleNotification: (state, action) => {
      const { type, value } = action.payload;
      state.notifications[type] = value;
    },
    cancelSubscription: (state) => {
      state.subscription = "None";
    },
  },
});

export const {
  updateUserInfo,
  addAddress,
  toggleNotification,
  cancelSubscription,
} = userSlice.actions;

export default userSlice.reducer;
