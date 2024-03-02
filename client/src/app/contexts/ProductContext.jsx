import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import data from "../products";
// import { useAuth0 } from "@auth0/auth0-react";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = (props) => {
  const { isAuthenticated } = useSelector((state) => state.user)

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCartProducts, setSelectedCartProducts] = useState([]);
  const [selectedCompareProducts, setSelectedCompareProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filterProducts = (item) => {
    return item?.filter((el) =>
      el.name?.toLowerCase().includes(searchInput?.toLowerCase())
    );
  };
  const addToCart = (product) => {

    if (selectedCartProducts.includes(product)) {
      product.count++;
    } else {
      product.count = 1;
      setSelectedCartProducts([...selectedCartProducts, product]);
    }

  };
  const removeFromCart = (product) => {
    setSelectedCartProducts([
      ...selectedCartProducts.filter(
        (el) => el._id !== product._id
      ),
    ]);
  };
  const addToCompare = (product) => {
    setSelectedCompareProducts([...selectedCompareProducts, product]);
  };
  const removeFromCompare = (product) => {
    setSelectedCompareProducts([
      ...selectedCompareProducts.filter(
        (el) => el._id !== product._id
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
        // logout,
        isLoading,
        setIsLoading,
        addToCart,
        removeFromCart,
        addToCompare,
        removeFromCompare,
        isAuthenticated,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
