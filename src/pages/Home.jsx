import Hero2 from "../components/Hero2";
import Banner1 from "../components/Banner1";
import Cards from "../components/Cards";
import FashionBanner from "../components/FashionBanner";
import ChooseUs from "../components/Chooseus";
import Footer from "../components/Footer";
import FlashSale from "../components/FlashSale";
import TrendingProducts from "../components/TrendingProducts";
import TopCategories from "../components/TopCategories";
import ShopByBrand from "../components/ShopByBrand";
import PromotionBanner from "../components/PromotionBanner";
import NikeBanner from "../components/NikeBanner";
import SignUpSection from "../components/SignUpSection";
import NewArrivals from "../components/NewArrivals";

const Home = () => {
  return (
    <div>
      <Hero2 />
      <Cards />
      <TopCategories />
      <NikeBanner />
      <FlashSale />
      <SignUpSection />
      <FashionBanner />
      <ShopByBrand />
      <PromotionBanner />
      <TrendingProducts />
      <Banner1 />
      <NewArrivals />
      <ChooseUs />
      <Footer />
    </div>
  );
};

export default Home;
