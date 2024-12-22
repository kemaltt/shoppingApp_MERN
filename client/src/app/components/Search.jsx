import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useGetProductsMutation } from "../../redux/product/product-api";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { categories } from "./navbar/helper/UIHelper";

export default function Search({ setMessage }) {
  const [selectInput, setSelectInput] = useState('All');

  const { isAuthenticated, searchInput, setSearchInput, filterProducts } = useProductContext();
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
    <div className="search_container d-flex justify-content-center align-items-center gap-lg-4 gap-2 my-4 mx-auto">
      <FormControl sx={{ m: 1, width:160 }} size="small">
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectInput}
          label="Category"
          onChange={(e) => { setSelectInput(e.target.value) }}
        >
          {categories.map((el, i) => (
            <MenuItem key={i} value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>


      <FormControl onSubmit={getProduct} sx={{ maxWidth: '400px' }} fullWidth>
        <TextField
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          id="search"
          label="Search"
          name="search"
          type="search"
          size="small"
        />
      </FormControl>

    </div>
  );
}
