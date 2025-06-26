import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const stored = sessionStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
