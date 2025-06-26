import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../Products/Products";
import SearchCard from "./SearchCard";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase().trim();
      const words = lowerQuery.split(" ");
      const matches = products.filter((product) => {
        const name = product.name.toLowerCase();
        const brand = product.brand.toLowerCase();
        return words.every(
          (word) => name.includes(word) || brand.includes(word)
        );
      });
      setFilteredProducts(matches);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const renderSkeleton = () => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="animate-pulse rounded-lg bg-white shadow-md p-4 flex flex-col gap-2 font-poppins"
      >
        <div className="w-full h-48 bg-gray-300 rounded-md" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-16 md:pt-24 font-poppins">
      {searchQuery && filteredProducts.length > 0 && (
        <h2 className="text-2xl font-semibold mb-6 text-center font-montserrat">
          Search Results for{" "}
          <span className="text-purple-800">"{searchQuery}"</span>
        </h2>
      )}

      {loading ? (
        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renderSkeleton()}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all duration-500 ease-in-out">
          {filteredProducts.map((product, idx) => (
            <SearchCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500 text-xl font-poppins">
          No results found for{" "}
          <span className="text-purple-600">"{searchQuery}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
