import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import OrderDetails from "./pages/OrderDetails";
import Payment from "./pages/Payment";
import OrderSummary from "./pages/OrderSummary";
import SuccessPopup from "./pages/SuccessPopup";
import SearchResultsPage from "./components/SearchResultsPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SizeGuide from "./pages/SizeGuide";
import CategoryProducts from "./components/CategoryProducts";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import SignUp from "./components/SignUp";
import Category from "./pages/Category";
import MobileBottomNav from "./components/MobileBottomNav";
function App() {
  return (
    <div>
      <Router>
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/successpopup" element={<SuccessPopup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/searchresults" element={<SearchResultsPage />} />
          <Route path="/sizeguide" element={<SizeGuide />} />
          <Route path="/categoryproducts" element={<CategoryProducts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category/:categoryName" element={<Category />} />
        </Routes>
        <MobileBottomNav />
      </Router>
    </div>
  );
}

export default App;
