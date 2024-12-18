import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { useProductContext } from "../../contexts/ProductContext";
import { useSelector } from "react-redux";
import Compare from "./components/Compare";
import WishList from "./components/WishList";
import AccountMenu from "./components/Account";
import Cart from "./components/Cart";
import Product from "./components/Product";
import AccountMobile from "./components/AccountMobile";





export default function Navbar() {
  const { selectedCompareProducts } = useProductContext();
  // const [logout] = useLogoutMutation()
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  const { cart } = useSelector((state) => state.cart);

  const cartBadge = cart?.products?.length;
  const wishBadge = favorite?.length;
  const compareBadge = selectedCompareProducts?.length;
  const productBadge = selectedCompareProducts?.length;

  const navigate = useNavigate();
  // const [toggle, setToggle] = useState(false);
  // const handleNavList = () => {
  //   setToggle(!toggle);
  // };

  // const logOut = async () => {
  //   await logout()
  //   navigate('/')
  // }

  return (
    <div className="navbar_">
      <nav>
        <img
          onClick={() => navigate("/", { replace: true })}
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="logo"
        />
        <ul className="nav_item_desktop">
          {isAuthenticated
            ? <>
              {user.user.role === 'admin' && <Product badge={productBadge} />}
              <Compare badge={compareBadge} />
              <Cart badge={cartBadge} />
              <WishList badge={wishBadge} />
              <AccountMenu />
            </>
            : <Link to="/login" style={{ color: 'white' }}>
              {/* Login */}
              <MdLogin style={{ fontSize: "2rem" }} />
            </Link>
          }
        </ul>

        {/* <div onClick={handleNavList} className="burger_menü">
          {!toggle ? (
            <i className="las la-bars"></i>
          ) : (
            <i className="las la-times"></i>
          )}
        </div> */}
        <div className="burger_menü">
        <AccountMobile isAuthenticated={isAuthenticated} cartBadge={cartBadge} wishBadge={wishBadge} productBadge={productBadge} user={user}/>
        </div>
      </nav>
      
    

      
    </div>
  );
}
