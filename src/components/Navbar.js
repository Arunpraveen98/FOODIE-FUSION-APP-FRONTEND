import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/User_Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faCartShopping,
  faRightFromBracket,
  faSignIn,
  faUserCircle,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import "../Stylesheet/Navbar.css";
import Searchbar from "./SearchBar";
// -----------------------
function Navbar() {
  // -----------------------
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  const dispatch = useDispatch();

  const [isToggled, setIsToggled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Is_Admin, setIs_Admin] = useState(false);
  // -----------------------
  useEffect(() => {
    const Admin_user = JSON.parse(window.localStorage.getItem("AdminUser"));
    if (Admin_user === true) {
      setIs_Admin(true);
    } else {
      setIs_Admin(false);
    }
  }, []);
  // -----------------------
  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // -----------------------
  return (
    <div>
      <nav className="navbar navbar-expand-lg  p-3 mb-5 rounded">
        <a className="navbar-brand food-animate" href="/">
          <span className="app-title">
            <span className="F">F</span>oodie <span className="F">F</span>usion
          </span>
          <img
            className="food-animate-icon"
            src={
              "https://e7.pngegg.com/pngimages/98/723/png-clipart-spoon-and-fork-logo-monumental-restaurant-logo-cafe-others-miscellaneous-food-thumbnail.png"
            }
            alt="logo"
          />
        </a>

        <Searchbar />

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isToggled}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} style={{ color: "black" }} />
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            isToggled ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <>
                <div className="dropdown mt-2 ml-2">
                  <span className="navbar-username">{currentUser.name}</span>
                  <a
                    style={{ color: "black" }}
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={toggleDropdown}
                  >
                    <FontAwesomeIcon className="user-icon" icon={faUserGear} />
                  </a>

                  <div
                    className={`dropdown-menu  ${
                      isDropdownOpen ? " show" : ""
                    }`}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div className="dropdown-cart">
                      <a className="dropdown-item" href="/orders">
                        <FontAwesomeIcon
                          className="dropdown-icons"
                          icon={faBagShopping}
                        />{" "}
                        Orders
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        <FontAwesomeIcon
                          className="dropdown-icons"
                          icon={faRightFromBracket}
                        />{" "}
                        Logout
                      </a>
                      {Is_Admin ? (
                        <a className="dropdown-item" href="/admin">
                          <FontAwesomeIcon
                            className="dropdown-icons"
                            icon={faUserCircle}
                          />
                          Dashboard
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link navbar-login" href="/login">
                  Login <FontAwesomeIcon icon={faSignIn} />
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
                <span className="cart-length">
                  {cartstate.cartItems.length}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
// -----------------------
export default Navbar;
