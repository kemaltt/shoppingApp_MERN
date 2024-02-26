import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Compare from "./pages/Compare";
import axios from "axios";
import { useEffect } from "react";
import { useProductContext } from "./contexts/ProductContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {

  const { setProducts, setIsLoading, setIsAuthenticated, isAuthenticated } = useProductContext();

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
  console.log();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
