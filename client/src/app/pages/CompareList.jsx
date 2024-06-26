import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useProductContext } from "../contexts/ProductContext";

export default function Compare() {
  const { selectedCompareProducts, removeFromCompare, addCart } =
    useProductContext();

  return (
    <div className="compare">
      {selectedCompareProducts.length > 0 ? (
        <>
          <h1 style={{ color: "green", textAlign: "center" }}>
            Product comparison
          </h1>

          <div className="compare_container">
            <div style={{ width: "20%", textAlign: "left" }}>
              <h3>Title </h3>
              <h3>Price </h3>
              <h3>Category </h3>
              <h3>Rating </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                textAlign: "left",
                width: "80%",
              }}
            >
              {selectedCompareProducts.map((el, i) => (
                <table key={i}>
                  <tr>
                    <th>{el.title}</th>
                  </tr>
                  <tr>
                    <td>${el.price}</td>
                  </tr>
                  <tr>
                    <td>{el.category}</td>
                  </tr>
                  <tr>
                    <td>
                      {[...Array(5)].map((star, i) => (
                        <i
                          style={{
                            fontSize: "1.5rem",
                            color: el.rating.rate >= i + 1 ? "orange" : "grey",
                          }}
                          className="las la-star"
                        ></i>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Button
                        onClick={() => removeFromCompare(el)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <Button
                        onClick={() => addCart(el)}
                        variant="outlined"
                        color="success"
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Add to cart
                      </Button>
                    </th>
                  </tr>
                </table>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p
          style={{ textAlign: "center", color: "yellowgreen", margin: "3vh 0" }}
        >
          you have not selected any product
        </p>
      )}
    </div>
  );
}
