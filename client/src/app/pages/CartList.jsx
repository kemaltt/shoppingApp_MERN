import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteFromCartMutation, useGetCartQuery, useUpdateCartByIdMutation } from "../../redux/cart/cart-api";
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../redux/favorite/favorite-api";
import Button from "../components/Button";
import { Card, CardHeader, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";



export default function CartList() {

  const [deleteFromCart] = useDeleteFromCartMutation()
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  // const [updateProductById] = useUpdateProductByIdMutation()
  const [updateCartById] = useUpdateCartByIdMutation()

  let total = 0;
  const { cart, token, favorite } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token,
    cart: state.cart.cart,
  }), shallowEqual);

  const { error } = useGetCartQuery(token, { refetchOnMountOrArgChange: true })
  const optionValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const removeFromCart = async (id) => {
    await deleteFromCart({ id, token })
  };
  const delFav = async (id) => {
    await deleteFavorite({ id, token });
  }
  const addFav = async (id) => {
    await addFavorite({ token, id });
  }
  const updateProduct = async (id, e) => {
    const quantity = e.target.value;
    const foundProduct = cart?.products?.find((el) => el.product._id === id);

    let updatedCountInStock;

    if (quantity > foundProduct.quantity) {
      // Yeni quantity büyükse stoğu azalt
      updatedCountInStock = foundProduct.product.countInStock - (quantity - foundProduct.quantity);
    } else {
      // Yeni quantity küçükse stoğu artır
      updatedCountInStock = foundProduct.product.countInStock + (foundProduct.quantity - quantity);
    }
    const data = {
      quantity: +quantity,
      price: quantity * foundProduct.product.price,
      updatedCountInStock
    }

    await updateCartById({ id, token, data });
  }

  const shipping_cost = 4.99
  const totalAmount = cart?.products?.map((product) => {
    return product?.product?.price;
  });

  totalAmount?.map((el) => (total += el));
  const totalPrice = total + shipping_cost

  return (
    cart?.products?.length <= 0 || error
      ? <h1 className="text-center text-danger mt-5">{error?.data?.message ?? <span> There are no items in the cart</span>}</h1>
      : <Card className="p-5">
        <CardHeader
          title='Warenkorb'
          subheader={`${cart?.products?.length} Products`}
        />
        <Row >
          <>
            <Col md='8' className="cart-list mb-5 ">

              {cart?.products?.map((product, i) => (
                <Row key={i} >
                  <hr className="solid"></hr>

                  <Col md='4' className="cart-image">
                    <img
                      className="img-fluid p-2"
                      src={product?.product?.image}
                      alt={product?.product?.name}
                    />
                  </Col>
                  <Col md='5' className="">
                    <h3 className="fw-bold mb-4">{product?.product?.name}</h3>
                    <p>category:   {product?.product?.category}</p>
                    <p>rating:   {[...Array(5)].map((star, i) => (
                      <i
                        key={i}
                        style={{
                          fontSize: "1.5rem",
                          color: product?.product?.rating >= i + 1 ? "orange" : "grey",
                        }}
                        className="las la-star"
                      ></i>
                    ))}</p>
                    <div className="d-flex align-items-center gap-4 ">
                      <p className="m-0">Stock: {product?.product?.countInStock}</p>
                      {/* <Form.Select className="w-50  border-black rounded-5" aria-label="Default select example"
                          value={product?.quantity}
                          onChange={(e) => updateProduct(product?.product._id, e)}>
                          {optionValues.map((el, i) => (
                            <option key={i} value={el}>{el}</option>
                          ))}
                        </Form.Select> */}
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Quantity</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={product?.quantity}
                          label="Quantity"
                          onChange={(e) => updateProduct(product?.product._id, e)}
                        >
                          {optionValues.map((el, i) => (
                            <MenuItem key={i} value={el}>{el}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="cart-buttons d-flex justify-content-start align-items-center gap-3 mt-5 w-50">
                      <Tooltip placement="top" title="Delete">
                        <div type="button" className="cart-delete " onClick={() => removeFromCart(product?.product._id)}>
                          <DeleteIcon style={{ color: "red", fontSize: "2rem" }} />
                        </div>
                      </Tooltip>
                      <Tooltip placement="top" title="Favorite">
                        <div type="button" className="cart-delete">
                          {favorite.some(el => el._id === product?.product._id) ?
                            <FavoriteOutlinedIcon
                              onClick={() => delFav(product?.product._id)}
                              style={{ color: "orange", fontSize: "2rem" }}
                            />
                            :
                            <FavoriteBorderOutlinedIcon
                              onClick={() => addFav(product?.product._id)}
                              style={{ fontSize: "2rem" }}
                            />
                          }
                        </div>
                      </Tooltip>

                    </div>
                  </Col>
                  <Col md='3' className="price  text-end">
                    <span className="fs-3 fw-bold"> {product?.price} €</span>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col md='3' className="payment">

              {cart?.products?.length > 0 &&
                <div className="border border-primary p-4 ml-4">

                  <div className="payment-detail">
                    <h3>Summary</h3>
                    <p>Subtotal: {total.toFixed(2)}€</p>
                    <p>Shipping: {shipping_cost}€</p>
                    <p>Total: {totalPrice.toFixed(2)}€</p>
                  </div>
                  <div className="payment-btn">
                    <Button type="button" variant="success" title="Checkout" />
                    {/* <Button type="button" variant="success" >Checkout</Button> */}
                  </div>
                </div>
              }
            </Col>
          </>
        </Row>
      </Card>
  )
}
