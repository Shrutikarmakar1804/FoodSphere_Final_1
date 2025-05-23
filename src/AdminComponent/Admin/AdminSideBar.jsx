import { Dashboard, ShoppingBag } from '@mui/icons-material';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../component/State/Authentication/Action';
import { useDispatch } from 'react-redux';

const menu = [
  { title: 'Dashboard', icon: <Dashboard />, path: '/' },
  { title: 'Orders', icon: <ShoppingBag />, path: '/orders' },
  { title: 'Menu', icon: <ShopTwoIcon />, path: '/menu' },
  { title: 'Food Category', icon: <CategoryIcon />, path: '/category' },
  { title: 'Ingredients', icon: <FastfoodIcon />, path: '/ingredients' },
  { title: 'Events', icon: <EventIcon />, path: '/event' },
  { title: 'Details', icon: <AdminPanelSettingsIcon />, path: '/details' },
  { title: 'Logout', icon: <LogoutIcon />, path: '/' },
];

export const AdminSideBar = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:1080px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      dispatch(logout());
      navigate('/');
    } else {
      navigate(`/admin${item.path}`); 
    }
    if (isSmallScreen) handleClose(); 
  };

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          width: isSmallScreen ? '50vw' : '20vw',
          boxSizing: 'border-box',
        },
      }}
    >
      <div className="h-full flex flex-col justify-center text-xl gap-4 py-4">
        {menu.map((item, i) => (
          <div key={i}>
            <div
              onClick={() => handleNavigate(item)}
              className="px-5 py-2 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default AdminSideBar;
