import React from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

export default function ProductDetail() {

  const { product, loading } = useSelector((state) => state.products);
  return (
    loading
      ? <Loading />
      : <div className="product_detail">
        <img src={product?.image} alt="" />
        <h2 style={{ textDecoration: "underline" }}>{product?.name}</h2>
        <p>{product?.category} </p>
        <p>${product?.price} </p>
        <p
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          Description
        </p>
        <p>{product?.description} </p>
        {/* <p>
        colors :
        {product.rating.map((el, i) => (
          <span style={{ margin: '3px' }} key={i}>
            {el}
          </span>
        ))}
      </p> */}
        <p
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
            color: "grey",
            textDecoration: "underline",
          }}
        >
          Rating
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "5px",
          }}
          className="star"
        >
          {[...Array(5)].map((star, i) => (
            <i
              key={i}
              style={{
                fontSize: "1.5rem",
                color: product?.rating >= i + 1 ? "orange" : "grey",
              }}
              className="las la-star"
            ></i>
          ))}
        </div>
      </div>
  )
}
