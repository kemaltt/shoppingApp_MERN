import React from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useGetProductByIdQuery } from "../../redux/product/product-api";
import { useAddToCartMutation, useDeleteFromCartMutation } from "../../redux/cart/cart-api";



export default function ProductDetail() {
  const navigate = useNavigate();


  const id = useParams().id
  const { product, loading } = useSelector((state) => state.products);
  const { isAuthenticated, token } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  useGetProductByIdQuery({ id, token }, { skip: !token });
  const [deleteFromCart] = useDeleteFromCartMutation()
  const [addToCart] = useAddToCartMutation();

  const addCart = async (product) => {
    const data = {
      _id: product._id,
      quantity: 1,
      price: product.price
    }
    await addToCart({ token, data })
  };

  const removeFromCart = async (id) => {
    await deleteFromCart({ id, token })
  };

  return (
    loading
      ? <Loading />
      : <Row>
        <div className="row px-5">
          <Col md='6' className="text-center p-5">
            <img className="img-fluid" src={product?.image} alt={product?.name} />
          </Col>
          <Col md='6' className="p-5">
            <div className=" d-flex justify-content-between  mb-4">
              <h1 className="m-0">{product.name}</h1>
              <span style={{ fontSize: "3rem" }}>
                <IoMdHeartEmpty
                // onClick={() => addToWish(product._id)}
                />
                {/* <IoMdHeart
                className="text-danger"
              // onClick={() => removeFromWish(product._id)}
              /> */}
              </span>
            </div>
            <span className=" fw-bold fs-1">{product?.price}€ </span>
            <p>category:   {product?.category}</p>
            <p>{product.description}</p>
            <div className="cart_buttons">
              {cart && cart?.products?.some((el) => el.product?._id === product._id) ? (
                <Button
                  onClick={() => removeFromCart(product._id)}
                  variant="outlined"
                  color="error"
                  startIcon={<RemoveShoppingCartIcon />}
                >
                  Delete from Cart
                </Button>
              ) : (
                <Button
                  onClick={() => !isAuthenticated ? navigate('/login') : addCart(product)}
                  variant="outlined"
                  color="success"
                  startIcon={<AddShoppingCartIcon />}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </Col>
        </div>
      </Row>





  )
}
