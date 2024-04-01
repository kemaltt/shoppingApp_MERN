import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { fetchSingleProduct } from "../../middlewares/authApiCalls";



export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCart, removeFromCart } = useProductContext();
  const id = useParams().id
  const { product, loading } = useSelector((state) => state.products);
  const { isAuthenticated, token } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    fetchSingleProduct(dispatch, id, token);
  }, [dispatch, id, token]);

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
                  onClick={() => !isAuthenticated ? navigate('/login') : addToCart(product)}
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
