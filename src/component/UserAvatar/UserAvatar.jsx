import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';

export default function UserAvatar({ avatarUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-10 h-10 overflow-hidden border-2 border-white focus:outline-none"
      >
        <Profile/>
        <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
         <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
          <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
          <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</Link>
          <Link to="/favorites" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Favorites</Link>
          <Link to="/events" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Events</Link>
          <Link to="/notification" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Notification</Link>
          <Link to="/refunds" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Refunds</Link>
          
          <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
        </div>
      )}
    </div>
  );
}
