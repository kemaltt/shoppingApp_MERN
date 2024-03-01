import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useProductContext } from "./contexts/ProductContext";
import Router from "./routes/Router";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const { setProducts, setIsLoading, setIsAuthenticated, isAuthenticated } = useProductContext();
  console.log(isAuthenticated);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/products");
      if (response.data) {
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
