import React from "react";
import { useState } from "react";
import CartSide from "../components/CartSide";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import { useProductContext } from "../contexts/ProductContext";
import { useSelector } from "react-redux";
import FavoriteSide from "../components/FavoriteSide";

export default function Home() {

  const [message, setMessage] = useState("");
  const { filterProducts } = useProductContext();
  const { products, loading } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);


  return loading ? (
    <Loading />
  ) : (
    <div className="main">
      {isAuthenticated &&
        <>
          <FavoriteSide />
          <CartSide />
        </>}
      <Search setMessage={setMessage} />
      <p style={{ textAlign: "center" }}> {message}</p>

      <div className="products_container">
        {filterProducts(products).map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            cart={cart}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}
