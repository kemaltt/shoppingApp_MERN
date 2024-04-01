import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Form } from "react-bootstrap";
import { fetchCategoryProducts } from "../../middlewares/authApiCalls";
import { useDispatch } from "react-redux";

export default function Search({ setMessage }) {
  const dispatch = useDispatch();
  const [selectInput, setSelectInput] = React.useState('All')
  const { isAuthenticated, searchInput, setSearchInput, filterProducts } =
    useProductContext();
  const optionValues = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Toys', 'Sports', 'Food', 'Other']
  const categories = ['All', 'men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing'];

  useEffect(() => {
    console.log(selectInput);
    fetchCategoryProducts(dispatch, selectInput)
  }, [dispatch, selectInput])


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
    <div className="search_container">
      <Form.Select
        onChange={(e) => setSelectInput(e.target.value)}
        style={{ height: '35px' }}
        className="w-25 fs-5 border-black rounded-5 text-center"
        aria-label="Default select example">
        {categories.map((el, i) => (
          <option key={i} value={el}>{el}</option>
        ))}
      </Form.Select>
      <form className="w-50 " onSubmit={getProduct} action="">
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
