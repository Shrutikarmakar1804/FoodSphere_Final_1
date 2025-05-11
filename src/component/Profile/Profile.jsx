import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Order from "./Sections/Order";
import Address from "./Sections/Address";
import Favourites from "./Sections/Favourites";
import Refunds from "./Sections/Refunds";
import Notification from "./Sections/Notification";


const Profile = () => {
  return (
    <Routes>

      <Route path="/*" element={<UserProfile/>}/>
      <Route path="order" element={<Order />} />
      <Route path="address" element={<Address />} />
      <Route path="favourites" element={<Favourites />} />
      <Route path="refunds" element={<Refunds />} />
      <Route path="notification" element={<Notification />} />
    </Routes>
  );
};

export default Profile;
