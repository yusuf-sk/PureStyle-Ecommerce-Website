import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/wishlistContext.jsx";
const root = createRoot(document.getElementById("root"));

root.render(
  <WishlistProvider>
    <OrderProvider>
      <App />
    </OrderProvider>
  </WishlistProvider>
);
