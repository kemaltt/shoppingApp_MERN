import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Form } from "react-bootstrap";

import { useGetProductsMutation } from "../../redux/product/product-api";

export default function Search({ setMessage }) {
  const [selectInput, setSelectInput] = useState('All')
  const { isAuthenticated, searchInput, setSearchInput, filterProducts } = useProductContext();
  const categories = ['All', 'men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing'];


  console.log(selectInput);
  // useGetProductsQuery(selectInput)
  const [getProducts] = useGetProductsMutation()

  useEffect(() => {

    const getProduct = async () => {
      await getProducts(selectInput)
    }

    getProduct()
  }, [selectInput, getProducts])
  const getProduct = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("please log in before continuing");
    } else {
      if (!searchInput) {
        alert("enter a product");
      } else {
        filterProducts();

        if (filterProducts().length === 0) {
          setMessage(
            <span style={{ color: "red" }}>No matching information</span>
          );
        } else {
          filterProducts();
          setMessage(
            <span style={{ color: "yellowgreen" }}>
              There are {filterProducts().length} matches
            </span>
          );
        }
      }
    }
    setSearchInput("");
  };
  return (
    <div className="search_container w-75 d-flex justify-content-center align-items-center  gap-4 my-5 mx-auto">
      <Form.Select
        onChange={(e) => setSelectInput(e.target.value)}
        style={{ height: '35px', width: '100px' }}
        className="fs-5 border-black rounded-5 text-center"
        aria-label="Default select example">
        {categories.map((el, i) => (
          <option key={i} value={el}>{el}</option>
        ))}
      </Form.Select>
      <form onSubmit={getProduct} action="">
        <input
          className="rounded-5"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search a product..."
          type="search"
          value={searchInput}
        />
        {/* <button type="submit">Search</button> */}
      </form>

    </div>
  );
}
