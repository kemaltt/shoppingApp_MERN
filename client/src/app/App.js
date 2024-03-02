import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useProductContext } from "./contexts/ProductContext";
import Router from "./routes/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from "../middlewares/authApiCalls";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {

    fetchProducts(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Router />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
