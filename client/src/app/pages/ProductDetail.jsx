import React from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";



export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedCartProducts,
    selectedCompareProducts,
    addToCart,
    removeFromCart,
    addToCompare,
    removeFromCompare,
  } = useProductContext();
  const { product, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  console.log(cart);
  console.log(product);
  console.log(cart.some((el) => el.product_id === product._id));
  return (
    loading
      ? <Loading />
      : <div className="d-flex gap-5">
        <div className="w-50 text-center ">
          <img className="img-fluid" src={product?.image} alt={product?.name} />
        </div>
        <div className="w-50 p-5">
          <div className=" d-flex justify-content-between  mb-4">
            <h1 className="m-0">{product.name}</h1>
            <span style={{ fontSize: "3rem" }}>
              <IoMdHeartEmpty
              // onClick={() => removeFromCart(product._id)}
              />
            </span>
          </div>
          <span className=" fw-bold fs-1">{product?.price}€ </span>
          <p>category:   {product?.category}</p>
          <p>{product.description}</p>
          <div className="cart_buttons">
            {cart && cart.some((el) => el.product_id === product._id) ? (
              <Button
                onClick={() => removeFromCart(product._id)}
                variant="outlined"
                color="error"
                startIcon={<RemoveShoppingCartIcon />}
              >
                Del
              </Button>
            ) : (
              <Button
                onClick={() => !isAuthenticated ? navigate('/login') : addToCart(product)}
                variant="outlined"
                color="success"
                startIcon={<AddShoppingCartIcon />}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>





  )
}
