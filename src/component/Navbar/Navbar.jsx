import { Avatar, Badge, Box, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import CartHoverPopup from "../Cart/CartHoverPopup";
import SettingsDrawer from "../SettingsDrawer/Index";

  const Navbar = () => {
  const auth = useSelector((store) => store.auth); // ✅ safer, avoid destructuring here
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isUser, setUser] = useState(false);
  const location = useLocation();

  const getLinkClass = (path) =>
    location.pathname === path
      ? " text-pink-600 font-bold px-3 py-1 rounded-full bg-white"
      : "";

  const isHome = location.pathname === "/";

  const handleAvatarClick = () => {
    if (auth?.user?.role === "ROLE_CUSTOMER") {
      navigate("/home");
    } else {
      navigate("/admin/restaurants");
    }
  };

  useEffect(() => {
    if (isUser) {
      setUser(false);
      navigate("/settingsDrawer");
    }
  }, [isUser]);

  return (
    <>
      <Box className="px-2 sticky top-0 z-50 py-[.6rem] bg-[#f50057]
       lg:px-20 flex justify-between">
        <div className="flex items-center justify-between p-2">
          <Link to="/">
            <div className="flex items-center">
              <img
                src="https://i.imgur.com/EaVTotc.jpeg"
                alt="logo"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-white text-2xl font-bold ml-2">
                <i>Foodsphere</i>
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2 la:space-x-10">
          <div className="flex items-center gap-6 text-white text-lg">
            {location.pathname === "/" && (
              <>
                <Link to="/search" className={getLinkClass("/search")}>
                  Search
                </Link>
                <Link to="/about" className={getLinkClass("/about")}>
                  About Me
                </Link>
                <Link to="/offers" className={getLinkClass("/offers")}>
                  %Offers
                </Link>
                <SettingsDrawer/>
              </>
            )}
          </div>

          {isHome && (
            <>
               {/* <div>
                    {auth.user? (
                      <Avatar 
                        onClick={handleAvatarClick} 
                        sx={{ bgcolor: "white", color: pink.A400 }}
                      >
                        {auth.user?.fullName[0].toUpperCase()}
                      </Avatar>
                    ) : (
                      <IconButton onClick={() => navigate("/account/login")}>
                        <Person />
                      </IconButton>
                    )}
                  </div> */}

              <div>
                <IconButton onClick={() => navigate("/cart")}>
                  <Badge
                    color="primary"
                    badgeContent={cart?.cart?.items?.length || 0}
                  >
                    <CartHoverPopup sx={{ fontSize: "3rem" }} />
                  </Badge>
                </IconButton>
              </div>
            </>
          )}
        </div>
      </Box>
    </>
  );
};

export default Navbar;
