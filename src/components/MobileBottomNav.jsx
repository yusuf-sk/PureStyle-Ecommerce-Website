import { NavLink } from "react-router-dom";
import { FaHome, FaHeart, FaUser, FaStoreAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useOrder } from "../context/OrderContext";

const MobileBottomNav = () => {
  const { orders } = useOrder();

  return (
    <nav className="fixed  bottom-0 left-0 right-0 z-50 bg-white sm:hidden shadow-[0_-1px_6px_rgba(0,0,0,0.05)] border-t border-gray-200">
      <ul className="flex justify-between items-center px-2 pt-2">
        <NavItem
          to="/"
          icon={<FaHome className="text-inherit" />}
          label="Home"
        />
        <OrdersNavItem orders={orders.length} />
        <NavItem
          to="/shop"
          icon={<FaStoreAlt className="text-inherit" />}
          label="Shop"
        />
        <NavItem
          to="/wishlist"
          icon={<FaHeart className="text-inherit" />}
          label="Wishlist"
        />
        <NavItem
          to="/signup"
          icon={<FaUser className="text-inherit" />}
          label="Account"
        />
      </ul>
    </nav>
  );
};

const NavItem = ({ to, icon, label }) => (
  <li className="flex-1">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center text-[11px] transition-all duration-200 
         ${isActive ? "text-purple-700 font-semibold" : "text-gray-500"}`
      }
    >
      <span className="text-[19px] mb-[2px]">{icon}</span>
      {label}
    </NavLink>
  </li>
);

const OrdersNavItem = ({ orders }) => (
  <li className="flex-1">
    <NavLink
      to="/my-orders"
      className={({ isActive }) =>
        `relative flex flex-col items-center justify-center text-[11px] transition-all duration-200 
         ${isActive ? "text-purple-700 font-semibold" : "text-gray-500"}`
      }
    >
      <div className="relative">
        <HiOutlineShoppingBag className="text-inherit text-[20px] mb-[2px]" />
        {orders > 0 && (
          <span className="absolute -top-[2px] -right-[8px] bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[4px] leading-none shadow-sm">
            {orders}
          </span>
        )}
      </div>
      Orders
    </NavLink>
  </li>
);

export default MobileBottomNav;
