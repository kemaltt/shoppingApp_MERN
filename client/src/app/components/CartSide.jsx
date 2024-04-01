import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useSelector } from "react-redux";

export default function Cart() {
  const { selectedCartProducts, isAuthenticated } = useProductContext();
  const { cart, loading } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const badge = cart?.products?.length;
  return (
    <div
      onClick={() => navigate("/cart")}
      className="cart_container"
    >
      <FaCartArrowDown />
      <Badge bg="secondary">{badge ? badge : 0}</Badge>
      <span className="visually-hidden">unread messages</span>
    </div>
  );
}
