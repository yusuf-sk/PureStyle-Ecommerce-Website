import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useOrder } from "../context/OrderContext";

const CartIcon = ({ label = "Cart" }) => {
  const { orders } = useOrder();

  return (
    <NavLink
      to="/my-orders"
      className={({ isActive }) =>
        `relative transition-all duration-200
        ${
          isActive ? "text-purple-700" : "text-[#8e44ed]"
        } font-bold hover:text-[#732dd9]
        flex flex-col md:flex-row items-center justify-center gap-0 md:gap-1`
      }
    >
      <div className="relative flex items-center">
        <HiOutlineShoppingBag className="text-2xl md:text-2xl" />
        {orders.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] md:text-xs min-w-[10px] h-[16px] md:min-w-[16px] md:h-[16px] flex items-center justify-center px-[4px] md:px-[5px] rounded-full leading-none shadow-md">
            {orders.length}
          </span>
        )}
      </div>

      <span className="mt-1 text-xs md:hidden">{label}</span>
    </NavLink>
  );
};

export default CartIcon;
