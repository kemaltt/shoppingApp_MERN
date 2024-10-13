import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { shallowEqual, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDeleteFromCartMutation, useGetCartQuery } from "../../redux/cart/cart-api";
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../redux/favorite/favorite-api";
import { useUpdateProductByIdMutation } from "../../redux/product/product-api";





export default function CartList() {

  const [deleteFromCart] = useDeleteFromCartMutation()
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  const [updateProductById] = useUpdateProductByIdMutation()

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
    const updatedCountInStock = foundProduct.product.countInStock - quantity;
    console.log(id);
    console.log(foundProduct);
    console.log(updatedCountInStock);



    await updateProductById({ id, token, updatedCountInStock });
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
      : <>
        <div className="cart-title d-flex justify-content-start align-items-center gap-4 mb-4 p-4">
          <h1>Warenkorb</h1>
          <p className="m-0"> {cart?.products?.length} Products</p>
        </div>
        <Row className="p-5">
          <>
            <Col md='9' className="cart-list">
              {cart?.products?.map((product, i) => (
                <div key={i}>
                  <hr className="solid"></hr>
                  <div className="cart? d-flex gap-5 mb-5">
                    <div className="cart-image w-25">
                      <img
                        className="img-fluid "
                        src={product?.product?.image}
                        alt={product?.product?.name}
                      />
                    </div>
                    <div className="cart-detail w-50">
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
                      <p>Stock: {product?.product?.countInStock}</p>
                      <div className="d-flex gap-4 ">
                        <p className="m-0">Quantity: </p>
                        <Form.Select className="w-50  border-black rounded-5" aria-label="Default select example" onChange={(e) => updateProduct(product?.product._id, e)}>
                          {optionValues.map((el, i) => (
                            <option key={i} value={el}>{el}</option>
                          ))}
                        </Form.Select>
                      </div>

                      <div className="cart-buttons d-flex justify-content-between align-items-center gap-5 mt-5 w-50">
                        <div type="button" className="cart-delete d-flex justify-content-between align-items-center gap-3 " onClick={() => removeFromCart(product?.product._id)}>
                          <RiDeleteBin6Fill style={{ color: "red", fontSize: "2rem" }} />
                          <span className="fs-4 border-bottom border-dark">Delete</span>
                        </div>
                        <div type="button" className="cart-delete d-flex justify-content-between align-items-center gap-3 ">
                          {favorite.some(el => el._id === product?.product._id) ?
                            <FaHeart
                              onClick={() => delFav(product?.product._id)}
                              style={{ color: "orange", fontSize: "2rem" }}
                            />
                            :
                            <FaRegHeart
                              onClick={() => addFav(product?.product._id)}
                              style={{ fontSize: "2rem" }}
                            />
                          }
                          <span className="fs-4 border-bottom border-dark">Favourite</span>
                        </div>

                      </div>
                    </div>
                    <div className="price w-25 text-end">
                      <span className="fs-3 fw-bold"> {product?.product?.price} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
            {cart?.products?.length > 0 &&
              <Col md='3' className="payment px-5 ">
                <div className="border border-primary p-4">

                  <div className="payment-detail">
                    <h3>Summary</h3>
                    <p>Subtotal: {total.toFixed(2)}€</p>
                    <p>Shipping: {shipping_cost}€</p>
                    <p>Total: {totalPrice.toFixed(2)}€</p>
                  </div>
                  <div className="payment-btn">
                    <Button type="button" variant="success" >Checkout</Button>
                  </div>
                </div>
              </Col>
            }
          </>
        </Row>
      </>
  )
}
