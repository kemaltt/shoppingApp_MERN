import React from "react";
import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useAddToCartMutation, useDeleteFromCartMutation } from "../../redux/cart/cart-api";
// import data from "../products";
// import { useAuth0 } from "@auth0/auth0-react";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = (props) => {

  const { isAuthenticated } = useSelector((state) => state.user)
  const [addToCart] = useAddToCartMutation()
  const [deleteFromCart] = useDeleteFromCartMutation()
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
  const addCart = (product) => {

    // addCart(dispatch, product, token);
    addToCart(product)

    // if (selectedCartProducts.includes(product)) {
    //   console.log('product already in cart');
    // } else {
    //   console.log('product added to cart');
    //   setSelectedCartProducts([...selectedCartProducts, product]);
    // }

  };
  const removeFromCart = (id) => {
    deleteFromCart(id)

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
        addCart,
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
