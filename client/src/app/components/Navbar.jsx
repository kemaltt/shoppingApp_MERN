import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { useProductContext } from "../contexts/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";


export default function Navbar() {
  const {
    selectedCartProducts,
    selectedCompareProducts,
  } = useProductContext();
  const { user, error, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const badge = selectedCartProducts.length;
  const badge2 = selectedCompareProducts.length;

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const handleNavList = () => {
    setToggle(!toggle);
  };

  return (
    <div className="navbar_">
      <nav>
        <img
          onClick={() => navigate("/", { replace: true })}
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="logo"
        />
        <ul className="nav_item_desktop">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/aboutus">About Us</Link>
          </li> */}

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/compare">
                  Compare
                  <Badge
                    style={{
                      position: "relative",
                      top: "-10px",
                      width: "23px",
                    }}
                    bg="warning"
                  >
                    {badge2}
                  </Badge>
                  <span className="visually-hidden">unread messages</span>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <BsCartCheck style={{ fontSize: "3rem" }} />
                  {isAuthenticated ? (
                    <>
                      <Badge
                        style={{
                          position: "relative",
                          top: "-10px",
                          width: "23px",
                        }}
                        bg="danger"
                      >
                        {badge}
                      </Badge>
                      <span className="visually-hidden">unread messages</span>
                    </>
                  ) : null}
                </Link>
              </li>
              <li style={{ marginLeft: "4rem" }}>
                <Link>{user?.user?.name} </Link>
              </li>

              <li className="logout">
                <div onClick={() => { dispatch(logout()); navigate('/') }} >
                  <MdLogout style={{ fontSize: "3rem" }} />
                </div>
              </li>
            </>
          ) : (
            <li style={{ marginLeft: "1rem" }}>
              <Link to="/login">
                Sign Up
                <MdLogin style={{ fontSize: "3rem" }} />
              </Link>
            </li>
          )}
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
            <li>
              <Link to="/">Home</Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/compare">
                    Compare
                    <Badge
                      style={{
                        fontSize: "1rem",
                        position: "relative",
                        top: "-10px",
                      }}
                      bg="warning"
                    >
                      {badge2}
                    </Badge>
                    <span className="visually-hidden">unread messages</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <BsCartCheck style={{ fontSize: "3rem" }} />
                    <Badge
                      style={{
                        fontSize: "1rem",
                        position: "relative",
                        top: "-10px",
                      }}
                      bg="danger"
                    >
                      {badge}
                    </Badge>
                    <span className="visually-hidden">unread messages</span>
                  </Link>
                </li>
                <li>
                  <div onClick={() => { dispatch(logout()); navigate('/') }} >
                    <MdLogout style={{ fontSize: "2.5rem" }} /> {user.user.name}
                  </div>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
