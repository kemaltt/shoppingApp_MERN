import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useProductContext } from "../contexts/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../middlewares/authApiCalls";
import { Col, Form, Row } from "react-bootstrap";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";





export default function Contact() {
  const { setSelectedCartProducts, removeFromCart } =
    useProductContext();
  // const [quantity, setQuantity] = useState(1)

  let total = 0;
  const { cart, loading } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const optionValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const dispatch = useDispatch();

  useEffect(() => {
    getCart(dispatch);
  }, [dispatch]);

  const selectedCartProducts = products.filter((product) => {
    return cart?.find((cart) => cart.product_id === product._id);
  }
  );
  console.log(selectedCartProducts);
  const decreaseQuantity = (product) => {
    if (selectedCartProducts.includes(product)) {
      if (product.count > 1) {
        product.count--;
        setSelectedCartProducts([...selectedCartProducts]);
      }
    }
  };
  const increaseQuantity = (product) => {
    if (selectedCartProducts.includes(product)) {
      product.count++;
      setSelectedCartProducts([...selectedCartProducts]);
    }
  };
  const shipping_cost = 4.99
  const totalAmount = selectedCartProducts.map((product) => {
    return product?.price;
  });
  totalAmount.map((el) => (total += el));
  const totalPrice = total + shipping_cost
  //     if (selectedProducts.includes(product)) {

  //     product.count++
  //   } else {
  //     product.count = 1
  //     setSelectedProducts([...selectedProducts, product])
  //   }

  return (
    selectedCartProducts.length === 0
      ? <h1 className="text-center mt-5">Your cart is empty</h1>
      : <>
        <div className="cart-title d-flex justify-content-start align-items-center gap-4 mb-4 p-4">
          <h1>Warenkorb</h1>
          <p className="m-0"> {selectedCartProducts?.length} Products</p>
        </div>
        <Row className="p-5">
          <>
            <Col md='9' className="cart-list">
              {selectedCartProducts.map((product, i) => (
                <>
                  <hr class="solid"></hr>
                  <div className="cart? d-flex gap-5 mb-5">
                    <div className="cart-image w-25">
                      <img
                        className="img-fluid "
                        src={product?.image}
                        alt={product?.name}
                      />
                    </div>
                    <div className="cart-detail w-50">
                      <h3 className="fw-bold mb-4">{product?.name}</h3>
                      <p>category:   {product?.category}</p>
                      <p>rating:   {[...Array(5)].map((star, i) => (
                        <i
                          key={i}
                          style={{
                            fontSize: "1.5rem",
                            color: product?.rating >= i + 1 ? "orange" : "grey",
                          }}
                          className="las la-star"
                        ></i>
                      ))}</p>
                      <div className="d-flex gap-4 ">
                        <p className="m-0">Quantity: </p>
                        <Form.Select style={{ width: '100px' }} aria-label="Default select example">
                          {optionValues.map((el, i) => (
                            <option key={i} value={el}>{el}</option>
                          ))}
                        </Form.Select>
                      </div>

                      <div className="cart-buttons d-flex justify-content-between align-items-center gap-5 mt-5 w-50">
                        <div type="button" className="cart-delete d-flex justify-content-between align-items-center gap-3 " onClick={() => removeFromCart(product._id)}>
                          <RiDeleteBin6Fill style={{ color: "red", fontSize: "2rem" }} />
                          <span className="fs-4 border-bottom border-dark">Delete</span>
                        </div>
                        <div type="button" className="cart-delete d-flex justify-content-between align-items-center gap-3 ">
                          <IoHeartOutline
                            // onClick={() => removeFromCart(product._id)}
                            style={{ fontSize: "2rem" }}
                          />
                          <span className="fs-4 border-bottom border-dark">Favourite</span>
                        </div>

                      </div>
                    </div>
                    <div className="price w-25 text-end">
                      <span className="fs-3 fw-bold"> {product?.price} €</span>
                    </div>
                  </div>
                </>
              ))}
            </Col>
            <Col md='3' className="payment px-5 ">
              <div className="border border-primary p-4">

                <div className="payment-detail">
                  <h3>Summary</h3>
                  <p>Subtotal: {total.toFixed(2)}€</p>
                  <p>Shipping: {shipping_cost}€</p>
                  <p>Total: {totalPrice.toFixed(2)}€</p>
                </div>
                <div className="payment-btn">
                  <button>Checkout</button>
                </div>
              </div>
            </Col>
          </>
        </Row>
      </>
  )
}
