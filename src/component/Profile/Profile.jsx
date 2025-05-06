import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Favorites from '../SettingsDrawer/Sections/Favourites';
import Notification from '../SettingsDrawer/Sections/Notification';
import Order from '../SettingsDrawer/Sections/Order';
import Refunds from '../SettingsDrawer/Sections/Refunds';
import Address from './Address';
import ProfileNavigation from './ProfileNavigation';


const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-full lg:w-[30%]'>
        <ProfileNavigation open={openSideBar}/>

      </div>
      <div className="lg:w-[100%]">

        <Routes>

          <Route path="/" element={<UserProfile/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/address" element={<Address/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/refunds" element={<Refunds/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/logout" element={<Logout/>}/>

        </Routes>
      </div>
      
    </div>
  )
}

export default Profile  