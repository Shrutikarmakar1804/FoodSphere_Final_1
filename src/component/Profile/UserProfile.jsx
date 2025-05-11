import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import NotificationsIcon from '@mui/icons-material/Notifications';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { title: "Orders", icon:<ShoppingBagIcon />, path: "/order" }, 
  { title: "Favourites", icon:<FavoriteIcon/>, path: "/favourites" },
  { title: "Payments", icon:<CreditCardIcon />, path: "/payments" },
  { title: "Addresses", icon: <AddLocationAltIcon />, path: "/addresses" },
  { title: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
  { title: "Refunds", icon: <CurrencyRupeeIcon />, path: "/Refunds" },
  { title: "Contact Us", icon: <ContactSupportIcon />, path: "/contact" },
  { title: "Feedback", icon:<FeedbackIcon />, path: "/feedback" },
  { title: "Edit Profile", icon: <AccountCircleIcon />, path: "/edit-profile" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

export default function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  

  const [activeTab, setActiveTab] = useState('Orders');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  // Removed unused dispatch declaration
  });

  // Sync form with Redux user data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Optional: dispatch update to backend or Redux
    // dispatch(updateProfile(formData));

    // Simulate update locally
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
          <p className="text-sm text-gray-700">
            {formData.phone} • {formData.email}
          </p>
          {/* <button
            onClick={() => setActiveTab('Edit Profile')}
            className="mt-4 border border-black text- px-4 py-1 bg-teal-700 rounded hover:bg-teal-800"
          >
          
          </button> */}
        </div>
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={item.title || index}
              onClick={() => setActiveTab(item.title)}
              className={`flex items-center space-x-3 px-4 py-2 rounded cursor-pointer ${
                activeTab === item.title
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-800 hover:bg-white'
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'Orders' && (
          <div className="text-center mt-20">
            <p className="text-orange-500 font-semibold mb-2">
              Your orders with Foodsphere will be listed here.
            </p>
            <img
              src="https://cdn.dribbble.com/users/1554528/screenshots/3512647/media/0dd55cb6eb443f429f7259f4e2a9d537.png"
              alt="No orders"
              className="w-40 mx-auto mb-4"
            />
            <p className="text-orange-500">
              Go ahead and find some awesome restaurants near you...
            </p>
            <h2 className="text-xl font-bold mt-4">No Orders</h2>
            <p className="text-sm text-gray-600">You haven’t placed any order yet.</p>
          </div>
        )}

        {activeTab === 'Edit Profile' && (
          <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <button
                type="submit"
                className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab !== 'Orders' && activeTab !== 'Edit Profile' && (
          <div className="text-center mt-20 text-gray-500 text-lg">
            {activeTab} Loading...
          </div>
        )}
      </div>
      
    </div>
  );
}
