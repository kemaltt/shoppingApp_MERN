import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import data from "../products";
// import { useAuth0 } from "@auth0/auth0-react";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = (props) => {
  // const { loginWithRedirect, isAuthenticated, logout, isLoading, user } =
  //   useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);
  console.log(isAuthenticated, "isAuthenticated");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCartProducts, setSelectedCartProducts] = useState([]);
  const [selectedCompareProducts, setSelectedCompareProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filterProducts = (item) => {
    return item.filter((el) =>
      el.name?.toLowerCase().includes(searchInput?.toLowerCase())
    );
  };
  const addToCart = (product) => {
    if (isAuthenticated) {
      if (selectedCartProducts.includes(product)) {
        product.count++;
      } else {
        product.count = 1;
        setSelectedCartProducts([...selectedCartProducts, product]);
      }
    } else {
      alert("Please login");
    }
  };
  const removeFromCart = (product) => {
    setSelectedCartProducts([
      ...selectedCartProducts.filter(
        (el) => el.product_id !== product.product_id
      ),
    ]);
  };
  const addToCompare = (product) => {
    if (isAuthenticated) {
      setSelectedCompareProducts([...selectedCompareProducts, product]);
    } else {
      alert("Please login");
    }
  };
  const removeFromCompare = (product) => {
    setSelectedCompareProducts([
      ...selectedCompareProducts.filter(
        (el) => el.product_id !== product.product_id
      ),
    ]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        selectedCartProducts,
        selectedCompareProducts,
        setSelectedCartProducts,
        setSelectedCompareProducts,
        searchInput,
        setSearchInput,
        filterProducts,
        setIsAuthenticated,
        isAuthenticated,
        // logout,
        isLoading,
        setIsLoading,
        addToCart,
        removeFromCart,
        addToCompare,
        removeFromCompare,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
