import React from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useGetProductByIdQuery } from "../../redux/product/product-api";
import { useAddToCartMutation, useDeleteFromCartMutation } from "../../redux/cart/cart-api";
import { Card, CardContent, CardHeader, Typography, CardMedia } from '@mui/material'
import { BASE_URL } from "../../constants/api/apiUrl";



export default function ProductDetail() {
  const navigate = useNavigate();
  const id = useParams().id
  const { product, loading } = useSelector((state) => state.products);

  console.log(product.images?.map((image) => `${BASE_URL}/${image.url}`)[0])

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
      :
      <Card className="p-5" >
        <CardHeader
          title='Product Detail'
          action={
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
          }
        />

        <Row className='mt-5' >
          <Col lg='6'>
            <CardMedia
              component="img"
              // sx={{ width: 600 }}
              sx={{ objectFit: 'contain', width: '100%', height: '500px', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
              image={product?.image}
              alt={product?.name}
            />
          </Col>

          {product.images?.map((image, index) =>

            <img
              key={index}
              src={`${image.file ? image.url : `${BASE_URL}/${image.url}`}`}
              alt={`product ${index}`}
              width="100%"
              height="auto"
              className="h-100 thumbnail-200"
              style={{ pointerEvents: 'none' }}
            />

          )}

          <Col lg='6'>
            <CardContent className='d-flex flex-column gap-3' sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h4">
                {product.name}
              </Typography>
              <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                {product?.price}€
              </Typography>
              <Typography component="div" variant="h5">
                category:   {product?.category}
              </Typography>
              <Typography component="div" >
                {product.description}
              </Typography>
            </CardContent>

          </Col>

        </Row>

      </Card>
  )
}
