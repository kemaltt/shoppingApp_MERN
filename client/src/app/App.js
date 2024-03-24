import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Router from "./routes/Router";
import { fetchProducts, getCart } from "../middlewares/authApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {

    fetchProducts(dispatch);

    if (user?.status === "success") {
      getCart(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Router />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
