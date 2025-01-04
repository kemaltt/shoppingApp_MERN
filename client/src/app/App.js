import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Router from "./routes/Router";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { useGetFavoriteQuery } from "../redux/favorite/favorite-api";
import { useGetCartQuery } from "../redux/cart/cart-api";
import { useLogoutMutation } from "../redux/auth/auth-api";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  // useGetProductsQuery()
  const { token } = useSelector((state) => state.user);
 useGetFavoriteQuery(token,{ skip: !token })
 useGetCartQuery(token,{ skip: !token })
  const [logout] = useLogoutMutation()

  useEffect(() => {
    // Eğer token yoksa kullanıcıyı logout yap
    if (!token) {
      logout();
    }
  }, [token, logout]);



  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Router />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
