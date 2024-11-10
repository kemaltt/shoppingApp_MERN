import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { useProductContext } from "../../contexts/ProductContext";
import { useSelector } from "react-redux";
import Compare from "./Compare";
import Cart from "./Cart";
import WishList from "./WishList";
import { useLogoutMutation } from "../../../redux/auth/auth-api";
import AccountMenu from "./components/Account";





export default function Navbar() {
  const {
    selectedCompareProducts,
  } = useProductContext();
  const [logout] = useLogoutMutation()
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  const { cart } = useSelector((state) => state.cart);

  const cartBadge = cart?.products?.length;
  const wishBadge = favorite?.length;
  const badge2 = selectedCompareProducts?.length;

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const handleNavList = () => {
    setToggle(!toggle);
  };

  const logOut = async () => {
    await logout()
    navigate('/')
  }

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
              <Compare badge={badge2} />
              <Cart badge={cartBadge} />
              <WishList badge={wishBadge} />
              <AccountMenu/>
              {/* <UserInfo /> */}
            </>
            : <Link to="/login" style={{ color: 'white' }}>
              {/* Login */}
              <MdLogin style={{ fontSize: "3rem" }} />
            </Link>

          }
        </ul>

        <div onClick={handleNavList} className="burger_menü">
          {!toggle ? (
            <i className="las la-bars"></i>
          ) : (
            <i className="las la-times"></i>
          )}
        </div>
      </nav>
      <div className="mobile_navlist">
        {toggle ? (
          <ul className="nav_item_mobile">
            {isAuthenticated ? (
              <>
                <li>
                  <Compare badge={badge2} />
                </li>
                <li>
                  <Cart badge={cartBadge} />
                </li>
                <li>
                  <div onClick={logOut} >
                    <MdLogout style={{ fontSize: "2.5rem" }} /> {user.user.name}
                  </div>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" style={{ color: 'white' }}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
